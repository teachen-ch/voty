import { useRouter } from "next/router";
import { Heading, Image, Box } from "rebass";
import { PanelPage } from "./panel/[code]/present";
import { QForm } from "components/Form";
import { useLoginMutation } from "graphql/types";

export default function Panels(): React.ReactElement {
  const router = useRouter();

  const [dummyMutation] = useLoginMutation();

  async function onSubmit(values: Record<string, any>) {
    const code = String(values.code).replace(/[^\d]/g, "");
    await router.push(`/panel/${code}`);
  }

  return (
    <PanelPage heading="Willkommen auf voty.ch">
      <Heading></Heading>
      <QForm
        fields={{
          code: { label: "Panel-Code", required: true, type: "tel" },
          submit: { type: "submit", label: "Los geht's" },
        }}
        mutation={dummyMutation}
        onSubmit={onSubmit}
      ></QForm>
      <Box variant="centered">
        <Image my={5} src="/images/voty_module_2.svg" maxWidth="50%" alt="" />
      </Box>
    </PanelPage>
  );
}
