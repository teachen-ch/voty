import { Button, Label, Input, Select, Grid } from "components/ui";
import { ReactElement } from "react";

export const Newsletter: React.FC<
  React.PropsWithChildren<{ campaign?: string; submit?: string }>
> = ({ campaign, submit }) => (
  <form action="https://newsletter.teachen.ch/subscribe" method="POST">
    <Grid gap={2} columns="1fr 3fr" className="py-8">
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
      <input type="hidden" name="Kampagne" value={campaign || "Newsletter"} />
      <input type="hidden" name="subform" value="yes" />
      <Submit name="submit" value={submit || "Newsletter anmelden"} />
    </Grid>
  </form>
);

export const NewsletterSlim: React.FC<
  React.PropsWithChildren<{ campaign?: string }>
> = ({ campaign }) => (
  <form action="https://newsletter.teachen.ch/subscribe" method="POST">
    <Label htmlFor="email" className="mb-2 block">
      Ihre Email:
    </Label>

    <Grid gap={2} columns="3fr 1fr">
      <Input
        name="email"
        id="email"
        placeholder="name@meineschule.ch"
        className="bg-highlight placeholder:text-white"
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
      <Label htmlFor={id} className="self-center">
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
    <Button type="submit" name={name} className="sm:col-start-2">
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
      <Label htmlFor={id} className="mt-2 block">
        {label}:
      </Label>
      <Select name={id} id={id} className="w-full">
        {children}
      </Select>
    </>
  );
}
