import { useState } from "preact/hooks";
import { useTranslation } from "react-i18next";
import { tenant } from "../tenant";

type IntroScreen = "dashboard" | "room";

interface Props {
  screen: IntroScreen;
}

const STORAGE_KEYS: Record<IntroScreen, string> = {
  dashboard: "civictools:intro:dashboard",
  room: "civictools:intro:room",
};

export function IntroModal({ screen }: Props) {
  const { t } = useTranslation();
  const [open, setOpen] = useState(
    () =>
      typeof window !== "undefined" &&
      window.localStorage.getItem(STORAGE_KEYS[screen]) !== "shown"
  );

  if (!open) return null;

  const isDashboard = screen === "dashboard";
  const steps = isDashboard
    ? [
        t("intro.dashboardStep1"),
        t("intro.dashboardStep2", { tenant: tenant.name }),
        t("intro.dashboardStep3"),
        t("intro.dashboardStep4"),
      ]
    : [
        t("intro.roomStep1"),
        t("intro.roomStep2"),
        t("intro.roomStep3"),
        t("intro.roomStep4"),
      ];

  function close() {
    window.localStorage.setItem(STORAGE_KEYS[screen], "shown");
    setOpen(false);
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/45 p-0 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="intro-modal-title"
    >
      <div
        className="flex min-h-full w-full flex-col justify-center px-6 py-10 text-white sm:min-h-0 sm:max-w-2xl sm:rounded-3xl sm:px-12 sm:py-12"
        style={{ backgroundColor: tenant.primary }}
      >
        <div className="max-w-xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-white/70">
            {t("intro.eyebrow")}
          </p>
          <h2
            id="intro-modal-title"
            className="mb-4 text-3xl font-bold sm:text-4xl"
          >
            {isDashboard
              ? t("intro.dashboardTitle", { tenant: tenant.name })
              : t("intro.roomTitle")}
          </h2>
          <p className="mb-8 max-w-lg text-base leading-relaxed text-white/85 sm:text-lg">
            {isDashboard ? t("intro.dashboardLead") : t("intro.roomLead")}
          </p>

          <div className="flex flex-col gap-4">
            {steps.map((step, index) => (
              <div key={step} className="flex items-start gap-4">
                <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-white text-sm font-bold text-primary-700">
                  {index + 1}
                </span>
                <p className="pt-1 text-base leading-relaxed text-white sm:text-lg">
                  {step}
                </p>
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={close}
            className="mt-10 rounded-xl bg-white px-5 py-2.5 text-sm font-semibold text-primary-700 shadow-sm transition hover:bg-white/90 cursor-pointer"
          >
            {t("intro.continue")}
          </button>
        </div>
      </div>
    </div>
  );
}
