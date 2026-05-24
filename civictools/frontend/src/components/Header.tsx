import { useTranslation } from "react-i18next";
import { useLocation } from "wouter";
import { pb } from "../pb";
import { isTeacher } from "../store";

export function Header() {
  const { t } = useTranslation();
  const [, navigate] = useLocation();

  function logout() {
    pb.authStore.clear();
    navigate("/login");
  }

  return (
    <div className="mb-6">
      <div className="relative pb-2">
        <div className="text-sm font-semibold text-slate-700 text-center">
          {t("header.brand")}
        </div>
        <div className="absolute right-0 top-0 text-sm">
          {isTeacher.value ? (
            <button
              type="button"
              onClick={logout}
              className="text-blue-600 hover:underline"
            >
              {t("dashboard.logout")}
            </button>
          ) : (
            <a href="/login" className="text-blue-600 hover:underline">
              {t("breadcrumb.signIn")}
            </a>
          )}
        </div>
      </div>
      <div className="h-px bg-slate-200" />
    </div>
  );
}
