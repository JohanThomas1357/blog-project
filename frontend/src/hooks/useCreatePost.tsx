import { useMutation } from "@tanstack/react-query"
import api from "@/utils/axiosInstance"

 
 interface CreatePostProps{
    title:string,
    description: string,
 }

 async function createPost(value:CreatePostProps):Promise<CreatePostProps>{
   console.log("POST",value)
    const res = await api.post(`${process.env.NEXT_PUBLIC_BACKEND_API}/posts/`,value)
    return res.data
 }

 export function useCreatePost(){

    return useMutation({
        mutationFn: (values:CreatePostProps)=>createPost(values)
    })
 }