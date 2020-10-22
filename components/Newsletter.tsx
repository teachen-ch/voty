import { Button } from "rebass";
import { Label, Input, Select } from "@rebass/forms";
import { Grid } from "theme-ui";
import { ReactElement } from "react";

export default function Newsletter(): ReactElement {
  return (
    <form action="https://newsletter.teachen.ch/subscribe" method="POST">
      <Grid gap={2} py={4} columns={[0, 0, "1fr 3fr"]}>
        <Field id="Vorname" label="Vorname" />
        <Field id="name" label="Nachname" />

        <SelectField id="Funktion" label="Ich bin">
          <option>---</option>
          <option>Lehrer*in</option>
          <option>Schüler*in</option>
          <option>Schulleiter*in</option>
          <option>Weltenbürger*in</option>
        </SelectField>

        <Field id="email" label="Email" />

        <input type="hidden" name="list" value="tpTmOmECEZr7Zjk76307UvTA" />
        <input type="hidden" name="subform" value="yes" />
        <Submit name="submit" value="Newsletter anmelden" />
      </Grid>
    </form>
  );
}

export function Field({
  id,
  label,
}: {
  id: string;
  label: string;
}): ReactElement {
  return (
    <>
      <Label htmlFor={id} alignSelf="center">
        {label}:
      </Label>
      <Input type="text" name={id} id={id} />
    </>
  );
}

export function Submit({
  name,
  value,
}: {
  name: string;
  value: string;
}): ReactElement {
  return (
    <Button
      type="submit"
      name={name}
      variant="primary"
      sx={{ gridColumn: [0, 0, 2] }}
    >
      {value}
    </Button>
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
}): ReactElement {
  return (
    <>
      <Label htmlFor={id}>{label}</Label>
      <Select name={id} id={id} sx={{ width: "100%" }}>
        {children}
      </Select>
    </>
  );
}
