"use client"
import { PaletteMode } from "@mui/material";
import React, { createContext, useEffect, useState } from "react";
import MuiThemeProvider from "./MuiThemeContext";

interface ThemeProps {
  mode: PaletteMode;
  setMode: React.Dispatch<React.SetStateAction<PaletteMode>>;
}

export const ThemeContext = createContext<ThemeProps | undefined>(undefined);
export function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
    const [mode, setMode] = useState<PaletteMode>("light");
    const [mounted, setMounted] = useState(false);
  
    useEffect(() => {
      const savedTheme = localStorage.getItem("theme") as PaletteMode;
      if (savedTheme) {
        setMode(savedTheme);
      }
      setMounted(true);
    }, []);
  
    useEffect(() => {
      if (mounted) {
        localStorage.setItem("theme", mode);
      }
    }, [mode, mounted]);
  
    if (!mounted) {
      return null;
    }
  
    
  return (
    <ThemeContext.Provider value={{ mode, setMode }}>
      <MuiThemeProvider>{children}</MuiThemeProvider>
    </ThemeContext.Provider>
  );
}
