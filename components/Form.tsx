import {
  useForm,
  useFormContext,
  FormProvider,
  Controller,
  UseFormReturn,
  FieldValues,
  SubmitHandler,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Text,
  Button,
  Box,
  Grid,
  Label,
  Input as UIInput,
  Select as UISelect,
  Radio as UIRadio,
  Textarea as UITextarea,
} from "components/ui";
import React, { ReactNode, useMemo } from "react";
import omit from "lodash/omit";
import { MutationFunction } from "@apollo/client";
import { useTr } from "util/translate";

export { z, Grid };

type FormMethods<T extends FieldValues = FieldValues> = UseFormReturn<T>;

export const Form = <T extends FieldValues>({
  methods,
  onSubmit,
  children,
}: {
  methods: FormMethods<T>;
  onSubmit: SubmitHandler<T>;
  children: ReactNode;
}): React.ReactElement => (
  <FormProvider {...methods}>
    <form onSubmit={methods.handleSubmit(onSubmit)}>{children}</form>
  </FormProvider>
);

export const Input: React.FC<
  React.PropsWithChildren<
    React.InputHTMLAttributes<HTMLInputElement> & {
      label: string;
      name: string;
      area?: boolean;
      setter?: (s: string) => void;
    }
  >
> = ({ label, name, setter, area, ...props }) => {
  const { register, formState } = useFormContext();
  const error = formState.errors[name]?.message as string | undefined;
  const reg = register(name);
  const onChange = setter
    ? (evt: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setter(evt.target.value);
        return reg.onChange(evt);
      }
    : reg.onChange;

  return (
    <>
      <Label
        className="self-center"
        key={label}
        htmlFor={props.id || name}
      >
        {label}:
      </Label>
      {area ? (
        <UITextarea
          key={"i" + label}
          id={props.id || name}
          {...(props as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
          {...reg}
          onChange={onChange}
        />
      ) : (
        <UIInput
          key={"i" + label}
          id={props.id || name}
          {...props}
          {...reg}
          onChange={onChange}
        />
      )}
      {error ? (
        <>
          <span />
          <Text variant="fielderror">{error}</Text>
        </>
      ) : null}
    </>
  );
};

type QFormField = {
  name?: string;
  type?: string;
  label?: string;
  placeholder?: string;
  init?: string | number | null;
  required?: boolean;
  setter?: (s: string) => void;
  validate?: z.ZodTypeAny;
  options?: Record<string, unknown>;
  focus?: boolean;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type QFormProps = {
  fields: Record<string, QFormField>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSubmit?: (values: any) => unknown;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  mutation: MutationFunction<any, any>;
  children?: ReactNode;
};

function buildFieldSchema(f: QFormField): z.ZodTypeAny {
  let v = f.validate;
  if (!v) {
    if (f.type === "email") {
      v = z.string().email("Bitte gültige Email-Adresse angeben");
    } else if (f.type === "number") {
      v = z.coerce.number();
    } else {
      v = z.string();
    }
  }
  if (f.required) {
    if (v instanceof z.ZodString) {
      v = v.min(1, "Pflichtfeld");
    } else {
      v = v.refine(
        (x: unknown) => x !== null && x !== undefined && x !== "",
        "Pflichtfeld",
      );
    }
  } else if (v instanceof z.ZodString) {
    // optional strings allow empty
    v = v.optional().or(z.literal(""));
  } else {
    v = v.optional();
  }
  return v;
}

export const QForm: React.FC<QFormProps> = ({
  fields,
  mutation,
  onSubmit,
  children,
}) => {
  const { fieldArr, schema, defaults } = useMemo(() => {
    const fieldArr: QFormField[] = [];
    const shape: Record<string, z.ZodTypeAny> = {};
    const defaults: Record<string, unknown> = {};

    for (const name of Object.keys(fields)) {
      const f: QFormField = {
        ...fields[name],
        name: fields[name].name || name,
        type: fields[name].type || "string",
      };
      if (typeof f.label === "undefined")
        f.label = name[0].toUpperCase() + name.substring(1);
      defaults[name] = typeof f.init !== "undefined" ? f.init : "";
      if (f.type !== "submit" && f.type !== "hidden") {
        shape[name] = buildFieldSchema(f);
      }
      fieldArr.push(f);
    }
    return {
      fieldArr,
      schema: z.object(shape),
      defaults,
    };
  }, [fields]);

  const methods = useForm<Record<string, unknown>>({
    resolver: zodResolver(schema),
    defaultValues: defaults,
    mode: "onSubmit",
  });

  const doMutation = (values: Record<string, unknown>) =>
    mutation({ variables: omit(values, "submit") });
  const submit = onSubmit || doMutation;

  function generateField(field: QFormField) {
    if (field.type === "submit") {
      return <Submit key={`${field.name}-submit`} label={field.label || ""} />;
    }
    if (field.type === "radio") {
      if (!field.options) throw new Error("You need to specify options");
      return (
        <RadioGroup
          label={field.label || ""}
          name={field.name || ""}
          key={field.name}
          opts={field.options as Record<string, string | number>}
        />
      );
    }
    if (field.type === "hidden") {
      return (
        <input
          key={field.name}
          type="hidden"
          {...methods.register(field.name as string)}
          defaultValue={String(field.init ?? "")}
        />
      );
    }
    if (field.type === "select") {
      if (!field.options) throw new Error("You need to specify options");
      const opts = field.options;
      return (
        <Select
          label={field.label || ""}
          name={field.name as string}
          key={field.name}
          defaultValue={String(field.init ?? "")}
        >
          {Object.keys(opts).map((val) => (
            <option key={val} value={val}>
              {String(opts[val])}
            </option>
          ))}
        </Select>
      );
    }
    if (field.type === "textarea") {
      return (
        <Input
          area={true}
          key={field.name}
          label={field.label || field.name || ""}
          name={field.name as string}
          setter={field.setter}
          placeholder={field.placeholder}
        />
      );
    }
    return (
      <Input
        type={field.type}
        key={field.name}
        label={field.label || field.name || ""}
        name={field.name as string}
        setter={field.setter}
        placeholder={field.placeholder}
        autoFocus={field.focus}
      />
    );
  }

  return (
    <Form methods={methods} onSubmit={submit}>
      <Grid gap={2} columns="1fr 3fr">
        {fieldArr.map((field) => generateField(field))}
        {children}
      </Grid>
    </Form>
  );
};

type RadioGroupProps = {
  label: string;
  opts: Record<string, string | number>;
  name: string;
};

export const RadioGroup: React.FC<RadioGroupProps> = ({
  label,
  opts,
  name,
}) => {
  const { register, formState } = useFormContext();
  const error = formState.errors[name]?.message as string | undefined;
  const reg = register(name);
  return (
    <>
      <Label className="self-center" key={label}>
        {label}:
      </Label>
      <Grid columns="1fr 1fr">
        {Object.keys(opts).map((optValue) => (
          <Label className="self-center" key={optValue}>
            <UIRadio id={`${name}-${optValue}`} value={optValue} {...reg} />
            {opts[optValue]}
          </Label>
        ))}
      </Grid>

      {error ? (
        <>
          <span />
          <Text variant="fielderror">{error}</Text>
        </>
      ) : null}
    </>
  );
};

type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement> & {
  label: string;
  name: string;
  setter?: (s: string) => void;
};

export const Select: React.FC<React.PropsWithChildren<SelectProps>> = ({
  label,
  name,
  defaultValue,
  children,
  ...props
}) => {
  const { register, formState } = useFormContext();
  const error = formState.errors[name]?.message as string | undefined;
  const reg = register(name);
  return (
    <>
      <Label
        className="self-center"
        key={label}
        htmlFor={props.id || name}
      >
        {label}:
      </Label>

      <UISelect
        id={props.id || name}
        defaultValue={defaultValue}
        {...props}
        {...reg}
      >
        {children}
      </UISelect>
      {error ? (
        <>
          <span />
          <Text variant="fielderror">{error}</Text>
        </>
      ) : null}
    </>
  );
};

type ErrorBoxProps = React.HTMLAttributes<HTMLDivElement> & {
  error: string;
};

export const ErrorBox: React.FC<React.PropsWithChildren<ErrorBoxProps>> = ({
  error,
  className,
  ...props
}) => {
  const tr = useTr();
  if (!error) return null;
  return (
    <Box
      className={`pl-4 py-2 sm:col-start-2 border-l-4 border-l-danger ${
        className ?? ""
      }`}
      {...props}
    >
      <Text>
        <b>{tr("Error.Title")}: </b>
        {tr(error)}
      </Text>
    </Box>
  );
};

export const Submit: React.FC<React.PropsWithChildren<{ label: string }>> = ({
  label,
}) => {
  const { formState } = useFormContext();
  const tr = useTr();
  const submitting = formState.isSubmitting;
  return (
    <Button type="submit" disabled={submitting} className="sm:col-start-2">
      {submitting ? tr("Misc.Wait") : label}
    </Button>
  );
};
