"use client";
import { Computer, Menu } from "@mui/icons-material";
import { Avatar, Box, IconButton, Typography } from "@mui/material";
import React, { useState } from "react";
import Dropdown from "../userComponents/Dropdown";

interface User {
  id: number|undefined;
  name: string|undefined;
}

interface UserProps {
  data?: User;
  handleDrawer: ()=>void;
  setRouting: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function user({ data,handleDrawer,setRouting }: UserProps) {
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleAnchorEl = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };
  return (
    <>
      <Box sx={{display:{md:"none"},flexGrow:1}}>
        <IconButton color="inherit" onClick={handleDrawer}>
          <Menu />
        </IconButton>
      </Box>
      <Box>
        <Computer />
      </Box>
      <Typography variant="h6" padding={2} flexGrow={1}>
        Ayinu?
      </Typography>

      <IconButton color="inherit" size="large" onClick={handleAnchorEl}>
        <Avatar>{data?.name ? data?.name[0] : "G"}</Avatar>
      </IconButton>
      <Dropdown anchorElUser={anchorElUser} setRouting={setRouting} setAnchorElUser={setAnchorElUser} />
    </>
  );
}
