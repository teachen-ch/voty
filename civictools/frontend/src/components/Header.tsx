import { useTranslation } from "react-i18next";
import { useLocation } from "wouter";
import { pb } from "../pb";
import { isTeacher } from "../store";
import votyLogo from "../assets/voty_logo.svg";

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
          <img src={votyLogo} alt="voty" className="h-8 w-auto" />
          <span className="text-sm font-semibold text-black">
            {t("appName")}
          </span>
        </div>
        <div className="text-sm">
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
