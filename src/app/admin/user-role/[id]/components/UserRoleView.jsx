"use client";
import axiosClientAPI from '@/api/axiosClientAPI';
import Loader from '@/app/components/Loader';
import { tokenAuth } from '@/token/tokenAuth';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'




export default function UserRoleView({ id }) {
  const [data, setData] = useState();
  const { getAuthToken } = tokenAuth();
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getAuthToken()}`
    }
  };


  async function getData() {
    try{
      const result = await axiosClientAPI.get(`user/${id}`, config)
        .then((response) => {
          setData(response.data.data);
        })
      } catch (error) {
        console.error(`Error: ${error}`)
      }   
  } 

  useEffect(() => {
    getData()
  }, []);


  if(!data) { return (<Loader />)}


  return (
     <>
        {/* Title */}
        <div className="w-[100%] flex items-center justify-center flex-col">
            <h1 className="leading-none pt-[1.5rem] pb-[1.5rem] text-center font-black text-[4rem]">
                View User Role</h1>
            <hr className="border-t-4 border-blue-900 w-[10%] pb-[3.5rem]" />
        </div> 
        {/* ROW */}
        <div className='mx-auto w-[90%] flex justify-end items-center pb-[2rem] '>
            <Link
                href={`/admin/user-role/edit/${id}`}
                className='transition-all duration-150 ease-in rounded-lg px-8 py-3 text-white border bg-gradient-to-br from-[#6c0868] to-[#50014c] hover:bg-gradient-to-br hover:to-[#6c0868] hover:from-[#50014c]'>
                Edit</Link>
        </div>
        {/*  */}
        <section className='mx-auto lg:w-[90%] w-[80%] pb-[4rem]'>
            <div className="w-[100%] mb-[1.8rem] flex lg:flex-row flex-col lg:items-center justify-start">
                <p className='lg:w-[20%] gap-3'>Name:</p>
                <div className='lg:w-[80%] font-semibold'>
                    {data.name} </div>
            </div>
            <div className="w-[100%] mb-[1.8rem] flex lg:flex-row flex-col lg:items-center justify-start">
                <p className='lg:w-[20%] gap-3'>Email:</p>
                <div className='lg:w-[80%] font-semibold'>
                    {data.email} </div>
            </div>
            <div className="w-[100%] mb-[1.8rem] flex lg:flex-row flex-col lg:items-center justify-start">
                <p className='lg:w-[20%] gap-3'>Role:</p>
                <div className='lg:w-[80%] font-semibold'>
                    {data.role?.name}
                </div>
            </div>
        </section>
    </>
  )
}
