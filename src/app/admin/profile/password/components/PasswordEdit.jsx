"use client"

import axiosClientAPI from '@/api/axiosClientAPI';
import { tokenAuth } from '@/token/tokenAuth';
import { darkBounce } from '@/utils/toastify';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { BsArrowRight } from "react-icons/bs";
import { Bounce, toast } from 'react-toastify';




export default function PasswordEdit() {
  const { getAuthToken } = tokenAuth();
  const router = useRouter();
  const [data, setData] = useState({});
  const [errMsg, setErrMsg] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getAuthToken()}`
  }};

  const handleInput = (e) => {
      setData({...data, [e.target.name]: e.target.value})
  }

  
  /* SAVE DATA */
  async function postData() {
    if(!data.password){
        setIsSubmit(false);
        const message = 'Password is required.';
        setErrMsg({password: message})
        toast.warn(message, darkBounce);
        return;
    }
    if(!data.password_confirmation){
        setIsSubmit(false);
        const message = 'Password Confirmation is required.';
        setErrMsg({password_confirmation: message})
        toast.warn(message, darkBounce);
        return;
    }

    if(data.password !== data.password_confirmation){
        setIsSubmit(false);
        const message = 'Password do not match.';
        setErrMsg({password_confirmation: message})
        toast.warn(message, darkBounce);
        return;
    }

    const formData = {
        password: data.password
    }

    try{
      const result = await axiosClientAPI.post(`profile/password/`, formData, config)
        .then((response) => {
            if(response.data.status == 0){
                const message = response.data.message;
                setErrMsg({...errMsg, password_confirmation: message});
                toast.warn(message, darkBounce);
                setIsSubmit(false);
                return;
            }
            if(response.data.status == 1){
                const message = response.data.message;
                setErrMsg({});
                toast.success(message, darkBounce);
                setIsSubmit(false);
                router.push(`/admin/profile/view`)
                return;
            }
        })
      } catch (error) {
        console.error(`Error: ${error}`)
        setIsSubmit(false);
    } 
  } 



  useEffect(() => { 
    isSubmit && postData();
  }, [isSubmit]);




  return (
    <section className='w-[100%] h-auto bg-gray-50'>
        <div className="mx-auto w-[75%] py-[4rem]">
            {/* Title */}
            <div className="w-[100%] flex items-center justify-center flex-col">
                <h1 className="leading-none pb-[1.5rem] text-center font-extrabold text-[4rem]">
                    Edit Password.</h1>
                <hr className="border-t-4 border-black w-[20%] pb-[2.5rem]" />
            </div>

          
            {/* ROW */}
            <div className="w-[100%] mb-[2rem]">
                <input 
                  type="password" 
                  name='password'
                  onChange={handleInput}
                  placeholder="Write your New Password here..." 
                  className="w-[100%] rounded-xl px-[1rem] py-[1rem] outline-none border border-slate-300" />
                {errMsg.password && 
                    <div className='text-red-600'>{errMsg.password}</div>
                }
            </div>
            {/* ROW */}
            <div className="w-[100%] mb-[2rem]">
                <input 
                  type="password" 
                  name='password_confirmation'
                  onChange={handleInput}
                  placeholder="Write Password Confirmation here..." 
                  className="w-[100%] rounded-xl px-[1rem] py-[1rem] outline-none border border-slate-300" />
                {errMsg.password_confirmation && 
                    <div className='text-red-600'>{errMsg.password_confirmation}</div>
                }  
            </div>  

            <div className="w-[100%] mb-[2rem] flex items-center justify-center gap-4">
                <button
                  onClick={() => setIsSubmit(true)}
                  className='px-[3rem] py-[1.3rem] group transition ease-in-out duration-200  flex items-center justify-center gap-1 rounded-xl bg-[#6c0868] text-white border hover:bg-gradient-to-br hover:from-[#6c0868] hover:to-purple-900'>
                  {isSubmit == true ? 
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
