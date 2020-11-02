import { useRouter } from "next/router";
import QRCode from "qrcode.react";

export default function QRPage(): React.ReactElement {
  const router = useRouter();
  const url = String(router.query.url);

  return (
    <QRCode
      value={url}
      renderAs="svg"
      bgColor="white"
      fgColor="black"
      width="100vw"
      height="100vh"
      imageSettings={{
        src: "/apple-touch-icon.png",
        width: 24,
        height: 24,
      }}
    />
  );
}
