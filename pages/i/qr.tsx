import { useRouter } from "next/router";
import { QRCodeSVG } from "qrcode.react";
import Head from "next/head";
import { Box } from "components/ui";
export default function QRPage(): React.ReactElement {
  const router = useRouter();
  const url = String(router.query.url);

  return (
    <>
      <Head>
        <title>QR-Code Einladung</title>
      </Head>
      <Box className="p-4 flex justify-center">
        <QRCodeSVG
          value={url}
          bgColor="white"
          fgColor="black"
          size={512}
          style={{ width: "90vw", height: "90vh", maxWidth: 512, maxHeight: 512 }}
          imageSettings={{
            src: "/apple-touch-icon.png",
            width: 24,
            height: 24,
            excavate: true,
          }}
        />
      </Box>
    </>
  );
}
