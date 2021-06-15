import { useRouter } from "next/router";
import QRCode from "qrcode.react";
import Head from "next/head";
import { Box } from "rebass";
export default function QRPage(): React.ReactElement {
  const router = useRouter();
  const url = String(router.query.url);

  return (
    <>
      <Head>
        <title>QR-Code Einladung</title>
      </Head>
      <Box p={3} variant="centered">
        <QRCode
          value={url}
          renderAs="svg"
          bgColor="white"
          fgColor="black"
          width="90vw"
          height="90vh"
          imageSettings={{
            src: "/apple-touch-icon.png",
            width: 24,
            height: 24,
          }}
        />
      </Box>
    </>
  );
}
