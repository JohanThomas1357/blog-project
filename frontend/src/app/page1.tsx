import React from "react";
import MyPost from "@/components/userComponents/myPost";
import { Box } from "@mui/material";

export default function Home() {
  return (
    <>
      <Box sx={{width:"100vw",height:"100vh",display:"flex",justifyContent:"center",alignItems:"center"}} >
        <Box  width={800}>
          <MyPost />
        </Box>
      </Box>
    </>
  );
}
