'use client'
import { Fab, Tooltip } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import React, { useState } from "react";
import CreatePost from "./CreatePost";

export default function Add() {
  const [open,setOpen] = useState<boolean>(false);
  return (
    <>
      <Tooltip title="Create Post" onClick={()=>setOpen(true)} sx={{position:"fixed",bottom:20,right:{xs:"calc(50% - 25px)",md:30}}}>
        <Fab color="secondary">
            <EditIcon/>
        </Fab>
      </Tooltip>
      <CreatePost open={open} setOpen={setOpen}/>
    </>
  );
}
