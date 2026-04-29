import { canvasTransform } from '../store'

export function ZoomControls() {
  const { scale } = canvasTransform.value

  function zoomBy(factor: number) {
    const { x, y, scale: s } = canvasTransform.value
    const cx = window.innerWidth / 2
    const cy = window.innerHeight / 2
    const ns = Math.max(0.1, Math.min(5, s * factor))
    canvasTransform.value = {
      scale: ns,
      x: cx - (cx - x) * (ns / s),
      y: cy - (cy - y) * (ns / s),
    }
  }

  function fitToScreen() {
    canvasTransform.value = { x: 0, y: 0, scale: 1 }
    // re-center
    const { innerWidth: w, innerHeight: h } = window
    canvasTransform.value = { x: w / 2 - 3000, y: h / 2 - 2000, scale: 1 }
  }

  return (
    <div class="fixed bottom-4 right-4 flex items-center gap-1 bg-white rounded-2xl shadow border border-slate-200 px-3 py-2 z-50">
      <button
        title="Fit to screen"
        onClick={fitToScreen}
        class="w-7 h-7 flex items-center justify-center text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg"
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.5">
          <path d="M1 4V1h3M10 1h3v3M13 10v3h-3M4 13H1v-3" stroke-linecap="round" />
        </svg>
      </button>
      <div class="w-px h-5 bg-slate-200" />
      <button
        onClick={() => zoomBy(1 / 1.2)}
        class="w-7 h-7 flex items-center justify-center text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg font-mono text-lg"
      >
        −
      </button>
      <span class="text-xs font-mono text-slate-600 w-10 text-center">
        {Math.round(scale * 100)}%
      </span>
      <button
        onClick={() => zoomBy(1.2)}
        class="w-7 h-7 flex items-center justify-center text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg font-mono text-lg"
      >
        +
      </button>
    </div>
  )
}
