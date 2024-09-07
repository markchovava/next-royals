import { getCookie } from "cookies-next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";




export const checkRoleCookie = () => {
    const authCookie = getCookie('ROYALS_ROLE_COOKIE', { cookies }); 
    if(authCookie){
        return;
    }else{
        redirect('/')
    }
} 

export const getRoleCookie = () => {
    const authCookie = getCookie('ROYALS_ROLE_COOKIE', { cookies });
    return authCookie;
} 



