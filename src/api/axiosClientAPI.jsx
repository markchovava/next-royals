"use client"
import axios from "axios";
import { baseURL } from "./baseURL";


const axiosClientAPI = axios.create({
    baseURL: `${baseURL}api/`,
    headers: {
      'X-Request-With': 'XMLHttpRequest',
    },
    withCredentials: true,
    withXSRFToken: true,
  })

  export default axiosClientAPI;