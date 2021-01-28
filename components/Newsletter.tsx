import { Button } from "rebass";
import { Label, Input, Select } from "@rebass/forms";
import { Grid } from "theme-ui";
import { ReactElement } from "react";

export const Newsletter: React.FC = () => (
  <form action="https://newsletter.teachen.ch/subscribe" method="POST">
    <Grid gap={2} py={4} columns={[0, 0, "1fr 3fr"]}>
      <Field id="Vorname" label="Vorname" />
      <Field id="name" label="Nachname" />
      <Field id="email" label="Email" placeholder="name@meineschule.ch" />

      <SelectField id="Funktion" label="Ich bin">
        <option>Bitte auswählen</option>
        <option>Lehrer*in</option>
        <option>Schüler*in</option>
        <option>Schulleiter*in</option>
        <option>Weltenbürger*in</option>
      </SelectField>

      <input type="hidden" name="list" value="tpTmOmECEZr7Zjk76307UvTA" />
      <input type="hidden" name="subform" value="yes" />
      <Submit name="submit" value="Newsletter anmelden" />
    </Grid>
  </form>
);

export const NewsletterSlim: React.FC<{ campaign?: string }> = ({
  campaign,
}) => (
  <form action="https://newsletter.teachen.ch/subscribe" method="POST">
    <Label htmlFor="email" mb={2}>
      Ihre Email:
    </Label>

    <Grid gap={2} columns={[0, 0, "3fr 1fr"]}>
      <Input
        name="email"
        id="email"
        placeholder="name@meineschule.ch"
        bg="lightgray"
        sx={{ "::placeholder": { color: "#fff" } }}
        mb="0px !important"
        mt="0 !important"
      />
      <input type="hidden" name="Funktion" value="Lehrer*in" />
      <input type="hidden" name="Kampagne" value={campaign} />
      <input type="hidden" name="list" value="tpTmOmECEZr7Zjk76307UvTA" />
      <input type="hidden" name="subform" value="yes" />
      <Submit name="submit" value="Anmelden" />
    </Grid>
  </form>
);

export function Field({
  id,
  label,
  placeholder,
}: {
  id: string;
  label: string;
  placeholder?: string;
}): ReactElement {
  return (
    <>
      <Label htmlFor={id} alignSelf="center">
        {label}:
      </Label>
      <Input type="text" name={id} id={id} placeholder={placeholder} />
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
    <Button type="submit" name={name} sx={{ gridColumn: [0, 0, 2] }}>
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
      <Label htmlFor={id} mt={2}>
        {label}:
      </Label>
      <Select name={id} id={id} sx={{ width: "100%" }}>
        {children}
      </Select>
    </>
  );
}
