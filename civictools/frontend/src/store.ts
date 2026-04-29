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
