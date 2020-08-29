import { Formik, Form, useField } from "formik";
import { Text, Box } from "rebass";
import {
  Input as RInput,
  Label as RLabel,
  Select as RSelect,
} from "@rebass/forms";
import * as Yup from "yup";

export { Formik, Form, Yup };

export function Input({ label, ...props }) {
  const [field, meta] = useField(props as any);
  return (
    <>
      <RLabel htmlFor={props.id || props.name}>{label}</RLabel>
      <RInput {...field} {...props} />
      {meta.touched && meta.error ? (
        <>
          <span />
          <Text variant="fielderror" fontSize={1}>
            {meta.error}
          </Text>
        </>
      ) : null}
    </>
  );
}

export function Select({ label, ...props }) {
  const [field, meta] = useField(props as any);
  return (
    <>
      <RLabel htmlFor={props.id || props.name}>{label}</RLabel>
      <RSelect {...field} {...props} />
      {meta.touched && meta.error ? (
        <Text variant="error">{meta.error}</Text>
      ) : null}
    </>
  );
}
