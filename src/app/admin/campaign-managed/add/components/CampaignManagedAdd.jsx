"use client"
import axiosClientAPI from '@/api/axiosClientAPI';
import { baseURL } from '@/api/baseURL';
import { tokenAuth } from '@/token/tokenAuth';
import { darkBounce } from '@/utils/toastify';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { BsArrowRight } from 'react-icons/bs';
import { toast } from 'react-toastify';




export default function CampaignManagedAdd({ priceData }) {
    console.log('priceData')
    console.log(priceData.data)
    const router = useRouter();
    const [data, setData] = useState() 
    const [isSubmit, setIsSubmit] = useState(false);
    const [price, setPrice] = useState(priceData?.data);
    const { getAuthToken } = tokenAuth();
    const config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${getAuthToken()}`
        }
    };

    const handleInput = (e) => {
        setData({...data, [e.target.name]: e.target.value})
    }

   
   
    /* POST DATA */
    async function postData() {
        const formData = {
          name: data.name,
          description: data.description,
          start_date: data?.start_date,
          end_date: data?.end_date,
          total: calculateTotal(), // in cents
          quantity: data.vouchers_quantity,
          /* REWARD */
          reward_name: data.reward_name,
          target_points: data.target_points,
          points_per_voucher: data.points_per_voucher,
          price_per_voucher: data.price_per_voucher,
          /* COMPANY */
          company_name: data.company_name,
          company_phone: data.company_phone,
          company_address: data.company_address,
          company_email : data.company_email,
          company_website: data.company_website,
        };
        try{
          const result = await axiosClientAPI.post(`campaign-managed`, formData, config)
            .then((response) => {
                if(response.data.status == 1){
                    toast.success(response.data.message, darkBounce)
                    router.push('/admin/campaign-managed')
                    setIsSubmit(false);
                }
            })
          } catch (error) {
            console.error(`Error: ${error}`)
            setIsSubmit(false);
        }
    }  

   const calculateTotal = () => {
        const unit = (price.amount) / price.quantity ;
        const quantity = data?.vouchers_quantity ? Number(data?.vouchers_quantity) : 0;
        const calculate = unit * quantity
        return calculate;
   }

    useEffect(() => { 
        isSubmit === true && postData();
    }, [isSubmit]);
  

  return (
    <>
        {/* Title */}
        <div className="w-[100%] flex items-center justify-center flex-col">
            <h1 className="leading-none pt-[1.5rem] pb-[1.5rem] text-center font-black text-[4rem]">
                Add Campaign</h1>
            <hr className="border-t-4 border-black w-[10%] pb-[3.5rem]" />
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
                    placeholder="Write your Company Website here..." 
                    className="w-[100%] rounded-xl px-[1rem] py-[1rem] outline-none border border-slate-300" />
            </div>
        </section>

        {/* Reward Info */}
        <section className='mx-auto w-[90%] lg:overflow-hidden overflow-auto py-[2rem] px-[1.5rem]  mb-[4rem] bg-white drop-shadow-lg'>
            <div className="w-[100%] mb-[2rem] text-5xl font-light flex items-center justify-start">
                Reward Info
            </div>
            {/* REWARD NAME */}
            <div className="w-[100%] mb-[2rem]">
                <h6 className='pb-1'>Reward Name:</h6>
                <input 
                    type="text" 
                    name="reward_name" 
                    onChange={handleInput}
                    placeholder="Write your Reward Name here..." 
                    className="w-[100%] rounded-xl px-[1rem] py-[1rem] outline-none border border-slate-300" />
            </div>
            {/* TARGET POINTS */}
            <div className="w-[100%] mb-[2rem]">
                <h6 className='pb-1'>Target Points:</h6>
                <input 
                    type="number" 
                    name="target_points" 
                    onChange={handleInput}
                    placeholder="Write your Target Points here..." 
                    className="w-[100%] rounded-xl px-[1rem] py-[1rem] outline-none border border-slate-300" />
            </div>
             {/* POINTS PER VOUCHER */}
             <div className="w-[100%] mb-[2rem] grid grid-cols-2 gap-6">
                <div className='w-[100%]'>
                    <h6 className='pb-1'>Points per Voucher:</h6>
                    <input 
                        type="number" 
                        name="points_per_voucher" 
                        onChange={handleInput}
                        placeholder="Write Point per Voucher here..." 
                        className="w-[100%] rounded-xl px-[1rem] py-[1rem] outline-none border border-slate-300" />
                </div>
                {/* PRICE PER VOUCHER */}
                <div className='w-[100%]'>
                    <h6 className='pb-1'>Price per Voucher:</h6>
                    <input 
                        type="number" 
                        name="price_per_voucher" 
                        onChange={handleInput}
                        placeholder="Write Price per Voucher here..." 
                        className="w-[100%] rounded-xl px-[1rem] py-[1rem] outline-none border border-slate-300" />
                </div>
             </div>
            {/*  */}
            
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
                    placeholder="Write your Name here..." 
                    className="w-[100%] rounded-xl px-[1rem] py-[1rem] outline-none border border-slate-300" />
            </div>
            {/* DESCRIPTION */}
            <div className="w-[100%] mb-[2rem]">
                <h6 className='pb-1'>Description:</h6>
                <textarea
                    name="description" 
                    onChange={handleInput}
                    placeholder="Write your Description here..." 
                    className="w-[100%] h-[8rem] rounded-xl px-[1rem] py-[1rem] outline-none border border-slate-300"></textarea>
            </div>
            {/* DATES */}
            <div className='w-[100%] mb-[2rem] grid grid-cols-2 gap-6'>
                <div className='w-[100%]'>
                    <h6 className='pb-1'>Start Date:</h6>
                    <input 
                        type="date" 
                        name="start_date" 
                        onChange={handleInput}
                        placeholder="Write Start Date here..." 
                        className="w-[100%] rounded-xl px-[1rem] py-[1rem] outline-none border border-slate-300" />
                </div>
                <div className='w-[100%]'>
                    <h6 className='pb-1'>End Date:</h6>
                    <input 
                        type="date" 
                        name="end_date" 
                        onChange={handleInput}
                        placeholder="Write Start Date here..." 
                        className="w-[100%] rounded-xl px-[1rem] py-[1rem] outline-none border border-slate-300" />
                </div>
            </div>
            {/* QUANTITY */}
            <div className='w-[100%] mb-[2rem] grid grid-cols-3 gap-6'>
                <div className='w-[100%]'>
                    <h6 className='pb-1'>Vouchers Quantity:</h6> 
                    <input 
                        type="number" 
                        min={0}
                        name="vouchers_quantity" 
                        onChange={handleInput}
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
                    <p className='text-[2rem] font-bold text-right pr-4 bg-red-700 text-white'>
                        { '$' + (calculateTotal() / 100).toFixed(2)}
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
