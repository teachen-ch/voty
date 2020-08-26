import { Box, Flex, Button } from "rebass";
import { Label, Input, Select } from "@rebass/forms";

export default function Newsletter() {
  return (
    <Box>
      <form action="https://newsletter.teachen.ch/subscribe" method="POST">
        <Field id="Vorname" label="Vorname" />
        <Field id="name" label="Nachname" />

        <SelectField id="Funktion" label="Ich bin">
          <option>---</option>
          <option>Lehrer/-in</option>
          <option>Schüler/-in</option>
          <option>Schulleiter/-in</option>
          <option>Weltenbürger/-in</option>
        </SelectField>

        <Field id="email" label="Email" />

        <input type="hidden" name="list" value="tpTmOmECEZr7Zjk76307UvTA" />
        <input type="hidden" name="subform" value="yes" />
        <Submit name="submit" value="Newsletter anmelden" />
      </form>
    </Box>
  );
}

export function Field({ id, label }: { id: string; label: string }) {
  return (
    <Flex my={3} flexWrap="wrap">
      <Box width={1 / 4} minWidth="100px">
        <Label htmlFor={id}>{label}</Label>
      </Box>
      <Box width={3 / 4}>
        <Input type="text" name={id} id={id} />
      </Box>
    </Flex>
  );
}

export function Submit({ name, value }: { name: string; value: string }) {
  return (
    <Flex my={3} flexWrap="wrap">
      <Box width={1 / 4} minWidth="100px"></Box>
      <Box width={3 / 4}>
        <Button type="submit" name={name} variant="primary">
          {value}
        </Button>
      </Box>
    </Flex>
  );
}

export function SelectField({
  id,
  label,
  children,
}: {
  id: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <Flex my={3} flexWrap="wrap">
      <Box width={1 / 4} minWidth="100px">
        <Label htmlFor={id}>{label}</Label>
      </Box>
      <Box width={3 / 4}>
        <Select name={id} id={id} sx={{ width: "100%" }}>
          {children}
        </Select>
      </Box>
    </Flex>
  );
}
