"use client"
import { useQuery } from "@tanstack/react-query"
import { fetchUsersData } from "./useFetchPosts"

export function useFetchUsers(){
    const {data:userData,isLoading:userLoading,isError} = useQuery({
        queryKey:["users"],
        queryFn:fetchUsersData,
    })

    return {userData,userLoading,isError}
}