import {jwtDecode} from "jwt-decode"

interface TokenProps{
    user_id?: string | number
    exp?: string | number
}

export function DecodeToken(){
    const token = document.cookie.split(";").find((row)=>row.startsWith("token="))?.split("=")[1];

    if(!token)
    {
        return null
    }

    const decode = jwtDecode<TokenProps>(token as string);

    return decode.user_id
}