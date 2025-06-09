"use client"
import { useQuery } from '@tanstack/react-query';
import axios, { AxiosResponse } from 'axios';
import api from '@/utils/axiosInstance';
import React from 'react'

export type User = {
    ID: number,
    CreatedAt: string,
    UpdatedAt: string,
    DeletedAt: string|null,
    username: string,
    email: string,
    password: string,
    phone_number: string,
    bio: string
}

type DataItem = {
    createdAt: string;  // ISO date string
    Description: string;
    userID: string;  // Assuming userID is stored as a string
    id: string;  // Assuming id is also stored as a string
  };

export type PostInfoProps = {
    message?: string | null;
    posts: {
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
    }[];
};

 export const fetchAllPosts = async ():Promise<PostInfoProps>=>{
    const res:AxiosResponse<PostInfoProps> = await api.get(`${process.env.NEXT_PUBLIC_BACKEND_API}/posts/`)
    console.log("Fetching all posts")
    return res.data
}

export const fetchUsersData = async (): Promise<User[]>=>{
    const res: AxiosResponse<User[]> = await api.get(`${process.env.NEXT_PUBLIC_BACKEND_API}/user/`);
    console.log("Fetching all users")
    return res.data
};


export const useFetchPosts = () => {
    // const {data:userData,isLoading:userLoading,isError:userError} = useQuery({
    //     queryKey:["users"],
    //     queryFn:fetchUsersData,
    //     refetchOnMount:false
    // })

    const {data:postData,isLoading:postLoading,isError:postError} = useQuery({
        queryKey:["posts"],
        queryFn:fetchAllPosts,
        refetchOnMount:false
    })

    // const PostInfo:PostInfoProps[] = 
    // postData && userData ?
    // postData?.map((post)=>{
    //     const user = userData?.find((user)=>user.id===post.userID) || { name: "Unknown", email: "N/A"};
    //     return{
    //         ...post,
    //         username: user.name,
    //         email: user.email 
    //     }
    // }) : [];

    // const postInfoLoading = userLoading && postLoading;
    // const postInfoError = userError && postError;

    return  {postData,postError,postLoading}
}
