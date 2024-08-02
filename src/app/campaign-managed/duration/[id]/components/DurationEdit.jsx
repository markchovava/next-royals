"use client"
import axiosClientAPI from '@/api/axiosClientAPI';
import { baseURL } from '@/api/baseURL';
import Loader from '@/app/components/Loader';
import { tokenAuth } from '@/token/tokenAuth';
import { darkBounce } from '@/utils/toastify';
import axios from 'axios';
import Link from 'next/link'
import { redirect, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { BsArrowRight } from 'react-icons/bs';
import { toast } from 'react-toastify';




export default function DurationEdit({ id }) {
    const router = useRouter();
    const [data, setData] = useState();
    const [errMsg, setErrMsg] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);
    const { getAuthToken } = tokenAuth();
    const config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${getAuthToken()}`
        }
    };

    if(!getAuthToken()){
        redirect('/login')
    }
    const handleInput = (e) => {
        setData({...data, [e.target.name]: e.target.value })
    }

    async function getData() {
        try{
          const result = await axios.get(`${baseURL}campaign-managed/${id}`)
            .then((response) => {
                setData(response.data.data)
            })
          } catch (error) {
            console.error(`Error: ${error}`)
          }   
    }

     /* POST DATA */
     async function postData() {
        if(!data.start_date){
            const message = 'Start Date is required.';
            setErrMsg({start_date: message});
            toast.warn(message, darkBounce);
            setIsSubmit(false);
            return;
        }
        if(!data.num_of_days){
            const message = 'Number of days are required.';
            setErrMsg({num_of_days: message});
            toast.warn(message, darkBounce);
            setIsSubmit(false);
            return;
        }
        const formData = {
            start_date: data?.start_date,
            num_of_days: data?.num_of_days,
        };
        try{
          const result = await axiosClientAPI.post(`campaign-managed-duration/${id}`, formData, config)
            .then((response) => {
                if(response.data?.status == 1){
                    toast.success(response.data?.message, darkBounce)
                    router.push(`/campaign-managed/${id}`)
                    setIsSubmit(false);
                }
            })
          } catch (error) {
            console.error(`Error: ${error}`)
            setIsSubmit(false);
        } 
    }  

    useEffect(() => {
        getData();
    }, [])

    useEffect(() => {
        isSubmit === true && postData();
    }, [isSubmit]);


    if(!data) { return (<Loader />) }

  return (
    <>
        {/* Title */}
        <div className="w-[100%] flex items-center justify-center flex-col">
            <h1 className="leading-none pt-[1.5rem] pb-[1.5rem] text-center font-black text-[4rem]">
                Edit Campaign</h1>
            <hr className="border-t-4 border-black w-[10%] pb-[3.5rem]" />
        </div>

        <div className='mx-auto w-[90%] flex items-center justify-end'>
            <Link
                href={`/campaign-managed/${id}`}
                className='flex items-center justify-center gap-1 rounded-xl py-[0.8rem] px-[2rem] bg-gradient-to-br from-[#6c0868] to-green-600 text-white border hover:bg-gradient-to-br  hover:from-green-600 hover:to-[#6c0868]'>
                View Managed Campaign</Link>
        </div>

        {/*  */}
        <section className='mx-auto w-[90%] lg:overflow-hidden overflow-auto pt-[2rem] pb-[3rem] px-[1.5rem]  mb-[4rem] bg-white drop-shadow-lg'>
                <div className="w-[100%] mb-[2rem] text-5xl font-light flex items-center justify-start">
                    Managed Campaign Duration
                </div>

                <div className="w-[100%] mb-[2rem] grid lg:grid-cols-2 grid-cols-1">
                    <div className=''>
                        <p className='mb-1'>Start Date:</p>
                        <input type='date'
                            name='start_date'
                            value={data.start_date}
                            onChange={handleInput} 
                            placeholder='Enter the Start Date...' 
                            className='w-[100%] outline-none border border-slate-200 px-4 py-3' />
                        {errMsg.start_date &&
                            <span className='text-sm text-red-600'>{errMsg.start_date}</span>
                        }
                    </div>
                    <div className=''>
                        <p className='mb-1'>Duration:</p>
                        <input type='number' 
                            name='num_of_days'
                            value={data.num_of_days}
                            onChange={handleInput} 
                            placeholder='Enter the Number of Days here...' 
                            className='w-[100%] mb-1 outline-none border border-slate-200 px-4 py-3' />
                        {errMsg.num_of_days &&
                            <span className='text-sm text-red-600'>{errMsg.num_of_days}</span>
                        }
                    </div>
                   
                </div>
                
            
                


                <div className="w-[100%] flex items-center justify-center gap-4">
                <button 
                    onClick={ () => {
                        setIsSubmit(true) 
                    }}
                    className='lg:w-[20%] group transition ease-in-out duration-200  flex items-center justify-center gap-1 rounded-xl py-[1rem] px-[2.5rem] text-white border bg__primary'>
                    { isSubmit === true ? 'Processing' : 
                        <>
                        Submit <BsArrowRight className='transition ease-in-out duration-200 group-hover:translate-x-1' />
                        </>
                    }
                
                </button>
            </div>
            
        
            </section>
    </>
  )
}
