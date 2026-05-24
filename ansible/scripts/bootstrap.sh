#!/usr/bin/env bash
# Run once as root on a fresh Ubuntu 24.04 instance.
# After this completes, run Ansible as the «app» user:
#   ansible-playbook -i ansible/prod ansible/site.yml
set -euo pipefail

export DEBIAN_FRONTEND=noninteractive

APP_USER=app

# --- Docker apt repository (must come before installing docker-ce) ---
apt-get update -q
apt-get install -y -q ca-certificates curl gnupg

install -m 0755 -d /etc/apt/keyrings
curl -fsSL -o /etc/apt/keyrings/docker.asc https://download.docker.com/linux/ubuntu/gpg
chmod a+r /etc/apt/keyrings/docker.asc
echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] \
  https://download.docker.com/linux/ubuntu $(. /etc/os-release && echo "$VERSION_CODENAME") stable" \
  > /etc/apt/sources.list.d/docker.list

# --- Install all required packages ---
apt-get update -q
apt-get install -y -q \
  python3 \
  python3-docker \
  docker-ce docker-ce-cli containerd.io \
  docker-buildx-plugin docker-compose-plugin \
  uidmap \
  dbus-user-session \
  slirp4netns \
  webhook

# --- Allow unprivileged processes to bind ports >= 80 ---
echo "net.ipv4.ip_unprivileged_port_start=80" > /etc/sysctl.d/99-unprivileged-port.conf
sysctl --system

# --- Create app user ---
id "$APP_USER" &>/dev/null || useradd -m -s /bin/bash "$APP_USER"

# --- Copy SSH authorized_keys from ubuntu user if present ---
if [ -f /home/ubuntu/.ssh/authorized_keys ]; then
  mkdir -p "/home/$APP_USER/.ssh"
  cp /home/ubuntu/.ssh/authorized_keys "/home/$APP_USER/.ssh/authorized_keys"
  chmod 700 "/home/$APP_USER/.ssh"
  chmod 600 "/home/$APP_USER/.ssh/authorized_keys"
  chown -R "$APP_USER:$APP_USER" "/home/$APP_USER/.ssh"
fi

# --- Enable linger so the user session (and services) survive logout ---
loginctl enable-linger "$APP_USER"
APP_UID=$(id -u "$APP_USER")
systemctl start "user@${APP_UID}.service"

# --- Install rootless Docker for the app user ---
sudo -u "$APP_USER" \
  XDG_RUNTIME_DIR="/run/user/$APP_UID" \
  DBUS_SESSION_BUS_ADDRESS="unix:path=/run/user/$APP_UID/bus" \
  dockerd-rootless-setuptool.sh install

echo "Bootstrap complete. Run:"
echo "  ansible-playbook -i ansible/prod ansible/site.yml"
