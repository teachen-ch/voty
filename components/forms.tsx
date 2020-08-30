import { Formik, Form, useField } from "formik";
import { Text, Box, Button } from "rebass";
import {
  Input as RInput,
  Label as RLabel,
  Select as RSelect,
} from "@rebass/forms";
import * as yup from "yup";
import { Grid } from "theme-ui";
import React, { useMemo } from "react";
import _ from "lodash";

export { Formik, Form, yup };

export function Input({ label, ...props }) {
  const [field, meta] = useField(props as any);
  return (
    <>
      <RLabel key={label} htmlFor={props.id || props.name}>
        {label}
      </RLabel>
      <RInput key={"i" + label} {...field} {...props} />
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
}

export function QForm({ fields, mutation, ...props }) {
  // default onSubmit = execute mutation handler
  const doMutation = (values) =>
    mutation({ variables: { data: _.omit(values, "submit") } });
  const onSubmit = props.onSubmit ? props.onSubmit : doMutation;

  const { fieldArr, validationSchema, initialValues } = useMemo(
    configureFields,
    [fields]
  );

  function configureFields() {
    const fieldArr = [];
    const validationSchema = {};
    const initialValues = {};

    Object.keys(fields).forEach((name) => {
      let { label, type, required, options, validate, init } = fields[name];
      initialValues[name] = typeof init !== "undefined" ? init : "";
      // console.error("INIT", name, label, type, required ? "true" : "no");
      if (!validate) {
        const yupTypes = {
          string: yup.string(),
          number: yup.number(),
          email: yup.string().email("Bitte gültige Email-Adresse angeben"),
        };
        validate = yupTypes[type] || yup.string();
      }
      if (options) {
        type = "select";
      }
      if (typeof label === "undefined")
        label = name[0].toUpperCase() + name.substring(1);
      if (required) {
        validate = validate.required("Pflichtfeld");
      }
      if (validate) validationSchema[name] = validate;
      // console.log("FIELD: ", { name, label, type, required, options, validate });
      fieldArr.push({ name, label, type, required, options });
    });

    return {
      fieldArr,
      validationSchema: yup.object(validationSchema),
      initialValues,
    };
  }

  function generateField(field) {
    if (field.type === "submit") {
      return (
        <React.Fragment key={`${field.name}-frag`}>
          <span key={`${field.name}-span`} />
          <Button type="submit" key={field.name}>
            {field.label}
          </Button>
        </React.Fragment>
      );
    }
    if (field.type === "select") {
      return (
        <Select label={field.label} name={field.name} key={field.name}>
          {Object.keys(field.options).map((label) => (
            <option key={label} value={field.options[label]}>
              {label}
            </option>
          ))}
        </Select>
      );
    } else {
      return (
        <Input
          key={field.name}
          label={field.label}
          name={field.name}
          type={field.type}
        />
      );
    }
  }

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      <Form>
        <Grid gap={2} columns={[0, 0, "1fr 3fr"]}>
          {fieldArr.map((field) => generateField(field))}
          {props.children}
        </Grid>
      </Form>
    </Formik>
  );
}

export function Select({ label, ...props }) {
  const [field, meta] = useField(props as any);
  return (
    <>
      <RLabel key={label} htmlFor={props.id || props.name}>
        {label}
      </RLabel>
      <RSelect {...field} {...props} />
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
}
