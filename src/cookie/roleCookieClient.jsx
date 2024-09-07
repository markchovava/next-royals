"use client";
import {setCookie, deleteCookie } from 'cookies-next';


const cookieDuration = 60 * 60 * 24 * 30 * 30;

export function setRoleCookie(token) {
    setCookie('ROYALS_ROLE_COOKIE', token, { maxAge: cookieDuration });
}


export function removeRoleCookie() {
    deleteCookie('ROYALS_ROLE_COOKIE');
}