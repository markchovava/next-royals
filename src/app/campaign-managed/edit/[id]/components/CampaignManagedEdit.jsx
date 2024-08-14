"use client"
import axiosClientAPI from '@/api/axiosClientAPI';
import { baseURL } from '@/api/baseURL';
import Loader from '@/app/components/Loader';
import { tokenAuth } from '@/token/tokenAuth';
import { darkBounce } from '@/utils/toastify';
import axios from 'axios';
import Link from 'next/link';
import { redirect, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { BsArrowRight } from 'react-icons/bs';
import { toast } from 'react-toastify';




export default function CampaignManagedEdit({id, priceData }) {

    const router = useRouter();
    const [data, setData] = useState() 
    const [reward, setReward] = useState()
    const [isSubmit, setIsSubmit] = useState(false);
    const [price, setPrice] = useState(priceData?.data);
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
        setData({...data, [e.target.name]: e.target.value})
    }

    async function getData() {
        try{
          const result = await axios.get(`${baseURL}campaign-managed/${id}`)
            .then((response) => {
                let res = response.data.data;
                setData(res)
                setReward({
                    name: res?.reward.name,
                    target_points: res?.reward.target_points,
                    points_per_voucher: res?.reward.points_per_voucher,
                    price_per_voucher: res?.reward.price_per_voucher / 100,
                }) 
            })
          } catch (error) {
            console.error(`Error: ${error}`)
          }   
    }

   
    /* POST DATA */
    async function postData() {
        const formData = {
          name: data?.name,
          description: data?.description,
          //start_date: data?.start_date,
          //end_date: data?.end_date,
          num_of_days: data?.num_of_days,
          total: data?.total, // in cents
          quantity: data?.quantity,
          /* REWARD */
          reward_name: reward?.name,
          target_points: reward?.target_points,
          points_per_voucher: reward?.points_per_voucher,
          price_per_voucher: reward?.price_per_voucher * 100,
          /* COMPANY */
          company_name: data?.company_name,
          company_phone: data?.company_phone,
          company_address: data?.company_address,
          company_email : data?.company_email,
          company_website: data?.company_website,
        };
        try{
          const result = await axiosClientAPI.post(`campaign-managed/${id}`, formData, config)
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

    /* 
    *   CALCULATES TOTALS AND UPDATED QUANTITY 
    *   q is quantity
    */
   const calculateTotal = (q) => {
        const unit = (price.amount) / price.quantity ;
        const quantity = q ? Number(q) : 0;
        const calculate = unit * quantity;
        setData({...data, quantity: q, total: calculate})
   }

   useEffect(() => {
    getData();
   }, []);

    useEffect(() => { 
        isSubmit === true && postData();
    }, [isSubmit]);


    if(!data){ return (<Loader />) }

    console.log(data)
  

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
                className='flex items-center justify-center gap-1 rounded-xl py-[0.8rem] px-[2rem] text-white bg-gradient-to-br to-green-600 from-[#6c0868] hover:bg-gradient-to-br hover:from-green-600 hover:to-[#6c0868]'>
                View Managed Campaign</Link>
        </div>

         {/* Company Info */}
         <section className='mx-auto w-[90%] lg:overflow-hidden overflow-auto py-[2rem] px-[1.5rem]  mb-[4rem] bg-white drop-shadow-lg'>
            <div className="w-[100%] mb-[2rem] text-5xl font-light flex items-center justify-start">
                Company Info
            </div>
            {/* COMPANY NAME */}
            <div className="w-[100%] mb-[2rem]">
                <h6 className='pb-1'>Company Name:</h6>
                <input 
                    type="text" 
                    name="company_name" 
                    onChange={handleInput}
                    value={data?.company_name}
                    placeholder="Write your Company Name here..." 
                    className="w-[100%] rounded-xl px-[1rem] py-[1rem] outline-none border border-slate-300" />
            </div>
            {/* COMPANY PHONE */}
            <div className="w-[100%] mb-[2rem]">
                <h6 className='pb-1'>Company Phone:</h6>
                <input 
                    type="text" 
                    name="company_phone" 
                    onChange={handleInput}
                    value={data?.company_phone}
                    placeholder="Write your Company Phone here..." 
                    className="w-[100%] rounded-xl px-[1rem] py-[1rem] outline-none border border-slate-300" />
            </div>
            {/* COMPANY ADDRESS */}
            <div className="w-[100%] mb-[2rem]">
                <h6 className='pb-1'>Company Address:</h6>
                <input 
                    type="text" 
                    name="company_address" 
                    onChange={handleInput}
                    value={data?.company_address}
                    placeholder="Write your Company Address here..." 
                    className="w-[100%] rounded-xl px-[1rem] py-[1rem] outline-none border border-slate-300" />
            </div>
            {/* COMPANY EMAIL */}
            <div className="w-[100%] mb-[2rem]">
                <h6 className='pb-1'>Company Email:</h6>
                <input 
                    type="text" 
                    name="company_email" 
                    onChange={handleInput}
                    value={data?.company_email}
                    placeholder="Write your Company Email here..." 
                    className="w-[100%] rounded-xl px-[1rem] py-[1rem] outline-none border border-slate-300" />
            </div>
            {/* COMPANY WEBSITE */}
            <div className="w-[100%] mb-[2rem]">
                <h6 className='pb-1'>Company Website:</h6>
                <input 
                    type="text" 
                    name="company_website" 
                    onChange={handleInput}
                    value={data?.company_website}
                    placeholder="Write your Company Website here..." 
                    className="w-[100%] rounded-xl px-[1rem] py-[1rem] outline-none border border-slate-300" />
            </div>
        </section>


        {/* Campaign Info */}
        <section className='mx-auto w-[90%] lg:overflow-hidden overflow-auto pt-[2rem] px-[1.5rem]  mb-[4rem] bg-white drop-shadow-lg'>
            <div className="w-[100%] mb-[2rem] text-5xl font-light flex items-center justify-start">
                Campaign Info
            </div>
            {/* NAME */}
            <div className="w-[100%] mb-[2rem]">
                <h6 className='pb-1'>Name:</h6>
                <input 
                    type="text" 
                    name="name" 
                    onChange={handleInput}
                    value={data?.name}
                    placeholder="Write your Name here..." 
                    className="w-[100%] rounded-xl px-[1rem] py-[1rem] outline-none border border-slate-300" />
            </div>
            {/* DESCRIPTION */}
            <div className="w-[100%] mb-[2rem]">
                <h6 className='pb-1'>Description:</h6>
                <textarea
                    name="description" 
                    onChange={handleInput}
                    value={data?.description}
                    placeholder="Write your Description here..." 
                    className="w-[100%] h-[8rem] rounded-xl px-[1rem] py-[1rem] outline-none border border-slate-300"></textarea>
            </div>
            {/* NUMBER OF DAYS */}
            <div className="w-[100%] mb-[2rem]">
                <h6 className='pb-1'>Number of Days:</h6>
                <input 
                    type="number" 
                    name="num_of_days" 
                    value={data.num_of_days}
                    onChange={handleInput}
                    min={1}
                    placeholder="Write the Number of Days here..." 
                    className="w-[100%] rounded-xl px-[1rem] py-[1rem] outline-none border border-slate-300" />
            </div>
            {/* DATES */}
            {/* <div className='w-[100%] mb-[2rem] grid grid-cols-2 gap-6'>
                <div className='w-[100%]'>
                    <h6 className='pb-1'>Start Date:</h6>
                    <input 
                        type="date" 
                        name="start_date" 
                        onChange={handleInput}
                        value={data?.start_date}
                        placeholder="Write Start Date here..." 
                        className="w-[100%] rounded-xl px-[1rem] py-[1rem] outline-none border border-slate-300" />
                </div>
                <div className='w-[100%]'>
                    <h6 className='pb-1'>End Date:</h6>
                    <input 
                        type="date" 
                        name="end_date" 
                        onChange={handleInput}
                        value={data?.end_date}
                        placeholder="Write Start Date here..." 
                        className="w-[100%] rounded-xl px-[1rem] py-[1rem] outline-none border border-slate-300" />
                </div>
            </div> */}
            
        </section>


        {/* CALCULATIONS */}
        <section className='mx-auto w-[90%] lg:overflow-hidden overflow-auto py-[2rem] px-[1.5rem]  mb-[4rem] bg-white drop-shadow-lg'>
             {/* QUANTITY */}
             <div className='w-[100%] mb-[2rem] grid grid-cols-3 gap-6'>
                <div className='w-[100%]'>
                    <h6 className='pb-1'>Vouchers Quantity:</h6> 
                    <input 
                        type="number" 
                        min={0}
                        name="quantity" 
                        onChange={(e) => { calculateTotal(e.target.value) }}
                        value={data?.quantity}
                        placeholder="Write Vouchers Quantity here..." 
                        className="w-[100%] rounded-xl px-[1rem] py-[1rem] outline-none border border-slate-300" />
                </div>
                <div className='w-[100%]'>
                    <h6 className='pb-1 text-right'>Cost Price:</h6> 
                    <p className='text-[2rem] text-right'>
                        {price.amount ? '$' + (price.amount / 100).toFixed(2) : '$' + (0).toFixed(2) } for {price.quantity}</p>
                </div>
                <div className='w-[100%]'>
                    <h6 className='pb-1 text-right'>Total:</h6> 
                    <p className='text-[2rem] font-bold text-right pr-4 bg-[#6c0868] text-white'>
                        { data?.total ? '$' + (data?.total / 100).toFixed(2) : 'Not added.' }
                    </p>
                </div>

            </div>
        </section>


      

        <div className="w-[100%] flex items-center justify-center gap-4 pb-[4rem]">
              <button 
                  onClick={ () => {
                    setIsSubmit(true) 
                  }}
                  className='lg:w-[20%] group transition ease-in-out duration-200 bg-[#6c0868] hover:bg-gradient-to-br  hover:from-[#6c0868] hover:to-[#3d003a] flex items-center justify-center gap-1 rounded-xl py-[1.4rem] px-[2.5rem] text-white border'>
                  { isSubmit === true ? 'Processing' : 
                    <>
                      Submit <BsArrowRight className='transition ease-in-out duration-200 group-hover:translate-x-1' />
                    </>}
              </button>
        </div>

       


    </>
  )
}
