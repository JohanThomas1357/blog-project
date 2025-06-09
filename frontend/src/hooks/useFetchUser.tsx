"use client"
import { useQueries, useQuery } from '@tanstack/react-query';
import axios, { AxiosError, AxiosResponse } from 'axios'
import api from '@/utils/axiosInstance';
import React from 'react'

export interface User {
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

export interface Post {
  ID: number;
  CreatedAt: string;
  UpdatedAt: string;
  DeletedAt: string | null;
  title: string;
  description: string;
  user_id: number;
  user: User;
}

const fetchUserData = async (id:string): Promise<User>=>{
  const res: AxiosResponse<User> = await api.get(`${process.env.NEXT_PUBLIC_BACKEND_API}/user/${id}`);
  console.log("Fetching user data")
  return res.data
};

// const fetchUserPosts = async(id:string): Promise<Posts[]>=>{
//   const res: AxiosResponse<Posts[]> = await axios.get( `/api/user/${id}/posts`)
//   console.log("Fetching user posts")
//   return res.data
// }

export const useFetchUser = (id:string) => {

  return useQuery({
    queryFn:()=>fetchUserData(id as string),
    queryKey:["user",id]
  })

  // const results = useQueries({
  //   queries:[
  //     {
  //       queryKey:["user",id as string],
  //       queryFn: ()=>fetchUserData(id as string),
  //       enabled: !!id,
  //       refetchOnMount:false
  //     },
  //     {
  //       queryKey:["posts",id as string],
  //       queryFn: ()=>fetchUserPosts(id as string),
  //       enabled:!!id,
  //       refetchOnMount:false
  //     }
  //   ]
  // })

  // const [userQuery,postsQuery] = results;

  // return {
  //   user:userQuery,
  //   userLoading: userQuery.isLoading,
  //   isError: userQuery.isError || postsQuery.isError,
  //   posts:postsQuery,
  //   postLoading: postsQuery.isLoading
  // }

  // return useQuery<User,AxiosError>({
  //   queryKey: ["user",id as string],
  //   queryFn: ()=>fetchUserData(id as string),
  //   enabled: !!id,
  // })
}
