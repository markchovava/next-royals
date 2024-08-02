"use client"
import { useEffect, useState } from 'react';
import Link from 'next/link'
import axiosClientAPI from '@/api/axiosClientAPI';
import Loader from '@/app/components/Loader';
import { tokenAuth } from '@/token/tokenAuth';




export default function UserView() {
    const { getAuthToken } = tokenAuth();
    const [data, setData] = useState()
    const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${getAuthToken()}`
    }}
    /* GET DATA */
    async function getData() {
        try{
        const result = await axiosClientAPI.get(`profile/`, config)
        .then((response) => {
            setData(response.data.data)
        })
        } catch (error) {
        console.error(`Error: ${error}`)
        }   
    } 
    /*  */
    useEffect(() => {
        getData();
    }, []);
    /*  */
    if(!data){ return ( <Loader />) }

    console.log(data)
    

  return (
       
    <section className='w-[100%] h-auto pb-[4rem]'>
       <div className='lg:w-[90%] w-[80%] mx-auto lg:flex justify-start items-start gap-8'>
            <div className='lg:w-[100%]'>
                <div className='flex justify-between items-center pb-[1rem]'>
                    <div className='font-light text-[2rem] pb-4'>View User</div>
                    <Link href={`/admin/profile`} className=' py-3 px-5 rounded-lg flex justify-center items-center text-white bg-gradient-to-br bg-[#6c0868] hover:bg-gradient-to-br hover:from-pink-700 hover:to-purple-900 duration-150 transition-all'>
                        Edit Profile</Link>
                </div>
               
                <div className='w-[100%] mb-[1.6rem] flex lg:flex-row flex-col lg:items-center justify-start'>
                    <div className='lg:w-[20%]'>Full Name: </div>
                    <div className='lg:w-[80%] font-semibold flex justify-start items-center gap-1'> 
                        <span>{data.name ? data.name : 'Not added.'}</span>
                    </div>
                </div>
              
                <div className='w-[100%] mb-[1.6rem] flex lg:flex-row flex-col lg:items-center justify-start'>
                    <div className='lg:w-[20%]'>Role: </div>
                    <div className='lg:w-[80%] font-semibold'>
                        {data?.role?.name ? data?.role?.name : 'Not defined yet.'}
                    </div>
                </div>
                <div className='w-[100%] mb-[1.6rem] flex lg:flex-row flex-col lg:items-center justify-start'>
                    <div className='lg:w-[20%]'>Phone Number: </div>
                    <div className='lg:w-[80%] font-semibold'>{data.phone}</div>
                </div>
               
                <div className='w-[100%] mb-[1.6rem] flex lg:flex-row flex-col lg:items-center justify-start'>
                    <div className='lg:w-[20%]'>Email: </div>
                    <div className='lg:w-[80%] font-semibold'>
                        {data.email}
                    </div>
                </div>
                <div className='w-[100%] mb-[1.6rem] flex lg:flex-row flex-col lg:items-center justify-start'>
                    <div className='lg:w-[20%]'>Address: </div>
                    <div className='lg:w-[80%] font-semibold'>{data.address}</div>
                </div>
                
                <div className='w-[100%] mb-[1.6rem] flex lg:flex-row flex-col lg:items-center justify-start'>
                    <div className='lg:w-[20%]'>Code: </div>
                    <div className='lg:w-[80%] font-semibold'>
                        {data.code}
                    </div>
                </div>
                
            </div>     
        </div>
        
    </section>

  )
}
