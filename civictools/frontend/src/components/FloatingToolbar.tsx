import { activeTool } from '../store'
import type { Tool } from '../store'

interface ToolDef {
  id: string
  label: string
  icon: JSX.Element
  active: boolean
}

function CursorIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
      <path d="M3 1.5L3 13L6 9.5L8.5 14.5L10 13.8L7.5 8.8L12 8.8Z" />
    </svg>
  )
}

function StickyIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5">
      <rect x="2" y="2" width="12" height="12" rx="1.5" />
    </svg>
  )
}

function ChartIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
      <rect x="2" y="8" width="3" height="6" />
      <rect x="6.5" y="4" width="3" height="10" />
      <rect x="11" y="6" width="3" height="8" />
    </svg>
  )
}

function ChatIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5">
      <path d="M2 3a1 1 0 011-1h10a1 1 0 011 1v7a1 1 0 01-1 1H6l-3 2V3z" stroke-linejoin="round" />
    </svg>
  )
}

const TOOLS: Array<{ id: Tool | string; label: string; Icon: () => JSX.Element; enabled: boolean }> = [
  { id: 'select', label: 'Select', Icon: CursorIcon, enabled: true },
  { id: 'sticky', label: 'Sticky note', Icon: StickyIcon, enabled: true },
  { id: 'poll', label: 'Poll (coming soon)', Icon: ChartIcon, enabled: false },
  { id: 'chat', label: 'Chat (coming soon)', Icon: ChatIcon, enabled: false },
]

export function FloatingToolbar() {
  return (
    <div
      class="fixed right-4 top-1/2 -translate-y-1/2 bg-white rounded-2xl shadow-lg border border-slate-200 flex flex-col p-1.5 gap-0.5 z-50"
      style={{ minWidth: 48 }}
    >
      {TOOLS.map(({ id, label, Icon, enabled }) => {
        const isActive = activeTool.value === id
        return (
          <button
            key={id}
            title={label}
            disabled={!enabled}
            onClick={() => { if (enabled) activeTool.value = id as Tool }}
            class={[
              'w-10 h-10 rounded-xl flex items-center justify-center transition-colors',
              isActive
                ? 'bg-blue-100 text-blue-700'
                : enabled
                  ? 'text-slate-600 hover:bg-slate-100'
                  : 'text-slate-300 cursor-not-allowed',
            ].join(' ')}
          >
            <Icon />
          </button>
        )
      })}
    </div>
  )
}

// JSX type shim
declare namespace JSX {
  interface Element {}
}
