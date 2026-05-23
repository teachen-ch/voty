#!/usr/bin/env bash
# Creates the civictools Keycloak realm and PocketBase OIDC client.
# Usage: KC_ADMIN_PASSWORD=secret bash scripts/setup-keycloak.sh
set -euo pipefail

KC_BASE="${KC_BASE:-http://localhost:8080}"
KC_ADMIN="${KC_ADMIN:-admin}"
KC_ADMIN_PASSWORD="${KC_ADMIN_PASSWORD:-}"
REALM="civictools"
CLIENT_ID="civictools-pb"
PB_REDIRECT="http://localhost:8090/api/oauth2-redirect"
FRONTEND_REDIRECT="http://localhost:8000/"

if [ -z "$KC_ADMIN_PASSWORD" ]; then
  read -rsp "Keycloak admin password: " KC_ADMIN_PASSWORD
  echo
fi

TOKEN=$(curl -sf -X POST "$KC_BASE/realms/master/protocol/openid-connect/token" \
  -d "client_id=admin-cli" \
  -d "username=$KC_ADMIN" \
  -d "password=$KC_ADMIN_PASSWORD" \
  -d "grant_type=password" | python3 -c "import sys,json; print(json.load(sys.stdin)['access_token'])")

auth() { curl -sS -H "Authorization: Bearer $TOKEN" -H "Content-Type: application/json" "$@"; }

echo "Creating realm '$REALM'..."
CODE=$(auth -o /dev/null -w "%{http_code}" -X POST "$KC_BASE/admin/realms" \
  -d "{\"realm\":\"$REALM\",\"enabled\":true,\"displayName\":\"CivicTools\"}")
case "$CODE" in
  201) echo "  Created." ;;
  409) echo "  Already exists, skipping." ;;
  *)   echo "  Error HTTP $CODE" && exit 1 ;;
esac

echo "Creating client '$CLIENT_ID'..."
CODE=$(auth -o /dev/null -w "%{http_code}" -X POST "$KC_BASE/admin/realms/$REALM/clients" \
  -d "{
    \"clientId\": \"$CLIENT_ID\",
    \"name\": \"CivicTools PocketBase\",
    \"protocol\": \"openid-connect\",
    \"publicClient\": false,
    \"standardFlowEnabled\": true,
    \"directAccessGrantsEnabled\": false,
    \"serviceAccountsEnabled\": false,
    \"redirectUris\": [\"$PB_REDIRECT\", \"$FRONTEND_REDIRECT\"],
    \"webOrigins\": [\"+\"],
    \"attributes\": {\"pkce.code.challenge.method\": \"S256\"}
  }")
case "$CODE" in
  201) echo "  Created." ;;
  409) echo "  Already exists, skipping." ;;
  *)   echo "  Error HTTP $CODE" && exit 1 ;;
esac

CLIENT_UUID=$(auth "$KC_BASE/admin/realms/$REALM/clients?clientId=$CLIENT_ID" \
  | python3 -c "import sys,json; print(json.load(sys.stdin)[0]['id'])")

SECRET=$(auth "$KC_BASE/admin/realms/$REALM/clients/$CLIENT_UUID/client-secret" \
  | python3 -c "import sys,json; print(json.load(sys.stdin)['value'])")

echo ""
echo "Done. Export these env vars before 'make dev':"
echo ""
echo "  export KEYCLOAK_CLIENT_ID=$CLIENT_ID"
echo "  export KEYCLOAK_CLIENT_SECRET=$SECRET"
echo ""
echo "Or run:"
echo "  KEYCLOAK_CLIENT_ID=$CLIENT_ID KEYCLOAK_CLIENT_SECRET=$SECRET make dev"
