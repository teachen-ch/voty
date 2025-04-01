import React, { ElementType, useEffect, useState } from "react";
import votyTheme from "styles/theme";
import aulaTheme from "styles/aula_theme";
import { ThemeProvider } from "theme-ui";
import { useRouter } from "next/router";
import { useTheme } from "util/hooks";

export const Theme: React.FC<
  React.PropsWithChildren<{ chilren?: React.ReactNode }>
> = ({ children }) => {
  const themeName = useTheme();
  const theme = themeName === "aula" ? aulaTheme : votyTheme;
  const router = useRouter();

  useEffect(() => {
    if (themeName === "aula" && router.pathname == "/") router.replace("/aula");
  }, [themeName, router]);
  // @ts-ignore bad type for old theme-ui. Remove after updating theme-ui
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};
