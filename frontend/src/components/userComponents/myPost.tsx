"use client";
import {
  Avatar,
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Divider,
  IconButton,
  Checkbox,
  Typography,
  Paper,
  MenuList,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Menu,
} from "@mui/material";
import {
  Delete,
  Edit,
  Favorite,
  FavoriteBorder,
  FavoriteOutlined,
  MoreVert,
  Share,
} from "@mui/icons-material";
import React, { useState } from "react";
import { useDeletePost } from "@/hooks/useDelete";
import { useChangeState } from "@/context/stateContext";
import { useQueryClient } from "@tanstack/react-query";
import { TextField } from "formik-mui";

export interface Post {
  ID: number;
  CreatedAt: string;
  UpdatedAt: string;
  DeletedAt: string | null;
  title: string;
  description: string;
  user_id: number;
  user: UserProp;
  image?: string | undefined;
}
export interface UserProp {
  ID: number;
  CreatedAt: string;
  UpdatedAt: string;
  DeletedAt: string | null;
  username: string;
  email: string;
  password: string;
  phone_number: string;
  bio: string;
  posts: Post[];
}

interface User {
  name: string;
  email: string;
}

interface ModalProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

interface onClickProp {
  (): void;
}

interface MyPostProp {
  userData: User;
  PostData: Post;
  modal: ModalProps;
  onClick: onClickProp;
}

export default function post({
  userData,
  PostData,
  modal,
  onClick,
}: MyPostProp) {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const { state, setState } = useChangeState();
  const handleOpenMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const { mutate } = useDeletePost();
  const queryClient = useQueryClient();
  return (
    <>
      <Menu
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={() => {
          setAnchorEl(null);
          modal.setOpen(false);
        }}
      >
        <MenuList>
          <MenuItem
            onClick={() => {
              setAnchorEl(null);
              onClick();
              modal.setOpen(true);
            }}
          >
            <ListItemIcon>
              <Edit />
            </ListItemIcon>
            <ListItemText>Edit Post</ListItemText>
          </MenuItem>
          <MenuItem
            onClick={() => {
              mutate(String(PostData.ID), {
                onSuccess: () => {
                  console.log("Successful");
                  setState((prev) => !prev);
                  queryClient.refetchQueries();
                  localStorage.setItem("Message", "Deleted Successfully");
                },
                onError: () => {
                  console.log("I am here");
                  setState((prev) => !prev);
                  localStorage.setItem("Message", "Unable to delete post");
                  localStorage.setItem("status", "true");
                },
              });
              setAnchorEl(null);
            }}
          >
            <ListItemIcon>
              <Delete />
            </ListItemIcon>
            <ListItemText>Delete Post</ListItemText>
          </MenuItem>
        </MenuList>
      </Menu>
      <Card
        sx={{
          minHeight: "max-content",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: "orange" }}>{userData.name[0]}</Avatar>
          }
          title={userData.name}
          subheader={userData.email}
          action={
            <IconButton onClick={handleOpenMenu}>
              <MoreVert />
            </IconButton>
          }
        />
        <Divider />
        <CardMedia
          component="img"
          sx={{ maxHeight: "450px", display: PostData.image ? "flex" : "none" }}
          image={PostData.image}
          alt="Creative Content"
        />
        <CardContent>
          <Typography variant="body1" sx={{ color: "text.secondary" }}>
            {PostData.description}
          </Typography>
        </CardContent>
        <CardActions>
          <IconButton>
            <Checkbox
              icon={<FavoriteBorder />}
              checkedIcon={<Favorite sx={{ color: "red" }} />}
            />
          </IconButton>
          <IconButton>
            <Share />
          </IconButton>
        </CardActions>
      </Card>
    </>
  );
}
