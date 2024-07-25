"use client"
import { baseURL } from "@/api/baseURL";
import { tokenAuth } from "@/token/tokenAuth";
import { tokenRole } from "@/token/tokenRole";
import { darkBounce } from "@/utils/toastify";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { BsArrowRight } from "react-icons/bs";
/* Toast */
import { Bounce, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';




export default function Login() {
    const router = useRouter();
    const [data, setData] = useState({});
    const [errorMsg, setErrorMsg] = useState('');
    const [isSubmit, setIsSubmit] = useState(false);
    const { setAuthToken } = tokenAuth()
    const { setRoleToken } = tokenRole();
    const handleInput = (e) => {
      setData({...data, [e.target.name]: e.target.value})
    }

    async function postData() {
      if(!data.email){
        const message = 'Email is required.';
        setErrorMsg({email: message});
        toast.warn(message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Bounce,
          });
        setIsSubmit(false)
        return;
      }
      if(!data.password){
        const message = 'Password is required.';
        setErrorMsg({password: message});
        toast.warn(message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Bounce,
          });
        setIsSubmit(false)
        return;
      }
      if(data){
        try{ 
            const result = await axios.post(`${baseURL}login`, data)
            .then((response) => {
              if(response.data.status == 1){
                setIsSubmit(false);
                setAuthToken(response.data.auth_token);
                setRoleToken(response.data.role_level);
                router.push('/campaign')
                toast.success(response.data.message, darkBounce);
                
              } else if(response.data.status == 0) {
                setIsSubmit(false);
                const message = response.data.message
                setErrorMsg({email: message});
                toast.warn(message, darkBounce);
              } else if(response.data.status == 2){
                setIsSubmit(false);
                const message = response.data.message;
                setErrorMsg({password: message});
                toast.warn(message, darkBounce);
              }
            })
          } catch (error) {
            console.error(`Error: ${error}`)
          } 
      } 
    }  

 
    useEffect(() => { 
      isSubmit == true && postData();
    }, [isSubmit]);

  return (
    <section className='w-[100%] h-auto bg-white'>
      <div className="mx-auto lg:w-[60%] w-[80%] py-[4rem]">
        {/* Title */}
        <div className="w-[100%] flex items-center justify-center flex-col">
            <h1 className="leading-none pb-[1.5rem] text-center font-extrabold text-[4rem]">
                Login.</h1>
            <hr className="border-t-4 border-black w-[20%] pb-[1.5rem]" />
            <h6 className='pb-[2rem] flex gap-1'>
              Register 
              <Link className='underline hover:text-purple-900' href='/register'>here.</Link>
            </h6>
        </div>
        <div className="w-[100%] mb-[2rem]">
          <input 
            type="email" 
            name="email" 
            onChange={handleInput}
            placeholder="Write your Email..." 
            className="w-[100%] rounded-xl px-[1rem] py-[1rem] outline-none border border-purple-300" />
          {errorMsg.email &&
            <p className="text-red-500">{errorMsg.email}</p>
          }
        </div>
        <div className="w-[100%] mb-[2rem]">
            <input 
                type="password" 
                name="password" 
                onChange={handleInput}
                placeholder="Enter Password here..." 
                className="w-[100%] rounded-xl px-[1rem] py-[1rem] outline-none border border-purple-300" />
            {errorMsg.password &&
              <p className="text-red-500">{errorMsg.password}</p>
            }
        </div>
        {/*  */}
        <div className="w-[100%] mb-[2rem] flex items-center justify-center gap-4">
            <button 
              onClick={() => {
                setIsSubmit(true);
              }}
              className='lg:w-[20%] group transition ease-in-out duration-200  flex items-center justify-center gap-1 rounded-xl py-[1.2rem] px-[2rem] bg-[#6c0868] text-white border hover:bg-gradient-to-br  hover:from-[#6c0868] hover:to-purple-900'>
                { isSubmit == true ? 
                'Processing' : 
                <> 
                  Submit <BsArrowRight className='transition ease-in-out duration-200 group-hover:translate-x-1' />
                </> 
                } 
            </button>
        </div>
              
      </div>
    </section>
  )
}
