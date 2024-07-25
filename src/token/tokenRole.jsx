"use client"


export const tokenRoleName = 'ROYALS_ROLE_TOKEN';

export const tokenRole = () => {
    const setRoleToken = (token) => {
        if(typeof window !== 'undefined'){
            localStorage.setItem(tokenRoleName, token);
        }
    }
    const getRoleToken = () => {
        if(typeof window !== 'undefined'){
            const token =  localStorage.getItem(tokenRoleName);
            return token;
        }
    }
    const removeRoleToken = () => {
        if(typeof window !== 'undefined'){
            localStorage.removeItem(tokenRoleName);
        }
    }

    return {
        setRoleToken, 
        getRoleToken,
        removeRoleToken
    }

  }