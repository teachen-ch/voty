import { useRouter } from "next/router";
import { Text, TextProps } from "rebass";

export const DE: React.FC<React.PropsWithChildren<TextProps>> = (props) => {
  const router = useRouter();
  return router.locale === router.defaultLocale ? (
    <Text {...props}>{props.children}</Text>
  ) : null;
};

export const FR: React.FC<React.PropsWithChildren<TextProps>> = (props) => {
  const router = useRouter();
  return router.locale === "fr" ? (
    <Text {...props}>{props.children}</Text>
  ) : null;
};

export const IT: React.FC<React.PropsWithChildren<TextProps>> = (props) => {
  const router = useRouter();
  return router.locale === "it" ? (
    <Text {...props}>{props.children}</Text>
  ) : null;
};
