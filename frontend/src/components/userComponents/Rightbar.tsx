import { timeAgo } from "@/app/utils/TimeAgo";
import { PostInfoProps, User } from "@/hooks/useFetchPosts";
import {
  Avatar,
  AvatarGroup,
  Box,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import React from "react";


export default function Rightbar({
  userData,
  PostData,
}: {
  userData: User[] | undefined;
  PostData: PostInfoProps | undefined;
}) {

  const PostInfoModified = PostData?.posts?.sort(
    (a, b) => new Date(b.CreatedAt).getTime() - new Date(a.CreatedAt).getTime()
  ) || [];

  return (
    <Box flex={2} p={1} pr={0} sx={{ display: { xs: "none", lg: "block" } }}>
      <Box position="sticky" sx={{ top: "100px" }}>
        <Typography variant="h6" color="textSecondary">
          My Connections
        </Typography>
        <AvatarGroup max={6} sx={{ marginTop: "15px", paddingRight: "180px",justifyContent:"flex-end"}}>
          {userData?.map((user) => {
            return (
              <Avatar alt={user.username} key={user.ID} src="">
                {user.username[0]}
              </Avatar>
            );
          })}
        </AvatarGroup>

        <Divider sx={{ margin: "15px 0px", marginRight: "30px" }} />

        <Typography variant="h6" color="textSecondary">
          Recent Posts
        </Typography>

        <List sx={{ marginTop: "10px", marginRight: "30px" }}>
          {PostInfoModified.slice(0,5).map((post) => {
            return (
              <Box key={post.ID}>
                <ListItem disablePadding >
                  <ListItemAvatar>
                    <Avatar>{post?.user?.username[0]}</Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={post?.user?.username}
                    secondary={
                      <React.Fragment>
                        <Typography
                          component="span"
                          variant="body2"
                          sx={{ color: "text.primary", display: "inline" }}
                        ></Typography>
                        {post.description.split(" ").slice(0, 3).join(" ") +
                          "..."}
                      </React.Fragment>
                    }
                  />{" "}
                  <Typography variant="body2" color="textSecondary"  mt={4} p={0} ml={4} sx={{fontSize:"11px"}}>
                    {timeAgo.format(new Date(post.CreatedAt))}
                  </Typography>
                </ListItem>
                <Divider />
              </Box>
            );
          })}
        </List>
      </Box>
    </Box>
  );
}
