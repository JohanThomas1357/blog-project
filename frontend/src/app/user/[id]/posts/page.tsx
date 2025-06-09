"use client";
import { Backdrop, Box, CircularProgress, Typography } from "@mui/material";
import React, { useState } from "react";
import { Grid2 as Grid } from "@mui/material";
import MyPost from "@/components/userComponents/myPost";
import { Post, useFetchUser } from "@/hooks/useFetchUser";
import { useParams, useRouter } from "next/navigation";
import { Description } from "@mui/icons-material";
import CreatePost from "@/components/userComponents/CreatePost";

export default function page() {
  const { id } = useParams();
  const { data:user , isLoading,isError} = useFetchUser(id as string);
  const [open,setOpen] = useState<boolean>(false)
  const [postDataByID,setPostDataByID] = useState<Post|undefined>(undefined)
  const router = useRouter();
  const defaultUser = {
    name: "Akhil Jose",
    email: "akhil.cse21@jecc.ac.in",
  };

  const userData = {
    name: user?.username ?? defaultUser.name,
    email: user?.email ?? defaultUser.name,
  };

  if(isError){
    router.push("/not-found")
  }
  // const postsData = Array.isArray(posts.data)?posts.data:[]

  if (isLoading) {
    return (
      <Box flex={7.38} position="sticky" mb={100} p={6} sx={{height:"87vh"}}>
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
    );
  }

  return (
    <Box flex={7.38} position="sticky" mb={100} p={6} sx={{height:"87vh"}}>
      {user?.posts.length === 0 ? (
        <Typography color="textSecondary">No Posts Found</Typography>
      ) : (
        <>
        <Grid container spacing={4}>
          {user?.posts.map((post) => {
            return (
              <Grid key={post.ID} size={{ xs: 12, lg: 6 }}>
                <MyPost userData={userData} PostData={post} modal={{open,setOpen}} onClick={()=>setPostDataByID(post)}/>
              </Grid>
            );
          })}
        </Grid>
        <CreatePost open={open} setOpen={setOpen} status={"update"} data={postDataByID}/>
        </>
      )}
    </Box>
  );
}
