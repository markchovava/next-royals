"use client"

import axiosClientAPI from "@/api/axiosClientAPI";
import Link from "next/link"
import { useEffect, useState } from "react";
import { BsArrowRight, BsChevronRight } from "react-icons/bs"
import { CiCircleRemove, CiSquareRemove } from "react-icons/ci";
import { useZxing } from "react-zxing";
import { darkBounce } from '@/utils/toastify';
import { toast } from 'react-toastify';
import { tokenAuth } from "@/token/tokenAuth";
import { useRouter } from "next/navigation";
import { formatDate } from "@/utils/stringManilupation";



export default function VoucherReward() {
    const router = useRouter();
    const [data, setData] = useState();
    const { getAuthToken } = tokenAuth()
    const [isSubmit, setIsSubmit] = useState(false);
    const [searchInput, setSearchInput] = useState('');
    const [mode, setMode] = useState('Voucher Number');
    const [isSearch, setIsSearch] = useState(false);
    const [isQrScan, setIsQrScan] = useState(true);
    const { ref } = useZxing({
        onDecodeResult(result) {
          setSearchInput(result.getText())
        },
        paused: isQrScan
    });
    const config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${getAuthToken()}`
    }}
    /* SEARCH DATA */
    async function searchData() {
        const formData = searchInput.trim();
        try{
            const result = await axiosClientAPI.get(`voucher-reward-search-by-code?search=${formData}`, config)
            .then((response) => {
                if(response.data.status == 0) {
                    toast.warn(response.data.message, darkBounce);
                    setIsSearch(false);
                    return;
                }
                if(response.data.status == 2) {
                    toast.warn(response.data.message, darkBounce);
                    setIsSearch(false);
                    return;
                }
                if(response.data.status == 1){
                    setData(response.data.data);
                    setIsSearch(false);
                    return;
                }
                
            })
        } catch (error) {
            console.error(`Error: ${error}`);
            setIsSearch(false);
        }   
    }
    /* POST DATA */
    async function postData() {
        const formData = {
            code: data.code,
            reward_id: data.reward_id,
            campaign_id: data.campaign_id,
            campaign_managed_id: data.campaign_managed_id,
            voucher_reward_id: data.id,
        }
        try{
            const result = await axiosClientAPI.post(`voucher-reward-used`, formData, config)
            .then((response) => {
                if(response.data.status == 1){
                    toast.success(response.data.message, darkBounce)
                    setIsSubmit(false);
                    router.push(`/campaign/${response.data.data.id}`);
                    return;
                }
                if(response.data.status == 0){
                    toast.warn(reponse.data.message, darkBounce);
                    setIsSubmit(false);
                    return;
                }
                toast.success('Something went wrong, please try again', darkBounce);
                setIsSubmit(false);
                return;
            })
        } catch (error) {
            console.error(`Error: ${error}`);
            setIsSubmit(false);
        }
    }

    useEffect(() => {
        isSearch == true && searchData();
    },[isSearch]);

    useEffect(() => {
        isSubmit == true && postData();
    },[isSubmit])


  

  return (
    <>
   
     
     {/* Title */}
     <div className="w-[100%] flex items-center justify-center flex-col">
        <h1 className="leading-none pt-[2rem] pb-[1.5rem] text-center font-black text-[4rem]">
            Verify Reward</h1>
            <hr className="border-t-4 border-black lg:w-[15%] w-[30%] pb-[3.5rem]" />
    </div> 

    <section className="mx-auto lg:w-[70%] w-[90%] pb-[2rem]">
        <div className="w-[100%] mb-[1rem] flex items-center justify-between gap-4">
            <div className='flex items-center justify-start gap-4'>
                <button 
                    onClick={() => {
                        setMode('Voucher Number');
                        setIsQrScan(!isQrScan);
                    }}
                    className='px-[2rem] py-[1rem] rounded-xl text-white bg-gradient-to-br from-blue-500 to-cyan-700 hover:bg-gradient-to-br hover:from-cyan-700 hover:to-blue-500 transition ease-in-out duration-200'>
                    Scan Voucher</button>
              {/*   <button 
                    onClick={() => {
                        setMode('Text');
                        setIsQrScan(true);
                    }}
                    className='px-[2rem] py-[1rem] rounded-xl text-white bg-gradient-to-br from-cyan-600 to-violet-800 hover:bg-gradient-to-br hover:from-violet-800 hover:to-cyan-600 transition ease-in-out duration-200'>
                    Text</button> */}
            </div>
            <div className='flex items-center justify-start gap-4'>
                <Link
                    href='/campaign-managed'
                    className='px-[2rem] py-[1rem] rounded-xl text-white bg-gradient-to-br from-[#6c0868] to-purple-800 hover:bg-gradient-to-br hover:from-[#6c0868] hover:to-violet-900 transition ease-in-out duration-200'>
                    All Campaigns</Link>
                
            </div> 
        </div>

        {/* SCAN */}
        <div className={`${isQrScan == false ? 'w-[100%] mb-[1rem]' : 'hidden' } flex justify-center items-start`}>
            <div className="w-[30rem] h-[20rem]">
                <video ref={ref} className="w-[100%] h-[100%] object-cover bg-white drop-shadow-xl"/>
            </div>
        </div>
        {/*  */}
        <div className="w-[100%] mb-[2rem]">
            <h6 className='font-bold pb-1 text-lg'>{mode}</h6>
            <div className='flex lg:flex-row flex-col items-center justify-start gap-5 mb-[4rem]'>
                <input 
                    type="text" 
                    name="code" 
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    placeholder="Enter Voucher Number here..." 
                    className="lg:w-[80%] w-[100%] rounded-xl px-[1rem] py-[1rem] outline-none border border-slate-300" />
                <button 
                     onClick={ () => {
                        setIsSearch(true) 
                      }}
                    className='lg:w-[20%] w-[100%] lg:px-[2.5rem] py-[1rem] text-center rounded-xl text-white bg-gradient-to-br from-orange-500 to-red-700 hover:bg-gradient-to-br hover:from-red-500 hover:to-red-800 transition ease-in-out duration-200'>
                    { isSearch === true ? 
                        'Processing' : 
                        'Verify Reward'
                    }
                </button>
            </div>
        </div>


        {data &&
            <section className="w-[100%] text-lg mb-[2rem] px-[1.5rem] py-[2rem] bg-white drop-shadow-xl">
                <div className="flex items-center justify-end">
                    <button className="text-red-600" onClick={() => setData()}>Close </button>
                </div>
                <p className='text-xl my-4 text-center text-green-700'>
                    The voucher is Available.
                </p>
                <div className='flex items-start justify-start gap-4 mb-2'>
                    <div className='w-[20%]'>Campaign Name:</div>
                    <div className='w-[80%] font-semibold'>{data?.campaign_managed?.name}</div>      
                </div>
                <div className='flex items-start justify-start gap-4 mb-2'>
                    <div className='w-[20%]'>Reward:</div>
                    <div className='w-[80%] font-semibold'>{data?.reward?.name}</div>      
                </div>
                <div className='flex items-start justify-start gap-4 mb-2'>
                    <div className='w-[20%]'>Company Name:</div>
                    <div className='w-[80%] font-semibold'>{data?.campaign_managed?.company_name}</div>      
                </div>
                <div className='flex items-start justify-start gap-4 mb-2'>
                    <div className='w-[20%]'>Start Date:</div>
                    <div className='w-[80%] font-semibold'>{formatDate(data?.campaign_managed?.start_date)}</div>      
                </div>
                <div className='flex items-start justify-start gap-4 mb-2'>
                    <div className='w-[20%]'>End Date:</div>
                    <div className='w-[80%] font-semibold'>{formatDate(data?.campaign_managed?.end_date)}</div>      
                </div>
                <div className='flex items-start justify-start gap-4 mb-2'>
                    <div className='w-[20%]'>Target Points:</div>
                    <div className='w-[80%] font-semibold'>{data?.reward?.target_points}</div>      
                </div>
               
                <div className="w-[100%] mt-[1rem] mb-[2rem] flex items-center justify-center gap-4">
                    <button 
                        onClick={ () => {
                            setIsSubmit(true) 
                        }}
                        className='lg:w-[20%] group transition ease-in-out duration-200  flex items-center justify-center gap-1 rounded-xl py-[1rem] px-[2.5rem] bg-blue-600 text-white border hover:bg-gradient-to-br  hover:from-blue-600 hover:to-blue-800'>
                        { isSubmit === true ? 'Processing' : 
                            <>
                            Proceed <BsArrowRight className='transition ease-in-out duration-200 group-hover:translate-x-1' />
                            </>
                        }
                    
                    </button>
                </div>
            </section>
        }

     
    </section>
    </>
  )
}

