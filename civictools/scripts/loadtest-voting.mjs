#!/usr/bin/env node
// Simulates a class joining a room and voting from a single IP.
// Usage: node loadtest-voting.mjs <join-url> [--students=30] [--join-spread=0] [--vote-spread=0] [--keep-votes]
import { randomUUID } from "node:crypto";

const args = process.argv.slice(2);
const opt = (name, fallback) =>
  Number(
    args.find((a) => a.startsWith(`--${name}=`))?.split("=")[1] ?? fallback
  );
const url = args.find((a) => !a.startsWith("--"));
if (!url) {
  console.error("usage: loadtest-voting.mjs <join-url> [--students=30]");
  process.exit(1);
}
const { origin, pathname } = new URL(url);
const roomId = pathname.split("/").filter(Boolean).pop();
const students = opt("students", 30);
const joinSpread = opt("join-spread", 0);
const voteSpread = opt("vote-spread", 0);
const keepVotes = args.includes("--keep-votes");

const stats = {};
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const jitter = (seconds) => sleep(Math.random() * seconds * 1000);

async function api(label, path, { method = "GET", body, token } = {}) {
  const res = await fetch(`${origin}/api/${path}`, {
    method,
    headers: {
      "content-type": "application/json",
      "X-Room-Id": roomId,
      ...(token && { "X-Session-Token": token }),
    },
    body: body && JSON.stringify(body),
  });
  const text = await res.text();
  const data = text ? JSON.parse(text) : {};
  stats[label] ??= {};
  stats[label][res.status] = (stats[label][res.status] ?? 0) + 1;
  return { ok: res.ok, status: res.status, data };
}

const records = (c) => `collections/${c}/records`;
const list = (c, filter) =>
  api(`${c}:list`, `${records(c)}?perPage=500&filter=${encodeURIComponent(filter)}`);

async function openRealtime(token, signal) {
  const res = await fetch(`${origin}/api/realtime`, { signal });
  stats["realtime:connect"] ??= {};
  stats["realtime:connect"][res.status] =
    (stats["realtime:connect"][res.status] ?? 0) + 1;
  if (!res.ok) return;
  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";
  let clientId;
  while (!clientId) {
    const { value, done } = await reader.read();
    if (done) return;
    buffer += decoder.decode(value, { stream: true });
    clientId = buffer.match(/"clientId":"([^"]+)"/)?.[1];
  }
  const options = encodeURIComponent(
    JSON.stringify({ headers: { "x-room-id": roomId } })
  );
  await api("realtime:subscribe", "realtime", {
    method: "POST",
    token,
    body: {
      clientId,
      subscriptions: ["votings", "participant_votes"].map(
        (c) => `${c}/*?options=${options}`
      ),
    },
  });
  (async () => {
    while (!(await reader.read()).done);
  })().catch(() => {});
}

async function join(i, signal) {
  await jitter(joinSpread);
  const token = randomUUID();
  await api("rooms:view", `${records("rooms")}/${roomId}`);
  const res = await api("participants:create", records("participants"), {
    method: "POST",
    token,
    body: {
      room: roomId,
      nickname: `LoadTest ${i + 1}`,
      role: "student",
      tenant: "voty",
    },
  });
  if (!res.ok) return null;
  await openRealtime(token, signal);
  const inRoom = `room = "${roomId}"`;
  await Promise.all(
    [
      "sticky_notes",
      "discussion_boards",
      "votings",
      "timers",
      "rankings",
      "media_items",
      "participants",
    ].map((c) => list(c, inRoom))
  );
  return { token, id: res.data.id, votes: [] };
}

async function vote(student, voting) {
  await jitter(voteSpread);
  const { token } = student;
  const pick = () => Math.floor(Math.random() * voting.options.length);
  const res = await api("participant_votes:create", records("participant_votes"), {
    method: "POST",
    token,
    body: { voting: voting.id, participant: student.id, option: pick() },
  });
  if (!res.ok) return;
  student.votes.push(res.data.id);
  await api("participant_votes:update", `${records("participant_votes")}/${res.data.id}`, {
    method: "PATCH",
    token,
    body: { option: pick() },
  });
}

const room = await api("rooms:view", `${records("rooms")}/${roomId}`);
if (!room.ok) throw new Error(`room ${roomId} not found (${room.status})`);
const open = (await list("votings", `room = "${roomId}"`)).data.items.filter(
  (v) => !v.config?.closed
);
if (!open.length) throw new Error("no open voting in this room");
console.info(
  `${origin} · "${room.data.name}" · ${students} students · ${open.length} open voting(s)`
);

const realtime = new AbortController();
const t0 = Date.now();
const joined = (
  await Promise.all(
    Array.from({ length: students }, (_, i) => join(i, realtime.signal))
  )
).filter(Boolean);
console.info(`joined ${joined.length}/${students} in ${Date.now() - t0}ms`);

const t1 = Date.now();
await Promise.all(joined.flatMap((s) => open.map((v) => vote(s, v))));
const cast = joined.reduce((n, s) => n + s.votes.length, 0);
console.info(`voted ${cast}/${joined.length * open.length} in ${Date.now() - t1}ms`);

if (!keepVotes) {
  await sleep(10_000);
  for (const s of joined) {
    for (const id of s.votes) {
      await api("participant_votes:delete", `${records("participant_votes")}/${id}`, {
        method: "DELETE",
        token: s.token,
      });
    }
  }
}
realtime.abort();

console.table(stats);
const limited = Object.values(stats).some((s) => s[429]);
console.info(limited ? "FAIL: got 429s" : "OK: no 429s");
if (joined.length) {
  console.info(
    `${joined.length} "LoadTest" participants remain; delete them in the PocketBase admin.`
  );
}
process.exit(limited || cast < students * open.length ? 1 : 0);
