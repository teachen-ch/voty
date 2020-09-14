import { Formik, Form, useField, FormikFormProps } from "formik";
import { Text, Button, Card, Box, BoxProps } from "rebass";
import { Grid } from "theme-ui";
import {
  Input as RebassInput,
  Label as RebassLabel,
  Select as RSelect,
  InputProps as RebassInputProps,
  SelectProps as RebassSelectProps,
} from "@rebass/forms";
import * as yup from "yup";
import React, { useMemo } from "react";
import { omit } from "lodash";
import {
  DocumentNode,
  MutationFunctionOptions,
  MutationOptions,
  FetchResult,
} from "@apollo/client";

export { Formik, Form, yup, Grid, Card };

type InputProps = RebassInputProps & {
  label: string;
  setter?: (s: string) => void;
};

export const Input: React.FC<InputProps> = ({ label, setter, ...props }) => {
  const [field, meta] = useField(props as any);
  // TODO: this is a really hacky way to get values out of the form again
  // e.g. on login.tsx email field
  const onChange = setter
    ? (evt: React.ChangeEvent<HTMLInputElement>) => {
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
        {label}
      </RebassLabel>
      {/* @ts-ignore */}
      <RebassInput
        key={"i" + label}
        id={props.id || props.name}
        onChange={onChange}
        onBlur={field.onBlur}
        {...props}
      />
      {meta.touched && meta.error ? (
        <>
          <span key={"s" + label} />
          <Text key={"e" + label} variant="fielderror" fontSize={1}>
            {meta.error}
          </Text>
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
  init?: string | number;
  required?: boolean;
  setter?: (s: string) => void;
  validate?: YupType;
  options?: { [key: string]: string | number };
};

type YupType =
  | yup.StringSchema<string | undefined>
  | yup.NumberSchema<number | undefined>;

type QFormProps = FormikFormProps & {
  fields: { [key: string]: QFormField };
  onSubmit?: (values: { [key: string]: any }) => void;
  mutation: (options?: any) => Promise<FetchResult>;
};

export const QForm: React.FC<QFormProps> = ({ fields, mutation, ...props }) => {
  // default onSubmit = execute mutation handler
  const doMutation = (values: { [key: string]: any }) =>
    mutation({ variables: omit(values, "submit") });
  const onSubmit = props.onSubmit ? props.onSubmit : doMutation;

  const { fieldArr, validationSchema, initialValues } = useMemo(
    configureFields,
    [fields]
  );

  function configureFields() {
    const fieldArr: QFormField[] = [];
    const validationSchema: {
      [key: string]: YupType;
    } = {};
    const initialValues: { [key: string]: string | number } = {};

    Object.keys(fields).forEach((name) => {
      const f = fields[name];
      f.type = f.type || "string";
      if (f.options) f.type = "select";
      f.name = f.name || name;

      initialValues[name] = typeof f.init !== "undefined" ? f.init : "";
      if (!f.validate) {
        const yupTypes: {
          [key: string]: YupType;
        } = {
          string: yup.string(),
          number: yup.number(),
          email: yup.string().email("Bitte gültige Email-Adresse angeben"),
        };
        f.validate = yupTypes[f.type] || yup.string();
      }
      if (typeof f.label === "undefined")
        f.label = name[0].toUpperCase() + name.substring(1);
      if (f.required) {
        f.validate = f.validate!.required("Pflichtfeld");
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
    if (field.type === "hidden") {
      return null;
    }
    if (field.type === "submit") {
      return (
        <React.Fragment key={`${field.name}-frag`}>
          <span />
          <Button type="submit" key={field.name}>
            {field.label}
          </Button>
        </React.Fragment>
      );
    }
    if (field.type === "select") {
      if (!field.options) throw new Error("You need to specify options");
      return (
        <Select label={field.label || ""} name={field.name} key={field.name}>
          {Object.keys(field.options).map((label) => (
            <option key={label} value={field.options![label]}>
              {label}
            </option>
          ))}
        </Select>
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
      onSubmit={onSubmit}
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

type SelectProps = RebassSelectProps & {
  label: string;
  setter?: (s: string) => void;
};

export const Select: React.FC<SelectProps> = ({ label, ...props }) => {
  const [field, meta] = useField(props as any);
  return (
    <>
      <RebassLabel key={label} htmlFor={props.id || props.name}>
        {label}
      </RebassLabel>
      {/* @ts-ignore */}
      <RSelect id={props.id || props.name} {...field} {...props} />
      {meta.touched && meta.error ? (
        <>
          <span key={"s" + label} />
          <Text key={"e" + label} variant="fielderror" fontSize={1}>
            {meta.error}
          </Text>
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
        gridColumn: "2",
        borderLeftColor: "primary",
        borderLeftStyle: "solid",
        borderLeftWidth: 4,
      }}
      {...props}
    >
      <Text>
        <b>Fehler: </b>
        {error}
      </Text>
    </Box>
  );
};
