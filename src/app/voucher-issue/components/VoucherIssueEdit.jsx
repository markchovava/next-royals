"use client"

import axiosClientAPI from "@/api/axiosClientAPI";
import Loader from "@/app/components/Loader";
import { tokenAuth } from "@/token/tokenAuth";
import { darkBounce } from "@/utils/toastify";
import Link from "next/link"
import { useEffect, useRef, useState } from "react";
import { CiCircleRemove } from "react-icons/ci";
/* Toast */
import { Bounce, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import VoucherQRCode from "./VoucherQRCode";
import { IoClose } from "react-icons/io5";
import { redirect } from "next/navigation";



export default function VoucherIssueEdit() {
    const [errMsg, setErrMsg] = useState({})
    const [voucher, setVoucher] = useState();
    const [data, setData] = useState({});
    const { getAuthToken } = tokenAuth();
    const [campaign, setCampaign] = useState();
    const [isSubmit, setIsSubmit] = useState(false);
    const [message, setMessage] = useState('');
    const [isMsg, setIsMsg] = useState(false)
    const config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${getAuthToken()}`
    }}

    if(!getAuthToken()){
        redirect('/login')
    }

    const handleInput = (e) => {
        setData({...data, [e.target.name]: e.target.value})
    }

    /* CAMPAIGN */
    async function campaignData() {
        const url = `campaign-managed-list-by-user-active`;
        try{
            const result = await axiosClientAPI.get(url, config)
            .then((response) => {
                setCampaign(response.data.data);
            })
        } catch (error) {
            console.error(`Error: ${error}`);
        } 
    }
    /* POST DATA */
    async function postData() {
        if(!data.amount){
            const message = 'Amount is required.';
            setErrMsg({amount:  message});
            toast.warn(message, darkBounce);
            setIsSubmit(false);
            return;
        }
        if(!data.campaign_managed_id){
            const message = 'Campaign is required.';
            setErrMsg({campaign_managed_id: message});
            toast.warn(message, darkBounce);
            setIsSubmit(false);
            return;
        }
        const formData = {
            phone: data.phone,
            receipt_no: data.receipt_no,
            amount: Number(data.amount) * 100,
            campaign_managed_id: Number(data.campaign_managed_id),
        };

        try{
            const result = await axiosClientAPI.post(`voucher-generated`, formData, config)
            .then((response) => {
                if(response.data.status == 1){
                    const message = response.data.message;
                    setVoucher(response.data.data)
                    setErrMsg({message: message});
                    toast.success(message, darkBounce);
                    setIsSubmit(false);
                    return;
                }
            })
        } catch (error) {
            console.error(`Error: ${error}`);
            setIsSubmit(false);
        }
    }

    useEffect(() => {
        campaignData();
    }, []);

    useEffect(() => {
        isSubmit == true && postData();
    },[isSubmit])


    if(!campaign){ return ( <Loader /> ) }


  return (
    <>
        {/* Title */}
        <div className="w-[100%] flex items-center justify-center flex-col">
            <h1 className="leading-none pt-[2rem] pb-[1.5rem] text-center font-black text-[4rem]">
                Issue Voucher</h1>
                <hr className="border-t-4 border-black lg:w-[15%] w-[30%] pb-[3.5rem]" />
        </div> 
        <section className="mx-auto lg:w-[70%] w-[90%] pb-[1.5rem]">
            <div className="w-[100%] mb-[2rem] flex items-center justify-between gap-4">
                {/* CAMPAIGN */}  
                <div className='flex items-center justify-start gap-4'>
                    <Link
                        href='/campaign-managed'
                        className='px-[2rem] py-[1rem] rounded-xl text-white bg-gradient-to-br from-[#6c0868] to-purple-800 hover:bg-gradient-to-br hover:from-purple-800 hover:to-[#6c0868] transition ease-in-out duration-200'>
                        Managed Campaigns
                    </Link>        
                </div> 
            </div>
           

            <div className="w-[100%] mb-[2rem] bg-white drop-shadow-lg p-[2rem]">
                {/* Phone */}
                <div>
                    <h6 className='font-bold pb-1 text-lg'>Phone (Optional):</h6>
                    <div className='flex lg:flex-row flex-col items-center justify-start gap-5 mb-[2rem]'>
                        <input 
                            type="phone"
                            name="phone"
                            value={data?.phone}
                            onChange={handleInput} 
                            placeholder="Write your Phone here..." 
                            className="w-[100%] rounded-xl px-[1rem] py-[1rem] outline-none border border-slate-300" />
                    
                    </div>
                </div>
                {/* RECEIPT NO */}
                <div>
                    <h6 className='font-bold pb-1 text-lg'>Receipt No. (Optional):</h6>
                    <div className='flex lg:flex-row flex-col items-center justify-start gap-5 mb-[2rem]'>
                        <input 
                            type="text" 
                            name="receipt_no" 
                            onChange={handleInput}
                            value={data?.receipt_no}
                            placeholder="Write Receipt Number here..." 
                            className="w-[100%] rounded-xl px-[1rem] py-[1rem] outline-none border border-slate-300" />
                    
                    </div>
                </div>
                {/* Amount (in cents) */}
                <div>
                    <h6 className='font-bold pb-1 text-lg'>Amount (Dollars):</h6>
                    <div className='mb-[2rem]'>
                        <input 
                            type="number" 
                            name="amount"  
                            onChange={handleInput}
                            placeholder="Write Amount here..." 
                            className="w-[100%] rounded-xl px-[1rem] py-[1rem] outline-none border border-slate-300" />
                        {errMsg.amount && 
                            <div className="text-red-600 text-sm">
                                {errMsg.amount}
                            </div>
                        }   
                    </div>
                </div>
                {/* Campaign */}
                {campaign.length > 0 &&
                    <div>
                        <h6 className='font-bold pb-1 text-lg'>Campaign:</h6>
                        <div className=' mb-[2rem]'>
                            <select  
                                name="campaign_managed_id" 
                                onChange={handleInput} 
                                className="w-[100%] rounded-xl px-[1rem] py-[1rem] outline-none border border-slate-300">
                                <option value=''>Select an option.</option> 
                                { campaign.map((item, i) => (
                                    <option key={i} value={item.id}>{item.name}</option>
                                )) }
                            </select>
                            {errMsg.campaign_managed_id && 
                                <div className="text-red-600 text-sm">
                                    {errMsg.campaign_managed_id}
                                </div>
                            }   
                        </div>
                    </div>
                }
                {/* SUBMIT */}
                <div>
                    <div className='flex items-center justify-center mb-[2rem]'>
                        <button
                            onClick={() => { setIsSubmit(true); }}
                            className='px-[3rem] py-[1.3rem] text-lg text-center rounded-xl text-white transition ease-in-out duration-200 bg__primary'>
                            {isSubmit === true ? 'Processing' : 'Submit'}
                        </button>
                    
                    </div>
                </div>
            
            </div>

            {voucher &&
                <div className="w-[100%] bg-white drop-shadow-lg mb-[1rem] px-[1.5rem] py-[1rem]">
                    <div className="flex items-center justify-end">
                        <button className="p-1 border border-red-600 rounded-full">
                            <IoClose onClick={() => setVoucher() } className="text-lg text-red-600" />
                        </button>
                    </div>
                    <div className="flex lg:flex-row flex-col lg:items-center justify-start gap-3 mb-[1.5rem]">
                        <div className="lg:w-[25%]">QR Code:</div>
                        <div className="lg:w-[75%] font-semibold">
                            <span className="px-[2.5rem]"> {voucher.code} </span>
                        </div>
                    </div>
                    <div className="flex lg:flex-row flex-col lg:items-center justify-start gap-3 mb-[1.5rem]">
                        <div className="lg:w-[25%]">QR Image:</div>
                        <div className="lg:w-[75%]">
                            <VoucherQRCode qrCodeData={voucher.code} />
                        </div>
                    </div>
                    <div className="flex lg:flex-row flex-col lg:items-center justify-start gap-3 mb-[1.5rem]">
                        <div className="lg:w-[25%]">QR Points:</div>
                        <div className="lg:w-[75%] font-semibold ">
                            <span className="px-[2.5rem]"> {voucher.points} </span>
                        </div>
                    </div>
                </div>
            }


        </section>
        
    </>
  )
}
