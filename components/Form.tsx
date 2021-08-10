import {
  Formik,
  Form,
  useField,
  FormikFormProps,
  useFormikContext,
} from "formik";
import { Text, Button, Box, BoxProps } from "rebass";
import { Grid } from "theme-ui";
import {
  Input as RebassInput,
  Label as RebassLabel,
  Select as RebassSelect,
  InputProps as RebassInputProps,
  SelectProps as RebassSelectProps,
  Radio as RebassRadio,
  Textarea,
} from "@rebass/forms";
import * as yup from "yup";
import React, { useMemo } from "react";
import { omit } from "lodash";
import { MutationFunction } from "@apollo/client";
import { tr } from "util/translate";

export { Formik, Form, yup, Grid };

export const Input: React.FC<
  RebassInputProps & {
    label: string;
    area?: boolean;
    setter?: (s: string) => void;
  }
> = ({ label, setter, area, ...props }) => {
  const [field, meta] = useField<string>(props as any);
  const InputComponent = area ? Textarea : RebassInput;
  // TODO: this is a really hacky way to get values out of the form again
  // e.g. on login.tsx email field
  const onChange = setter
    ? (evt: React.ChangeEvent<any>) => {
        setter(evt.target.value);
        field.onChange(evt);
      }
    : field.onChange;

  return (
    <>
      <RebassLabel
        sx={{ alignSelf: "center" }}
        key={label}
        htmlFor={props.id || props.name}
      >
        {label}:
      </RebassLabel>
      <InputComponent
        key={"i" + label}
        id={props.id || props.name}
        /* @ts-ignore */
        onChange={onChange}
        /* @ts-ignore */
        onBlur={field.onBlur}
        value={field.value}
        {...props}
      />
      {meta.touched && meta.error ? (
        <>
          <span />
          <Text variant="fielderror">{meta.error}</Text>
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
  validate?: YupType;
  options?: Record<string, any>;
  focus?: boolean;
};

type YupType =
  | yup.StringSchema<string | undefined>
  | yup.NumberSchema<number | undefined>;

type QFormProps = FormikFormProps & {
  fields: Record<string, QFormField>;
  onSubmit?: (values: Record<string, any>) => void;
  mutation: MutationFunction<any, any>;
};

export const QForm: React.FC<QFormProps> = ({ fields, mutation, ...props }) => {
  // default onSubmit = execute mutation handler
  const doMutation = (values: Record<string, string | number>) =>
    mutation({ variables: omit(values, "submit") });
  const onSubmit = props.onSubmit ? props.onSubmit : doMutation;

  const { fieldArr, validationSchema, initialValues } = useMemo(
    configureFields,
    [fields]
  );

  function configureFields() {
    const fieldArr: QFormField[] = [];
    const validationSchema: Record<string, YupType> = {};
    const initialValues: Record<string, any> = {};

    Object.keys(fields).forEach((name) => {
      const f = fields[name];
      f.type = f.type || "string";
      f.name = f.name || name;

      initialValues[name] = typeof f.init !== "undefined" ? f.init : "";
      if (!f.validate) {
        const yupTypes: Record<string, YupType> = {
          string: yup.string(),
          number: yup.number(),
          email: yup.string().email("Bitte gültige Email-Adresse angeben"),
        };
        f.validate = yupTypes[f.type] || yup.string();
      }
      if (typeof f.label === "undefined")
        f.label = name[0].toUpperCase() + name.substring(1);
      if (f.required) {
        f.validate = f.validate.required("Pflichtfeld");
      }
      if (f.validate) validationSchema[name] = f.validate;
      fieldArr.push(f);
    });

    return {
      fieldArr,
      validationSchema: yup.object(validationSchema),
      initialValues,
    };
  }

  function generateField(field: QFormField) {
    if (field.type === "submit") {
      return <Submit key={`${field.name}-submit`} label={field.label || ""} />;
    }
    if (field.type === "radio") {
      if (!field.options) throw new Error("You need to specify options");
      const opts = field.options;
      return (
        <RadioGroup
          label={field.label || ""}
          name={field.name || ""}
          key={field.name}
          opts={opts}
        />
      );
    }
    if (field.type === "hidden") {
      return (
        <input
          key={field.name}
          type="hidden"
          name={field.name}
          value={String(field.init)}
        />
      );
    }
    if (field.type === "select") {
      if (!field.options) throw new Error("You need to specify options");
      const opts = field.options;
      return (
        <Select
          label={field.label || ""}
          name={field.name}
          key={field.name}
          defaultValue={String(field.init)}
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
          name={field.name}
          setter={field.setter}
          placeholder={field.placeholder}
        />
      );
    } else {
      return (
        <Input
          type={field.type}
          key={field.name}
          label={field.label || field.name || ""}
          name={field.name}
          setter={field.setter}
          placeholder={field.placeholder}
        />
      );
    }
  }

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values) => {
        return onSubmit(values);
      }}
      validationSchema={validationSchema}
      validateOnBlur={false}
      validateOnChange={false}
    >
      <Form>
        <Grid gap={2} columns={[0, 0, "1fr 3fr"]}>
          {fieldArr.map((field) => generateField(field))}
          {props.children}
        </Grid>
      </Form>
    </Formik>
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
  ...props
}) => {
  const [, meta] = useField(props.name);
  return (
    <>
      <RebassLabel sx={{ alignSelf: "center" }} key={label}>
        {label}:
      </RebassLabel>
      <Grid columns="1fr 1fr">
        {Object.keys(opts).map((name) => (
          <RebassLabel sx={{ alignSelf: "center" }} key={name}>
            <Radio id={label} name={props.name} value={name} />
            {opts[name]}
          </RebassLabel>
        ))}
      </Grid>

      {meta.touched && meta.error ? (
        <>
          <span />
          <Text variant="fielderror">{meta.error}</Text>
        </>
      ) : null}
    </>
  );
};

export const Radio: React.FC<{ id: string; name: string; value: any }> = (
  props
) => {
  const [field] = useField(props);
  return <RebassRadio id={props.id} {...field} />;
};

type SelectProps = RebassSelectProps & {
  label: string;
  setter?: (s: string) => void;
};

export const Select: React.FC<SelectProps> = ({
  label,
  defaultValue,
  ...props
}) => {
  const [field, meta] = useField<string | number>(props as any);
  return (
    <>
      <RebassLabel
        sx={{ alignSelf: "center" }}
        key={label}
        htmlFor={props.id || props.name}
      >
        {label}:
      </RebassLabel>

      {/* @ts-ignore */}
      <RebassSelect
        id={props.id || props.name}
        {...field}
        value={field.value || defaultValue}
        {...props}
      />
      {meta.touched && meta.error ? (
        <>
          <span />
          <Text variant="fielderror">{meta.error}</Text>
        </>
      ) : null}
    </>
  );
};

type ErrorBoxProps = BoxProps & {
  error: string;
};

export const ErrorBox: React.FC<ErrorBoxProps> = ({ error, ...props }) => {
  if (!error) return null;
  return (
    <Box
      pl={3}
      py={2}
      sx={{
        gridColumn: [0, 0, 2],
        borderLeftColor: "danger",
        borderLeftStyle: "solid",
        borderLeftWidth: 4,
      }}
      {...props}
    >
      <Text>
        <b>Fehler: </b>
        {tr(error)}
      </Text>
    </Box>
  );
};

export const Submit: React.FC<{ label: string }> = ({ label }) => {
  const context = useFormikContext();
  const submitting = context.isSubmitting;
  return (
    <Button type="submit" disabled={submitting} sx={{ gridColumn: [0, 0, 2] }}>
      {submitting ? "Bitte warten..." : label}
    </Button>
  );
};
