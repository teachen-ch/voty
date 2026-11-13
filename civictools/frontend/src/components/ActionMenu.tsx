import { useEffect, useRef, useState } from "preact/hooks";
import type { ComponentChildren } from "preact";
import { useTranslation } from "react-i18next";

export interface MenuItem {
  label: string;
  icon?: ComponentChildren;
  onClick?: () => void;
  danger?: boolean;
  disabled?: boolean;
}

export function ActionMenu({ items }: { items: MenuItem[] }) {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={ref} className="relative shrink-0">
      <button
        type="button"
        className="w-9 h-9 flex items-center justify-center rounded-full text-slate-600 hover:bg-slate-100 cursor-pointer"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={t("dashboard.actions")}
        onClick={() => setOpen((o) => !o)}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <circle cx="12" cy="5" r="2" />
          <circle cx="12" cy="12" r="2" />
          <circle cx="12" cy="19" r="2" />
        </svg>
      </button>
      {open && (
        <div
          role="menu"
          className="absolute right-0 top-full mt-1 z-50 min-w-52 bg-white rounded-xl shadow-lg border border-slate-200 py-1.5"
        >
          {items.map((item) => (
            <button
              key={item.label}
              type="button"
              role="menuitem"
              disabled={item.disabled}
              onClick={() => {
                setOpen(false);
                item.onClick?.();
              }}
              className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 text-sm text-left cursor-pointer disabled:cursor-default ${
                item.danger
                  ? "text-red-600 hover:bg-red-50"
                  : "text-slate-700 hover:bg-slate-50"
              } disabled:text-slate-400 disabled:hover:bg-transparent`}
            >
              <span className="w-[18px] shrink-0 flex justify-center">
                {item.icon}
              </span>
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
