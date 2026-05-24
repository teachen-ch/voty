import { useState, useEffect } from "preact/hooks";
import { useLocation } from "wouter";
import { useTranslation } from "react-i18next";
import { pb } from "../pb";
import { teacher } from "../store";
import type { RecordModel } from "pocketbase";

export function Login() {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [oidcEnabled, setOidcEnabled] = useState(false);
  const [, navigate] = useLocation();

  function nextTarget(): string {
    const next = new URLSearchParams(window.location.search).get("next");
    if (next && next.startsWith("/")) return next;
    return "/dashboard";
  }

  useEffect(() => {
    pb.collection("users")
      .listAuthMethods()
      .then((m) =>
        setOidcEnabled(m.oauth2.providers.some((p) => p.name === "oidc"))
      )
      .catch(() => {});
  }, []);

  async function handleSubmit(e: Event) {
    e.preventDefault();
    setError(null);
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

  async function handleKeycloakLogin() {
    setError(null);
    setLoading(true);
    try {
      const auth = await pb
        .collection("users")
        .authWithOAuth2({ provider: "oidc" });
      teacher.value = auth.record as RecordModel;
      navigate(nextTarget());
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="page max-w-100">
      <h1>{t("appName")}</h1>
      <div className="card">
        <h2>{t("login.title")}</h2>
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
          <button className="btn" type="submit" disabled={loading}>
            {loading ? t("login.submitting") : t("login.submit")}
          </button>
        </form>
        {oidcEnabled && (
          <>
            <p className="text-center my-3 text-gray-400 text-[13px]">
              {t("login.or")}
            </p>
            <button
              onClick={handleKeycloakLogin}
              disabled={loading}
              className="btn w-full"
            >
              {t("login.keycloak")}
            </button>
          </>
        )}
      </div>
    </div>
  );
}
