import { useState } from "preact/hooks";
import { useTranslation } from "react-i18next";

interface Props {
  roomId: string;
}

export function ShareLink({ roomId }: Props) {
  const { t } = useTranslation();
  const [copied, setCopied] = useState(false);
  const url = `${window.location.origin}/join/${roomId}`;

  async function copy() {
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <button className="btn secondary" onClick={copy} title={url}>
      {copied ? (
        t("shareLink.copied")
      ) : (
        <>
          <span className="hidden sm:inline">{t("shareLink.copy")}</span>
          <span className="sm:hidden">{t("shareLink.copyMobile")}</span>
        </>
      )}
    </button>
  );
}
