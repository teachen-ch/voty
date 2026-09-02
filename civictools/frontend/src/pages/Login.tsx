import { useState, useEffect } from "preact/hooks";
import { useLocation } from "wouter";
import { useTranslation } from "react-i18next";
import { pb } from "../pb";
import { teacher } from "../store";
import { tenant } from "../tenant";
import { Header } from "../components/Header";
import type { RecordModel } from "pocketbase";

export function Login() {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [passwordResetSent, setPasswordResetSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [oidcEnabled, setOidcEnabled] = useState(false);
  const [oidcProvider, setOidcProvider] = useState<string | null>(null);
  const [, navigate] = useLocation();

  function nextTarget(): string {
    const next = new URLSearchParams(window.location.search).get("next");
    if (next && next.startsWith("/")) return next;
    return "/dashboard";
  }

  useEffect(() => {
    pb.collection("users")
      .listAuthMethods()
      .then((m) => {
        const provider = m.oauth2.providers.find(
          (p) => p.displayName === tenant.oidcDisplayName
        );
        setOidcProvider(provider?.name ?? null);
        setOidcEnabled(provider !== undefined);
      })
      .catch(() => {});
  }, []);

  async function handleSubmit(e: Event) {
    e.preventDefault();
    setError(null);
    setPasswordResetSent(false);
    setLoading(true);
    try {
      const auth = await pb
        .collection("users")
        .authWithPassword(email, password);
      teacher.value = auth.record as RecordModel;
      navigate(nextTarget());
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setLoading(false);
    }
  }

  async function handleForgotPassword() {
    setError(null);
    setPasswordResetSent(false);
    if (!email.trim()) {
      setError(t("login.emailRequired"));
      return;
    }

    setLoading(true);
    try {
      await pb.collection("users").requestPasswordReset(email.trim());
      setPasswordResetSent(true);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : t("login.resetFailed"));
    } finally {
      setLoading(false);
    }
  }

  async function handleOidcLogin() {
    if (!oidcProvider) return;
    setError(null);
    setLoading(true);
    try {
      const auth = await pb
        .collection("users")
        .authWithOAuth2({ provider: oidcProvider });
      teacher.value = auth.record as RecordModel;
      navigate(nextTarget());
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="page max-w-2xl">
      <Header />
      <h1 className="text-center mt-20">{t("login.welcome")}</h1>
      <div className="card max-w-100 mx-auto">
        <h2>{t("login.title")}</h2>
        {oidcEnabled && (
          <>
            <button
              type="button"
              onClick={handleOidcLogin}
              disabled={loading}
              className="btn w-full py-2"
            >
              {t("login.oidc", { tenant: tenant.name })}
            </button>
            <div className="flex items-center gap-3 my-4 text-gray-400 text-[13px]">
              <span
                className="flex-1 border-t border-slate-200"
                aria-hidden="true"
              />
              <span>{t("login.or")}</span>
              <span
                className="flex-1 border-t border-slate-200"
                aria-hidden="true"
              />
            </div>
          </>
        )}
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            type="email"
            placeholder={t("login.email")}
            value={email}
            onInput={(e) => setEmail(e.currentTarget.value)}
            required
            autoFocus
          />
          <input
            type="password"
            placeholder={t("login.password")}
            value={password}
            onInput={(e) => setPassword(e.currentTarget.value)}
            required
          />
          {error && <p className="error">{error}</p>}
          <button className="btn py-2" type="submit" disabled={loading}>
            {loading ? t("login.submitting") : t("login.submit")}
          </button>
          <button
            type="button"
            onClick={handleForgotPassword}
            disabled={loading}
            className="text-sm text-primary-600 hover:underline self-center cursor-pointer disabled:opacity-60"
          >
            {t("login.forgotPassword")}
          </button>
          {passwordResetSent && (
            <p className="text-center text-sm text-emerald-600" role="status">
              {t("login.resetSent")}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
