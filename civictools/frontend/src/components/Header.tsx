import { useTranslation } from "react-i18next";
import { useLocation } from "wouter";
import { pb } from "../pb";
import { isTeacher } from "../store";
import { Logo } from "./Logo";

export function Header() {
  const { t } = useTranslation();
  const [, navigate] = useLocation();

  function logout() {
    pb.authStore.clear();
    navigate("/login");
  }

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between pb-2">
        <div className="flex items-center gap-1">
          <Logo className="h-8 w-auto" />
        </div>
        <div className="text-sm">
          {isTeacher.value ? (
            <button
              type="button"
              onClick={logout}
              className="text-primary-600 hover:underline"
            >
              {t("dashboard.logout")}
            </button>
          ) : (
            <a href="/login" className="text-primary-600 hover:underline">
              {t("breadcrumb.signIn")}
            </a>
          )}
        </div>
      </div>
      <div className="h-px bg-slate-200" />
    </div>
  );
}
