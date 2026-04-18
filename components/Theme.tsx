import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useTheme } from "util/hooks";

export const Theme: React.FC<React.PropsWithChildren<unknown>> = ({
  children,
}) => {
  const themeName = useTheme();
  const router = useRouter();

  useEffect(() => {
    if (themeName === "aula") {
      document.body.classList.add("theme-aula");
      router.pathname === "/" && router.replace("/aula");
    } else {
      document.body.classList.remove("theme-aula");
    }
  }, [themeName, router]);

  return <>{children}</>;
};
