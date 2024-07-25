"use client"

import axiosClientAPI from "@/api/axiosClientAPI";
import Loader from "@/app/components/Loader";
import { tokenAuth } from "@/token/tokenAuth";
import Link from "next/link";
import { useEffect, useState } from "react";
import VoucherQRCode from "./VoucherQRCode";

export default function VoucherRewardView({ id }) {
    const [data, setData] = useState();
    const { getAuthToken } = tokenAuth()
    const config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${getAuthToken()}`
        }
    };

    async function getData() {
        try{
          const result = await axiosClientAPI.get(`voucher-reward/${id}`, config)
            .then((response) => {
              setData(response.data?.data);
            })
          } catch (error) {
            console.error(`Error: ${error}`)
          }   
    }
    
    useEffect(() => {
        getData();
    }, []);

    if(!data){ return (<Loader />)}

    console.log(data)

  return (
    <>
         {/* Title */}
         <div className="w-[100%] flex items-center justify-center flex-col">
            <h1 className="leading-none pt-[1.8rem] pb-[1.5rem] text-center font-black text-[4rem]">
              My Campaigns</h1>
              <hr className="border-t-4 border-black lg:w-[15%] w-[30%] pb-[3.5rem]" />
        </div>
        {/* ROW */}
        <div className='mx-auto w-[90%] flex justify-end items-center gap-3 pb-[2rem] '>
            <Link
                href={`/campaign/voucher-reward/${id}`}
                className='transition-all duration-150 ease-in rounded-lg px-8 py-3 text-white border bg-gradient-to-br from-[#6c0868] to-[#50014c] hover:bg-gradient-to-br hover:to-[#6c0868] hover:from-[#50014c]'>
                Reward Vouchers List
            </Link>
        </div>

        <section className='mx-auto w-[90%] pb-[4rem]'>
            <div className="w-[100%] mb-[2rem] flex items-center justify-start">
                <label className='w-[20%] gap-3'>Voucher Code:</label>
                <div className='w-[80%] font-semibold'>
                    {data.code} 
                </div>
            </div>
            <div className="w-[100%] mb-[2rem] flex items-center justify-start">
                <label className='w-[20%] gap-3'>Voucher Code:</label>
                <div className='w-[80%]'>
                    <VoucherQRCode qrCodeData={data.code} />
                </div>
            </div>
            <div className="w-[100%] mb-[2rem] flex items-center justify-start">
                <label className='w-[20%] gap-3'>Status:</label>
                <div className='w-[80%] font-semibold'>
                    <span className={` text-white py-1 px-2 rounded-xl
                        ${data.status == 'Available' && 'bg-green-700'}
                        ${data.status == 'Used' && 'bg-blue-600'}
                        `}>{data.status} </span>
                </div>
            </div>
            <div className="w-[100%] mb-[2rem] flex items-center justify-start">
                <label className='w-[20%] gap-3'>Campaign Name:</label>
                <div className='w-[80%] font-semibold'>
                    {data.campaign_managed.name} 
                </div>
            </div>
            <div className="w-[100%] mb-[2rem] flex items-center justify-start">
                <label className='w-[20%] gap-3'>Campaign Name:</label>
                <div className='w-[80%] font-semibold'>
                    {data.campaign_managed.company_name} 
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
                <label className='w-[20%] gap-3'>Reward:</label>
                <div className='w-[80%] font-semibold'>
                    <span className=''>
                        {data.reward?.name}</span> </div>
            </div>
            <div className="w-[100%] mb-[2rem] flex items-center justify-start">
                <label className='w-[20%] gap-3'>Reward Points:</label>
                <div className='w-[80%] font-semibold'>
                    {data?.reward?.target_points}
                </div>
            </div>


        </section>
    </>
  )
}
