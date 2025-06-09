import { createTheme, ThemeProvider, PaletteMode} from "@mui/material";
import { useTheme } from "@/hooks/useTheme";
import React from "react";



export default function MuiThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
    const {mode} = useTheme();
  const darkTheme = createTheme({
    palette: { mode },
  });

  return <ThemeProvider theme={darkTheme}>{children}</ThemeProvider>;
}
