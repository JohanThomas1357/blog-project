import { useParams, usePathname, useRouter } from "next/navigation"

export function useCustomRouter(){
    const router = useRouter()
    return router
}

export function useCustomPathname(){
    const pathname = usePathname()
    return pathname
}

export function useCustomParams(){
    const {id} = useParams();
    return id
}