"use client";
import { Menu, MenuItem, Typography } from "@mui/material";
import React, { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { useChangeState } from "@/context/stateContext";

interface dropProps {
  anchorElUser: HTMLElement | null;
  setAnchorElUser: React.Dispatch<React.SetStateAction<HTMLElement | null>>;
  setRouting: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Dropdown({
  anchorElUser,
  setAnchorElUser,
  setRouting,
}: dropProps) {
  const { id } = useParams();
  const router = useRouter();
  const settings = ["Profile", "Logout"];
  const queryClient = useQueryClient();
  const {state,setState} = useChangeState();
  const handleCloseMenu = (setting: string) => {
    
    const settingUpdated: string = setting.toLowerCase();
    
    if (settingUpdated === "logout") {
      document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
      setRouting(true);
      setAnchorElUser(null);
      queryClient.clear();
      localStorage.setItem("LogoutMessage","Logged out successfully")
      setState((prev)=>!prev)
      window.location.href = "/"
    } 
    else {
      router.push(`/user/${id}/${settingUpdated}`);
      setAnchorElUser(null);
    }
  };

  return (
    <Menu
      id="menu-bar"
      sx={{ mt: "45px" }}
      anchorEl={anchorElUser}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={Boolean(anchorElUser)}
      onClose={handleCloseMenu}
    >
      {settings.map((setting) => (
        <MenuItem key={setting} onClick={() => handleCloseMenu(setting)}>
          <Typography sx={{ textAlign: "center" }}>{setting}</Typography>
        </MenuItem>
      ))}
    </Menu>
  );
}
