"use client"
import axiosClientAPI from '@/api/axiosClientAPI';
import Loader from '@/app/components/Loader';
import { tokenAuth } from '@/token/tokenAuth';
import Link from 'next/link'
import React, { useEffect, useState } from 'react'




export default function PriceView({ id }) {
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
          const result = await axiosClientAPI.get(`price/${id}`, config)
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
    
    if(!data) { return (<Loader />)}

  return (
  
    <>
        {/* Title */}
        <div className="w-[100%] flex items-center justify-center flex-col">
            <h1 className="leading-none pt-[1.5rem] pb-[1.5rem] text-center font-black text-[4rem]">
                View Price</h1>
            <hr className="border-t-4 border-blue-900 w-[10%] pb-[3.5rem]" />
        </div> 
        {/* ROW */}
        <div className='mx-auto w-[90%] flex justify-end items-center pb-[2rem] '>
            <Link
                href={`/admin/price/edit/${id}`}
                className='transition-all duration-150 ease-in rounded-lg px-8 py-3 text-white border bg-gradient-to-br from-[#6c0868] to-[#50014c] hover:bg-gradient-to-br hover:from-[#6c0868] hover:to-[#50014c]'>
                Edit</Link>
        </div>
        {/*  */}
        <section className='mx-auto w-[90%] pb-[4rem]'>
            <div className="w-[100%] mb-[1.6rem] flex lg:flex-row flex-col lg:items-center justify-start">
                <p className='w-[20%] gap-3'>Name:</p>
                <div className='w-[80%] font-semibold'>
                    {data.name} </div>
            </div>
            <div className="w-[100%] mb-[1.6rem] flex lg:flex-row flex-col lg:items-center justify-start">
                <p className='w-[20%] gap-3'>Slug:</p>
                <div className='w-[80%] font-semibold'>
                    {data.slug} </div>
            </div>
            {/* PRIORITY */}
            {data.priority &&
              <div className="w-[100%] mb-[1.6rem] flex lg:flex-row flex-col lg:items-center justify-start">
                  <p className='lg:w-[20%] gap-3'>Priority:</p>
                  <div className='w-[80%] font-semibold'>
                    <span className="bg-green-800 text-white p-1 px-2">{data?.priority}</span> 
                  </div>
              </div>
            }
            {/* QUANTITY */}
            <div className="w-[100%] mb-[1.6rem] flex lg:flex-row flex-col lg:items-center justify-start">
                <p className='lg:w-[20%] gap-3'>Quantity:</p>
                <div className='lg:w-[80%] font-semibold'>
                    {data.quantity} 
                </div>
            </div>
            {/* AMOUNT */}
            <div className="w-[100%] mb-[2rem] flex items-center justify-start">
                <p className='lg:w-[20%] gap-3'>Amount:</p>
                <div className='lg:w-[80%] font-semibold'>
                    {data.amount ? '$' + (data.amount / 100).toFixed(2) : '$' + (0).toFixed(2) } 
                </div>
            </div>
            <div className="w-[100%] mb-[1.6rem] flex lg:flex-row flex-col lg:items-center justify-start">
                <p className='lg:w-[20%] gap-3'>Author:</p>
                <div className='lg:w-[80%] font-semibold'>
                    {data?.user?.name ? data?.user?.name : data?.user?.email} </div>
            </div>
           
        </section>
    </>
     
  )
}
