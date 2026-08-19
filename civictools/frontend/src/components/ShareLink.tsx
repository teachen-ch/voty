import { useEffect, useState } from "preact/hooks";
import { useTranslation } from "react-i18next";
import QRCode from "qrcode";

interface Props {
  roomId: string;
}

export function ShareLink({ roomId }: Props) {
  const { t } = useTranslation();
  const [copied, setCopied] = useState(false);
  const [showQr, setShowQr] = useState(false);
  const [qr, setQr] = useState<string | null>(null);
  const url = `${window.location.origin}/join/${roomId}`;

  useEffect(() => {
    if (!showQr) return;
    QRCode.toDataURL(url, { width: 420, margin: 2 })
      .then(setQr)
      .catch(() => setQr(null));
  }, [showQr, url]);

  async function copy() {
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <>
      <button
        className="btn secondary px-2"
        onClick={() => setShowQr(true)}
        title={t("shareLink.showQr")}
        aria-label={t("shareLink.showQr")}
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h2v2h-2zM18 14h2v6h-6v-2h4z" />
        </svg>
      </button>
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
      {showQr && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4"
          onClick={() => setShowQr(false)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-label={t("shareLink.qrTitle")}
            className="bg-white rounded-2xl shadow-xl p-6 max-w-[min(90vw,520px)] flex flex-col items-center gap-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between w-full gap-4">
              <h2 className="text-lg font-semibold">
                {t("shareLink.qrTitle")}
              </h2>
              <button
                className="text-2xl leading-none text-slate-500"
                onClick={() => setShowQr(false)}
                aria-label="Close"
              >
                ×
              </button>
            </div>
            {qr ? (
              <img src={qr} alt={url} className="w-[min(75vw,420px)] h-auto" />
            ) : (
              <p>{t("shareLink.qrLoading")}</p>
            )}
            <p className="text-sm text-slate-500 break-all text-center">
              {url}
            </p>
          </div>
        </div>
      )}
    </>
  );
}
