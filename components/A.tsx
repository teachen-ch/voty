import Link from "next/link";
import React from "react";
import { useRouter } from "next/router";
import { cn } from "util/cn";

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
