"use client"


export const tokenAuthName = 'ROYALS_AUTH_TOKEN';

export const tokenAuth = () => {

    const setAuthToken = (token) => {
        if(typeof window !== 'undefined'){
            localStorage.setItem(tokenAuthName, token);
        }
    }
    const getAuthToken = () => {
        if(typeof window !== 'undefined'){
            const token =  localStorage.getItem(tokenAuthName);
            return token;
        }
    }
    const removeAuthToken = () => {
        if(typeof window !== 'undefined'){
            localStorage.removeItem(tokenAuthName);
        }
    }

    return {
        setAuthToken, 
        getAuthToken,
        removeAuthToken
    }

  }