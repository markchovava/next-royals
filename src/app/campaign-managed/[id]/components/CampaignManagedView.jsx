"use client"
import axiosClientAPI from '@/api/axiosClientAPI';
import { baseURL } from '@/api/baseURL';
import Loader from '@/app/components/Loader';
import { tokenAuth } from '@/token/tokenAuth';
import { darkBounce } from '@/utils/toastify';
import axios from 'axios';
import Link from 'next/link'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { BsArrowRight, BsChevronRight } from 'react-icons/bs';
import { CiSquareRemove } from "react-icons/ci";
import { toast } from 'react-toastify';



export default function CampaignManagedView({ id }) {
    const [data, setData] = useState();
    const [isGenerate, setIsGenerate] = useState(false);
    const [voucherExist, setVoucherExist] = useState({status: false})
    const { getAuthToken } = tokenAuth();
    const [isMsg, setIsMsg] = useState(false);
    const [message, setMessage] = useState('')

    const config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${getAuthToken()}`
        }
    };

    async function generateVouchers() {
        const formData = {
            campaign_managed_id: data.id,
            points: data.reward?.points_per_voucher,
            amount: data.reward?.price_per_voucher,
            quantity: data.quantity,
        };
        console.log(formData);
        try{
          const result = await axiosClientAPI.post(`voucher-generated-store-all`, formData, config)
            .then((response) => {
                if(response.data.status == 1){
                    const message = response.data.message;
                    toast.success(message, darkBounce)
                    setMessage(response.data.message);
                    setIsMsg(true);
                    checkVoucher();
                    setIsGenerate(false);
                    setVoucherExist({status: true});
                }
            })
          } catch (error) {
            console.error(`Error: ${error}`)
            setIsGenerate(false);
        }   
    }

    async function getData() {
        try{
          const result = await axios.get(`${baseURL}campaign-managed/${id}`)
            .then((response) => {
              console.log(response.data.data);
              setData(response.data.data);
            })
          } catch (error) {
            console.error(`Error: ${error}`)
          }   
    }

    async function checkVoucher() {
        try{
          const result = await axiosClientAPI.get(`voucher-generated-check-by-campaign?campaign_managed_id=${id}`, config)
            .then((response) => {
                if(response.data.status == 1){
                    console.log('exists')
                    setVoucherExist({
                        data: response.data.data, 
                        status: true });
                }
            })
          } catch (error) {
            console.error(`Error: ${error}`)
          }   
    } 

   
    useLayoutEffect(() => {
        checkVoucher()
        getData();
    }, [])

    useEffect(() => {
        isGenerate === true && generateVouchers();
    }, [isGenerate]);


    if(!data && !voucherExist?.data){ return (<Loader />) }

    console.log('voucherExist?.status')
    console.log(voucherExist?.status)


  return (
    <>  
       
        {/* Title */}
        <div className="w-[100%] flex items-center justify-center flex-col">
            <h1 className="leading-none pt-[1.5rem] pb-[1.5rem] text-center font-black text-[4rem]">
                View Campaign</h1>
            <hr className="border-t-4 border-black w-[20%] pb-[3.5rem]" />
        </div>  
        {isMsg == true &&
            <div className="w-[100%] mb-[1.5rem] flex items-center justify-center gap-5 text-green-600">
                {message} 
                <CiSquareRemove className='text-xl' onClick={() => setIsMsg(false)} />
            </div>
        }
        {/* LINKS */}
        { getAuthToken() &&
            <div className='mx-auto w-[90%] flex justify-end items-center gap-3 pb-[2rem] '> 
                {voucherExist?.status == false &&
                    <button onClick={ () => { setIsGenerate(true);}}
                        className=' group transition ease-in-out duration-200  flex items-center justify-center gap-1 rounded-xl py-[1rem] px-[2.5rem] text-white border bg-[#6c0868] hover:bg-gradient-to-br  hover:from-[#6c0868] hover:to-[#3d003a]'>
                        { isGenerate === true ? 'Processing' : 
                            <>
                                Generate Vouchers 
                                <BsArrowRight className='transition ease-in-out duration-200 group-hover:translate-x-1' />
                            </>
                        }
                    
                    </button> 
                }
                {voucherExist?.status == true &&
                <Link
                    href={`/campaign-managed/voucher/${id}`}
                    className='flex items-center justify-center gap-1 rounded-xl py-[0.8rem] px-[2rem] text-white border bg-[#6c0868] hover:bg-gradient-to-br  hover:from-[#6c0868] hover:to-[#3d003a]'>
                    View Vouchers
                </Link>  
                }
                
                <Link
                    href={`/campaign-managed/edit/${id}`}
                    className='flex items-center justify-center gap-1 rounded-xl py-[0.8rem] px-[2rem] bg-green-600 text-white border hover:bg-gradient-to-br  hover:from-green-600 hover:to-[#6c0868]'>
                    Edit Campaign</Link>
            </div>
        }

        {/*  */}
        <section className='mx-auto w-[90%] p-[2rem] mb-[3rem] bg-white drop-shadow-lg'>
            {/* COMPANY */}
            <div className="w-[100%] mb-[2rem] text-5xl font-light flex items-center justify-start">
                Company Info
            </div>
            <div className="w-[100%] mb-[1.6rem] flex items-center justify-start">
                <label className='w-[20%] gap-3 font-semibold'>Company Name:</label>
                <div className='w-[80%]'>
                    {data.company_name}
                </div>
            </div>
            <div className="w-[100%] mb-[1.6rem] flex items-center justify-start">
                <label className='w-[20%] gap-3 font-semibold'>Company Address:</label>
                <div className='w-[80%]'>
                    {data.company_address}
                </div>
            </div>
            <div className="w-[100%] mb-[1.6rem] flex items-center justify-start">
                <label className='w-[20%] gap-3 font-semibold'>Company Phone:</label>
                <div className='w-[80%]'>
                    {data.company_phone}
                </div>
            </div>
            <div className="w-[100%] mb-[1.6rem] flex items-center justify-start">
                <label className='w-[20%] gap-3 font-semibold'>Company Email:</label>
                <div className='w-[80%]'>
                    {data.company_email}
                </div>
            </div>
            <div className="w-[100%] mb-[2rem] flex items-center justify-start">
                <label className='w-[20%] gap-3 font-semibold'>Company Website:</label>
                <div className='w-[80%]'>
                    {data.company_website}
                </div>
            </div>
            {/* CAMPAIGN */}
            <div className="w-[100%] mb-[2rem] text-5xl font-light flex items-center justify-start">
                Campaign Info
            </div>
            <div className="w-[100%] mb-[1.6rem] flex items-center justify-start">
                <label className='w-[20%] gap-3 font-semibold'>Status:</label>
                <div className='w-[80%]'>
                    <span className={`${data.status === 'Processing' && 'bg-green-700'}
                        ${data.status === 'Active' && 'bg-pink-600'}
                        ${data.status === 'Completed' && 'bg-blue-700'} text-white px-2 py-1 rounded-lg`}>
                        {data.status}
                    </span> </div>
            </div>
            <div className="w-[100%] mb-[1.6rem] flex items-center justify-start">
                <label className='w-[20%] gap-3 font-semibold'>Name:</label>
                <div className='w-[80%]'>
                    {data.name} </div>
            </div>
            <div className="w-[100%] mb-[1.6rem] flex items-center justify-start">
                <label className='w-[20%] gap-3 font-semibold'>Description:</label>
                <div className='w-[80%]'>
                    {data.description} </div>
            </div>
            <div className="w-[100%] mb-[1.6rem] flex items-center justify-start">
                <label className='w-[20%] gap-3 font-semibold'>Duration:</label>
                <div className='w-[80%]'>
                    {`${data?.start_date && data.start_date} - ${data?.end_date && data.end_date}`}
                </div>
            </div>
            <div className="w-[100%] mb-[1.6rem] flex items-center justify-start">
                <label className='w-[20%] gap-3 font-semibold'>Points per Voucher:</label>
                <div className='w-[80%] '>
                    {data.reward?.points_per_voucher ? data.reward?.points_per_voucher : 'Not added.' }
                </div>
            </div>
            <div className="w-[100%] mb-[1.6rem] flex items-center justify-start">
                <label className='w-[20%] gap-3 font-semibold'>Price of Voucher:</label>
                <div className='w-[80%] '>
                    {data.reward?.price_per_voucher ? '$' + (data.reward.price_per_voucher).toFixed(2) : 'Not added.'}
                </div>
            </div>
            <div className="w-[100%] mb-[1.6rem] flex items-center justify-start">
                <label className='w-[20%] gap-3 font-semibold'>Number of Vouchers:</label>
                <div className='w-[80%]'>
                    {data.quantity ? data.quantity : 'Not added'}
                </div>
            </div>
            <div className="w-[100%] mb-[1.6rem] flex items-center justify-start">
                <label className='w-[20%] gap-3 font-semibold'>Total Cost:</label>
                <div className='w-[80%]'>
                    {data?.total ? '$' + (data?.total / 100).toFixed(2) : 'Not added.'}
                </div>
            </div>
            {/* REWARD */}
            <div className="w-[100%] mb-[2rem] text-5xl font-light flex items-center justify-start">
                Reward Info
            </div>
            <div className="w-[100%] mb-[1.6rem] flex items-center justify-start">
                <label className='w-[20%] gap-3 font-semibold'>Reward Name:</label>
                <div className='w-[80%] text-purple-900 font-semibold'>
                    {data.reward?.name ? data.reward?.name : 'Not added.'}
                </div>
            </div>
            <div className="w-[100%] mb-[1.6rem] flex items-center justify-start">
                <label className='w-[20%] gap-3 font-semibold'>Target Points:</label>
                <div className='w-[80%] text-blue-900 font-semibold'>
                    {data.reward?.target_points ? data.reward?.target_points : 'Not added.'}
                </div>
            </div>
        </section>  
    </>
  )
}
