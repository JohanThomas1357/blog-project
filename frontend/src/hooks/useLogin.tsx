import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import React from 'react'

type LoginProps = {
    email: string,
    password: string
}

const loginUser = async (values:LoginProps) =>{
    console.log("Hello")
    console.log(`${process.env.NEXT_PUBLIC_BACKEND_API}/user/login`)
    const res = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_API}/user/login`,values)
    console.log("Response:",res)
    return res
}

export default function useLogin() {
    return useMutation({
        mutationFn: (values:LoginProps)=>loginUser(values)
    })

}
