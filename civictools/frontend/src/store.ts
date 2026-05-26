import { signal, computed } from "@preact/signals";
import { pb } from "./pb";
import type { RecordModel } from "pocketbase";

export const teacher = signal<RecordModel | null>(
  pb.authStore.isValid ? (pb.authStore.model as RecordModel) : null
);

pb.authStore.onChange((_, model) => {
  teacher.value = model as RecordModel | null;
});

export const isTeacher = computed(() => teacher.value !== null);

export interface StudentSession {
  nickname: string;
  roomId: string;
  participantId?: string;
  sessionToken?: string;
}

function loadSession(): StudentSession | null {
  try {
    const raw = localStorage.getItem("civictools_student");
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export const studentSession = signal<StudentSession | null>(loadSession());

export function setStudentSession(s: StudentSession) {
  localStorage.setItem("civictools_student", JSON.stringify(s));
  studentSession.value = s;
}

export function clearStudentSession() {
  localStorage.removeItem("civictools_student");
  studentSession.value = null;
}

export const currentRoom = signal<RecordModel | null>(null);
export const stickyNotes = signal<RecordModel[]>([]);

export interface PresenceEntry {
  participantId: string;
  nickname: string;
}

// Live roster of participants currently connected to the room (from the cursor
// WebSocket hub). Reflects real-time joins and disconnects.
export const presence = signal<PresenceEntry[]>([]);

export const participantCache = signal<Map<string, RecordModel>>(new Map());

export function cacheParticipants(list: RecordModel[]) {
  const m = new Map(participantCache.value);
  for (const p of list) m.set(p.id, p);
  participantCache.value = m;
}

export function getParticipantName(
  participantId: string | null | undefined
): string {
  if (!participantId) return "?";
  return (participantCache.value.get(participantId)?.nickname as string) ?? "?";
}

export function applyNoteEvent(action: string, record: RecordModel) {
  if (action === "create") {
    stickyNotes.value = [...stickyNotes.value, record];
    const pid = record.participant as string | undefined;
    if (pid && !participantCache.value.has(pid)) {
      pb.collection("participants")
        .getOne(pid)
        .then((p) => cacheParticipants([p]));
    }
  } else if (action === "update") {
    stickyNotes.value = stickyNotes.value.map((n) =>
      n.id === record.id ? record : n
    );
  } else if (action === "delete") {
    stickyNotes.value = stickyNotes.value.filter((n) => n.id !== record.id);
  }
}

export interface CanvasTransform {
  x: number;
  y: number;
  scale: number;
}

export const canvasTransform = signal<CanvasTransform>({
  x: 0,
  y: 0,
  scale: 1,
});

export type Tool = "select" | "sticky";
export const activeTool = signal<Tool>("select");

export const discussionModal = signal<{ board?: RecordModel } | null>(null);
export const votingModal = signal<{ voting?: RecordModel } | null>(null);
export const timerModal = signal<{ timer?: RecordModel } | null>(null);
export const rankingModal = signal<{ ranking?: RecordModel } | null>(null);

export const votings = signal<RecordModel[]>([]);
export const participantVotes = signal<RecordModel[]>([]);
export const timers = signal<RecordModel[]>([]);

export function applyVotingEvent(action: string, record: RecordModel) {
  if (action === "create" || action === "update") {
    votings.value = upsertBy(votings.value, record);
  } else if (action === "delete") {
    votings.value = votings.value.filter((v) => v.id !== record.id);
    participantVotes.value = participantVotes.value.filter(
      (pv) => pv.voting !== record.id
    );
  }
}

export function applyParticipantVoteEvent(action: string, record: RecordModel) {
  if (action === "create" || action === "update") {
    participantVotes.value = upsertBy(participantVotes.value, record);
  } else if (action === "delete") {
    participantVotes.value = participantVotes.value.filter(
      (pv) => pv.id !== record.id
    );
  }
}

export function applyTimerEvent(action: string, record: RecordModel) {
  if (action === "create" || action === "update") {
    timers.value = upsertBy(timers.value, record);
  } else if (action === "delete") {
    timers.value = timers.value.filter((t) => t.id !== record.id);
  }
}

export const rankings = signal<RecordModel[]>([]);
export const rankingResponses = signal<RecordModel[]>([]);

export function applyRankingEvent(action: string, record: RecordModel) {
  if (action === "create" || action === "update") {
    rankings.value = upsertBy(rankings.value, record);
  } else if (action === "delete") {
    rankings.value = rankings.value.filter((r) => r.id !== record.id);
    rankingResponses.value = rankingResponses.value.filter(
      (r) => r.ranking !== record.id
    );
  }
}

export function applyRankingResponseEvent(action: string, record: RecordModel) {
  if (action === "create" || action === "update") {
    rankingResponses.value = upsertBy(rankingResponses.value, record);
  } else if (action === "delete") {
    rankingResponses.value = rankingResponses.value.filter(
      (r) => r.id !== record.id
    );
  }
}

export const discussionBoards = signal<RecordModel[]>([]);
export const argumentRecords = signal<RecordModel[]>([]);
export const argumentVotes = signal<RecordModel[]>([]);

function upsertBy<T extends RecordModel>(list: T[], rec: T): T[] {
  const i = list.findIndex((r) => r.id === rec.id);
  if (i < 0) return [...list, rec];
  const copy = list.slice();
  copy[i] = rec;
  return copy;
}

export function applyDiscussionBoardEvent(action: string, record: RecordModel) {
  if (action === "create" || action === "update") {
    discussionBoards.value = upsertBy(discussionBoards.value, record);
  } else if (action === "delete") {
    discussionBoards.value = discussionBoards.value.filter(
      (b) => b.id !== record.id
    );
    argumentRecords.value = argumentRecords.value.filter(
      (a) => a.discussion_board !== record.id
    );
  }
}

export function applyArgumentEvent(action: string, record: RecordModel) {
  if (action === "create" || action === "update") {
    argumentRecords.value = upsertBy(argumentRecords.value, record);
  } else if (action === "delete") {
    argumentRecords.value = argumentRecords.value.filter(
      (a) => a.id !== record.id
    );
    argumentVotes.value = argumentVotes.value.filter(
      (v) => v.argument !== record.id
    );
  }
}

export function applyArgumentVoteEvent(action: string, record: RecordModel) {
  if (action === "create" || action === "update") {
    argumentVotes.value = upsertBy(argumentVotes.value, record);
  } else if (action === "delete") {
    argumentVotes.value = argumentVotes.value.filter((v) => v.id !== record.id);
  }
}

const CURSOR_COLORS = [
  "#7c3aed",
  "#2563eb",
  "#059669",
  "#d97706",
  "#dc2626",
  "#db2777",
  "#0891b2",
  "#65a30d",
];

export function participantColor(id: string): string {
  let hash = 0;
  for (let i = 0; i < id.length; i++) {
    hash = (hash * 31 + id.charCodeAt(i)) & 0x7fffffff;
  }
  return CURSOR_COLORS[hash % CURSOR_COLORS.length];
}
