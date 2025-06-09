"use server"

import axios from "axios"

interface PostProps{
    params :{
        id: string;
    }

}

//Params is found inside props

export async function GET(_request:Request,{params}:PostProps){
    
    const {id} = await params
    try{
        const res = await axios.get(`https://67bef2f3b2320ee050120d2a.mockapi.io/posts`)

        const  filteredPosts = res.data.filter((post:any)=>post.userID === id)

        if(filteredPosts.length==0){
            return new Response(JSON.stringify({error:"No posts found for the user"}))
        }

        return new Response(JSON.stringify(filteredPosts))
    }
    catch(error){
        return new Response(JSON.stringify({error:"Error fetching user posts"}))
    }

}