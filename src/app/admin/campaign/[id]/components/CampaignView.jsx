"use client"
import axiosClientAPI from '@/api/axiosClientAPI';
import Loader from '@/app/components/Loader';
import { tokenAuth } from '@/token/tokenAuth';
import Link from 'next/link'
import React, { useEffect, useState } from 'react'




export default function CampaignView({ id }) {
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
          const result = await axiosClientAPI.get(`campaign/${id}`, config)
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
                View Campaign</h1>
            <hr className="border-t-4 border-blue-900 w-[10%] pb-[3.5rem]" />
        </div> 
        {/* ROW */}
        <div className='mx-auto w-[90%] flex justify-end items-center pb-[2rem] '>
            <Link
                href={`/admin/campaign`}
                className='transition-all duration-150 ease-in rounded-lg px-8 py-3 text-white border bg-gradient-to-br from-[#6c0868] to-[#50014c] hover:bg-gradient-to-br hover:to-[#6c0868] hover:from-[#50014c]'>
                Campaigns</Link>
        </div>
        {/*  */}
        <section className='mx-auto w-[90%] pb-[4rem]'>
            <div className="w-[100%] mb-[2rem] flex items-center justify-start">
                <label className='w-[20%] gap-3'>Campaign Name:</label>
                <div className='w-[80%] font-semibold'>
                    {data.campaign_managed.name} 
                </div>
            </div>
            <div className="w-[100%] mb-[2rem] flex items-center justify-start">
                <label className='w-[20%] gap-3'>Campaign Duration:</label>
                <div className='w-[80%] font-semibold'>
                    <span className='mr-1'>{data.campaign_managed.start_date}</span> to
                    <span className='ml-1'>{data.campaign_managed.end_date}</span>
                </div>
            </div>
            <div className="w-[100%] mb-[2rem] flex items-center justify-start">
                <label className='w-[20%] gap-3'>Company Name:</label>
                <div className='w-[80%] font-semibold'>
                    {data.campaign_managed?.company_name} 
                </div>
            </div>
            <div className="w-[100%] mb-[2rem] flex items-center justify-start">
                <label className='w-[20%] gap-3'>Status:</label>
                <div className='w-[80%] font-semibold'>
                    {data.campaign_managed?.status}
                </div>
            </div>
            <div className="w-[100%] mb-[2rem] flex items-center justify-start">
                <label className='w-[20%] gap-3'>Current Points:</label>
                <div className='w-[80%] font-semibold'>
                    <span className='bg-red-600 px-2 py-1 text-white rounded-xl'>{data.current_points}</span> </div>
            </div>
            <div className="w-[100%] mb-[2rem] flex items-center justify-start">
                <label className='w-[20%] gap-3'>Current Quantity:</label>
                <div className='w-[80%] font-semibold'>
                    {data.current_quantity} </div>
            </div>
            {/* REWARD */}
            <div className="w-[100%] mb-[2rem] flex items-center justify-start">
                <label className='w-[20%] gap-3'>Reward Name:</label>
                <div className='w-[80%] font-semibold'>
                    {data.reward?.name}
                </div>
            </div>
            <div className="w-[100%] mb-[2rem] flex items-center justify-start">
                <label className='w-[20%] gap-3'>Reward Points:</label>
                <div className='w-[80%] font-semibold'>
                    {data?.reward?.target_points}
                </div>
            </div>

            <div className="w-[100%] mb-[2rem] flex items-center justify-start">
                <label className='w-[20%] gap-3'>Points per Voucher:</label>
                <div className='w-[80%] font-semibold'>
                    {data.reward?.points_per_voucher}
                </div>
            </div>
            <div className="w-[100%] mb-[2rem] flex items-center justify-start">
                <label className='w-[20%] gap-3'>Price per Voucher:</label>
                <div className='w-[80%] font-semibold'>
                    { data.reward?.price_per_voucher 
                    ? '$' + (data.reward?.price_per_voucher / 100).toFixed(2) 
                    : '$' + (0).toFixed(2) }
                </div>
            </div>
        </section>
    </>
     
  )
}
