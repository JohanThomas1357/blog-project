"use client"

import {Box, Button,Typography } from "@mui/material";

interface homeProps {
      setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
export default function Home({setIsOpen}:homeProps) {
  return (
    <>
    <Box sx={{ display: "flex", flexGrow: 1 }}/>
      <Typography
        variant="h5"
        paddingLeft={1}
        sx={{ flexGrow: 1, fontFamily: "'Dancing Script', cursive" }}
      >
        Make Your Own Blog
      </Typography>
      <Button
        variant="text"
        color="inherit"
        sx={{ textTransform: "none", paddingRight: "40px" }}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <Typography variant="h6">Sign In</Typography>
      </Button>
    </>
  );
}
