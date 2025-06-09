import { useMutation } from "@tanstack/react-query"
import { AxiosResponse } from "axios"
import api from "@/utils/axiosInstance"
interface UserRegistrationProps{
    username: string
    password: string
    phone_number:string
    email: string
    bio?: string

}

const CreateUser = async(values:UserRegistrationProps):Promise<AxiosResponse<UserRegistrationProps>> =>{
    const res = await api.post(`${process.env.NEXT_PUBLIC_BACKEND_API}/user/register`,values)
    return res
}

export function useCreateUser(){
    return useMutation({
        mutationFn:(values:UserRegistrationProps)=>CreateUser(values)
    })
}