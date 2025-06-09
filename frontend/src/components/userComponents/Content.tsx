import { Backdrop, Box, CircularProgress, Stack } from "@mui/material";
import React from "react";
import Post from "@/components/userComponents/post";
import { PostInfoProps } from "@/hooks/useFetchPosts";

export default function Content({ PostInfo }: { PostInfo: PostInfoProps | undefined }) {
  const PostInfoModified = PostInfo?.posts?.sort(
    (a, b) => new Date(b.CreatedAt).getTime() - new Date(a.CreatedAt).getTime()
  ) || [];
  console.log(PostInfoModified);
  return (
    <Box flex={5} padding={{ xs: 0, sm: 3 }} sx={{ paddingTop: "30px",height:"100%"}}>
      <Stack spacing={8}>
        {PostInfoModified.map((post) => {
          return (
              <Post key={post?.ID} data={post} />
          );
        })}
      </Stack>
    </Box>
  );
}
