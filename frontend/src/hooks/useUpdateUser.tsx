import { useMutation } from "@tanstack/react-query"
import api from "@/utils/axiosInstance"

export type userProfile = {
    modifiedData:{
        username: string,
        email: string,
        bio: string,
    },
    id:string
}

interface postProps{
    id:string,
    modifiedData:{
        title: string,
        description:string
    }
}

export const updatePost = async (values:postProps) => {
    const res = await api.put(`${process.env.NEXT_PUBLIC_BACKEND_API}/posts/${values.id}`,values.modifiedData)
    return res
}

export const updateUser = async (values:userProfile) =>{
    const res = await api.put(`${process.env.NEXT_PUBLIC_BACKEND_API}/user/${values.id}`,values.modifiedData)
    return res
}

export  function useUpdateUser(){
    return useMutation({
        mutationFn:(value:userProfile)=>updateUser(value),
    })
}

export function useUpdatePost(){
    return useMutation({
        mutationFn:(values:postProps)=>updatePost(values)
    })
}