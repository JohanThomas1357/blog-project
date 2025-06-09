import axios from "axios";
const axiosInstance = axios.create({
    baseURL:process.env.NEXT_PUBLIC_BACKEND_API,
    headers:{
        "Content-Type":"application/json",
    },
})



export async function getToken(){
    const token = document.cookie
    .split("; ")
    .find((row) => row.startsWith("token="))
    ?.split("=")[1];
    return token
}
axiosInstance.interceptors.request.use(
    async(config)=>{
        const token = await getToken();

        if(token){
            config.headers.Authorization = `${token}`
        }
        return config
    },
    (error)=>{
        return Promise.reject(error)
    }
)

axiosInstance.interceptors.response.use(
    (response)=> response,
    (error)=>{
        if(error.response){
            if(error.response.status === 401 ){
                console.log("Unauthorized! Redirecting to login...")
                return error
            }
        }
        console.log("API Error:",error);
        return Promise.reject(error);
    }
)

export default axiosInstance