"use client";
import { useTheme } from "@/hooks/useTheme";
import { Computer, Menu } from "@mui/icons-material";
import {
  AppBar,
  Box,
  Button,
  IconButton,
  PaletteMode,
  Toolbar,
  Typography,
} from "@mui/material";
import { usePathname } from "next/navigation";
import React from "react";

interface NavbarProps {
  children?: React.ReactNode;
}

export default function navbar({ children }: NavbarProps) {
  const pathname = usePathname();
  const theme = pathname.startsWith("/user/")?useTheme():null;
  return (
    <AppBar position="sticky">
      <Toolbar sx={{ bgcolor: pathname.startsWith("/user/")?theme?.mode==="light"?"#48A6A7":"":"#48A6A7"}}>
          <Box sx={{display: pathname.startsWith("/user/")?"none":"block"}}>
            <Computer />
          </Box>
        {children}
      </Toolbar>
    </AppBar>
  );
}
