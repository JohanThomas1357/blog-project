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
} from "@mui/material";
import {
  Delete,
  Favorite,
  FavoriteBorder,
  FavoriteOutlined,
  Share,
} from "@mui/icons-material";
import React from "react";
import { PostInfoProps } from "@/hooks/useFetchPosts";

type postProps = {
  ID: number;
  CreatedAt: string;  // ISO date string
  UpdatedAt: string;
  DeletedAt?: string | null;
  title: string;
  description: string;
  user_id: number;  // Assuming userID is a number
  user: {
      ID: number;
      CreatedAt: string;
      UpdatedAt: string;
      DeletedAt?: string | null;
      username: string;
      email: string;
      password: string;  // Hashed password
      phoneNumber?: string;
      bio?: string;
  };
}

export default function post({data}:{data:postProps}) {
  const formatter = new Intl.DateTimeFormat('en-US',{dateStyle: 'full'})
  return (
    <>
      <Card>
        <CardHeader
          avatar={<Avatar sx={{ bgcolor: "orange" }}>{data?.user.username[0]}</Avatar>}
          title={data?.user.username}
          subheader={formatter.format(new Date(data?.CreatedAt))}
        />
        <Divider />
        {/* <CardMedia
          component="img"
          sx={{ maxHeight: "450px"}}
          image="https://images.pexels.com/photos/30768178/pexels-photo-30768178/free-photo-of-artist-at-desk-creating-floral-watercolor-art.jpeg?auto=compress&cs=tinysrgb&w=400"
          alt="Creative Content"
        /> */}
        <CardContent>
          <Typography variant="body1" sx={{ color: "text.secondary" }}>
            {data?.description}
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
