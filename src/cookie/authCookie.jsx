import { getCookie } from "cookies-next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";




export const checkAuthCookie = () => {
    const authCookie = getCookie('ROYALS_AUTH_COOKIE', { cookies });
    
    if(authCookie){
        return;
    }else{
        redirect('/login')
    }
} 


export const getAuthCookie = () => {
    const authCookie = getCookie('ROYALS_AUTH_COOKIE', { cookies });
    return authCookie;
} 



