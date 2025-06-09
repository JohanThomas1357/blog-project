"use client";
import React, { use, useEffect } from "react";
import Navbar from "@/components/navbar";
import axios, { AxiosError, AxiosResponse } from "axios";
import { useQuery } from "@tanstack/react-query";
import UserNav from "@/components/NavContent/user";
import { Backdrop, Box, CircularProgress, Divider, Stack } from "@mui/material";
import RightBar from "@/components/userComponents/Rightbar";
import SideBar from "@/components/userComponents/sideBar";
import Content from "@/components/userComponents/Content";
import Add from "@/components/userComponents/Add";
import { useFetchPosts } from "@/hooks/useFetchPosts";
import { useFetchUsers } from "@/hooks/useFetchUsers";
import { useRouter, useSearchParams } from "next/navigation";
import { DecodeToken } from "@/utils/authenticate";

export default function page() {

  const router = useRouter();
  const { postData, postLoading, postError } = useFetchPosts();
  const {userData,userLoading,isError} = useFetchUsers();
  
  if(isError){
    router.push("/not-found")
  }

  return (
    <>
      {postLoading && userLoading? (
        <Box
          flex={7.38}
          position="sticky"
          mb={100}
          p={6}
          sx={{ height: "87vh" }}
        >
          <Backdrop
            sx={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100vw",
              height: "100vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            open
          >
            <CircularProgress color="inherit" />
          </Backdrop>
        </Box>
      ) : (
        <>
          <Content PostInfo={postData} />
          <Box>
            <Divider
              orientation="vertical"
              sx={{ display: { xs: "none", lg: "flex" } }}
            />
          </Box>
          {/* Right Bar */}
          <RightBar userData={userData} PostData={postData}/>
        </>
      )}
      <Add />
    </>
  );
}
