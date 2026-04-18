import { Box, Text } from "components/ui";
import Link from "next/link";
import React, { Fragment } from "react";
import { useRouter } from "next/router";
import { cn } from "util/cn";

export const Breadcrumb: React.FC<React.PropsWithChildren<unknown>> = ({
  children,
}) => (
  <Box className="-mt-3 xs:-mt-3 sm:-mt-4 mb-4 text-sm sm:text-base text-blue2 overflow-hidden text-ellipsis whitespace-nowrap">
    {React.Children.map(children, (child, i) => (
      <Fragment key={i}>
        {i > 0 ? " / " : ""}
        {child}
      </Fragment>
    ))}
  </Box>
);

export type AProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  locale?: string | false;
};

export const A: React.FC<React.PropsWithChildren<AProps>> = ({
  href,
  locale,
  className,
  children,
  ...props
}) => {
  const router = useRouter();
  const resolvedLocale = locale !== undefined ? locale : router.locale;
  const cls = cn("cursor-pointer no-underline hover:underline", className);

  if (href) {
    return (
      <Link href={href} locale={resolvedLocale} className={cls} {...props}>
        {children}
      </Link>
    );
  }
  return (
    <a className={cls} {...props}>
      {children}
    </a>
  );
};

export const Here: React.FC<React.PropsWithChildren<unknown>> = ({
  children,
}) => (
  <Text variant="inline" className="text-black">
    {children}
  </Text>
);
