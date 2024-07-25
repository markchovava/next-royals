"use client"
import axiosClientAPI from '@/api/axiosClientAPI';
import Loader from '@/app/components/Loader';
import { tokenAuth } from '@/token/tokenAuth';
import { darkBounce } from '@/utils/toastify';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { Bounce, toast } from 'react-toastify';



export default function ProfileEdit(){
    const { getAuthToken } = tokenAuth();
    const router = useRouter();
    const [data, setData] = useState();
    const [isSubmit, setIsSubmit] = useState(false);
    const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${getAuthToken()}`
    }};

    const handleInput = (e) => {
        setData({...data, [e.target.name]: e.target.value })
    }

    async function getData() {
        try{
          const result = await axiosClientAPI.get(`profile/`, config)
          .then((response) => {
            setData(response.data.data)
          })
        } catch (error) {
          console.error(`Error: ${error}`);
        }   
    } 

    async function postData() {
        if(!data.email){
            toast.warn('Email is required.', darkBounce)
            setIsSubmit(false);
            return
        }
        if(!data.phone){
            toast.warn('Phone Number is required.', darkBounce)
            setIsSubmit(false);
            return;
        }
        const formData = {
            name: data.name,
            address: data.address,
            phone: data.phone,
            email: data.email,
        }
        try{
          const result = await axiosClientAPI.post(`profile/`, formData, config)
          .then((response) => {
            if(response.data.status == 0){
                toast.warn(response.data.message, darkBounce);
                setIsSubmit(false);
                return;
            }
            if(response.data.status == 1){
                toast.success(response.data.message, darkBounce);
                router.push('/admin/profile/view')
                setIsSubmit(false);
                return;
            }
          })
        } catch (error) {
          console.error(`Error: ${error}`);
          console.error(`Error Message: ${error.message}`);
          console.error(`Error Response: ${error.response}`);
          setIsSubmit(false);
        }

      } 
      
    useEffect(() => {
        getData();
    }, []);

    useEffect(() => {
        isSubmit == true && postData();
    }, [isSubmit]);


    if(!data){ return ( <Loader /> ) }


  return (
    <section className='w-[100%] h-auto pb-[4rem]'>
         <div className='w-[90%] mx-auto flex justify-end items-center pb-[1rem]'>
            <Link href={`/admin/profile/view`} className='py-3 px-5 rounded-lg flex justify-center items-center text-white bg-[#6c0868] hover:bg-gradient-to-br hover:from-pink-700 hover:to-purple-900 duration-150 transition-all'>
                View Profile</Link>
        </div>
        <div className='w-[90%] mx-auto lg:flex justify-start items-start gap-8'>
            <div className='w-[100%]'>
                {/*  */}
                <div className='font-light text-[2rem] pb-4'>Profile Details</div>
                {/* NAME */}
                <div className='pb-6'>
                    <div className='w-[100%]'>
                        <h6 className='mb-1 text-sm'>Name:</h6>
                        <input 
                            type='text' 
                            name='name'
                            value={data.name}
                            onChange={handleInput}
                            placeholder='Enter your Name...'
                            className='w-[100%] outline-none border border-slate-300 px-3 py-3 rounded-lg' />
                    </div>
                </div>
                {/* EMAIL */}
                <div className='pb-6'>
                    <div className='w-[100%]'>
                        <h6 className='mb-1 text-sm'>Email:</h6>
                        <input 
                            type='email' 
                            name='email'
                            value={data.email}
                            onChange={handleInput}
                            placeholder='Enter the Email here...'
                            className='w-[100%] outline-none border border-slate-300 px-3 py-3 rounded-lg' />
                    </div>
                </div>
                 {/* PHONE */}
                 <div className='pb-6'>
                    <div className='w-[100%]'>
                        <h6 className='mb-1 text-sm'>Phone:</h6>
                        <input 
                            type='text' 
                            name='phone'
                            value={data.phone}
                            onChange={handleInput}
                            placeholder='Enter the Phone Number...'
                            className='w-[100%] outline-none border border-slate-300 px-3 py-3 rounded-lg' />
                    </div>
                </div>
                {/* ADDRESS */}
                <div className='pb-6'>
                    <div className='w-[100%]'>
                        <h6 className='mb-1 text-sm'>Address:</h6>
                        <textarea 
                            type='text' 
                            name='address'
                            value={data.address}
                            onChange={handleInput}
                            placeholder='Address...'
                            className='w-[100%] h-[5rem] outline-none border border-slate-300 px-3 py-3 rounded-lg'></textarea>
                    </div>
                </div>
            </div> 
        </div>
        <div className='w-[90%] mx-auto'>
            <div className='flex items-center justify-center'>
                <button onClick={ () => setIsSubmit(true) } className='px-[8rem] py-5 rounded-lg flex justify-center items-center text-white bg-[#6c0868] hover:bg-gradient-to-br hover:from-pink-700 hover:to-purple-900 duration-150 transition-all'>
                    { isSubmit === true ? 'Processing' : 'Submit' }
                </button>
            </div>
        </div>
    </section>
  )
}

