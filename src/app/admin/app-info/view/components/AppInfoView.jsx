"use client"
import axiosClientAPI from '@/api/axiosClientAPI';
import Loader from '@/app/components/Loader';
import { tokenAuth } from '@/token/tokenAuth';
import { tokenRole } from '@/token/tokenRole';
import Link from 'next/link'
import React, { useEffect, useState } from 'react'



export default function AppInfoView() {
    const [data, setData] = useState();
    const { getAuthToken } = tokenAuth();
    const { getRoleToken } = tokenRole();
    const config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${getAuthToken()}`
        }
    };

    async function getData() {
        try{
          const result = await axiosClientAPI.get(`app-info`, config)
            .then((response) => {
                setData(response.data.data);
            })
          } catch (error) {
            console.error(`Error: ${error}`)
          }   
    } 

    useEffect(() => { 
        getData();
    }, []);


    if(!data){ return ( <Loader /> ) }
    

  return (
 
    <>
        {/* Title */}
        <div className="w-[100%] flex items-center justify-center flex-col">
            <h1 className="leading-none pt-[1.5rem] pb-[1.5rem] text-center font-black text-[4rem]">
                View App Info</h1>
            <hr className="border-t-4 border-black w-[10%] pb-[3.5rem]" />
        </div> 
        {/* Link */}
        { getRoleToken() !== 0 && getRoleToken() <= 2 &&
            <div className='mx-auto w-[90%] flex justify-end items-center pb-[2rem]'>
                <Link
                    href={`/admin/app-info`}
                    className='transition-all duration-150 ease-in rounded-lg  px-8 py-3 border text-white bg-gradient-to-br from-[#6c0868] to-[#50014c] hover:bg-gradient-to-br hover:from-[#50014c] hover:to-[#6c0868]'>
                    Edit</Link>
            </div>
        }
        {/*  */}
        <section className='mx-auto w-[90%] pb-[4rem]'>
            <div className="w-[100%] mb-[2rem] flex items-center justify-start">
                <label className='w-[20%] gap-3 font-semibold'>Name:</label>
                <div className='w-[80%]'>
                    {data.name} </div>
            </div>
            <div className="w-[100%] mb-[2rem] flex items-center justify-start">
                <label className='w-[20%] gap-3 font-semibold'>Email:</label>
                <div className='w-[80%]'>
                    {data.email} </div>
            </div>
            <div className="w-[100%] mb-[2rem] flex items-center justify-start">
                <label className='w-[20%] gap-3 font-semibold'>Phone:</label>
                <div className='w-[80%]'>
                    {data.phone} </div>
            </div>
            <div className="w-[100%] mb-[2rem] flex items-center justify-start">
                <label className='w-[20%] gap-3 font-semibold'>Address:</label>
                <div className='w-[80%]'>
                    {data.address} </div>
            </div>
            <div className="w-[100%] mb-[2rem] flex items-center justify-start">
                <label className='w-[20%] gap-3 font-semibold'>Website:</label>
                <div className='w-[80%]'>
                    {data.website} </div>
            </div>
            <div className="w-[100%] mb-[2rem] flex items-center justify-start">
                <label className='w-[20%] gap-3 font-semibold'>WhatsApp:</label>
                <div className='w-[80%]'>
                    {data.whatsapp} </div>
            </div>
            <div className="w-[100%] mb-[2rem] flex items-center justify-start">
                <label className='w-[20%] gap-3 font-semibold'>Facebook:</label>
                <div className='w-[80%]'>
                    {data.facebook} </div>
            </div>
            <div className="w-[100%] mb-[2rem] flex items-center justify-start">
                <label className='w-[20%] gap-3 font-semibold'>Description:</label>
                <div className='w-[80%]'>
                    {data.description} </div>
            </div>
            
        </section>
    </>
 
  )
}
