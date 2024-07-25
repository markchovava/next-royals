"use client"
import axiosClientAPI from "@/api/axiosClientAPI";
import Loader from "@/app/components/Loader";
import { tokenAuth } from "@/token/tokenAuth";
import { darkBounce } from "@/utils/toastify";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { BsArrowRight } from "react-icons/bs";
import { Bounce, toast } from "react-toastify";




export default function RoleEdit({ id }) {
    const router = useRouter();
    const { getAuthToken } = tokenAuth()
    const [data, setData] = useState();
    const [isSubmit, setIsSubmit] = useState(false);
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getAuthToken()}`
    }}

    const handleInput = (e) => {
      setData({...data, [e.target.name]: e.target.value})
    }

    /* GET DATA */
    async function getData() {
      try{
        const result = await axiosClientAPI.get(`role/${id}`, config)
          .then((response) => {
            setData(response.data.data);
          })
        } catch (error) {
          console.error(`Error: ${error}`)
        }   
    } 

    /* POST DATA */
    async function postData() {
      const formData = {
        name: data?.name,
        level: data?.level
      }
      try{
        const result = await axiosClientAPI.post(`role/${id}`, formData, config)
          .then((response) => {
            if(response.data.status == 1){
              const message = response.data.message;
              router.push('/admin/role')
              setIsSubmit(false);
              toast.success(message, darkBounce);
            }
          })
        } catch (error) {
          console.error(`Error: ${error}`)
          setIsSubmit(false);
        } 
    }  

    useEffect(() => { 
      getData();
    }, []);

    useEffect(() => { 
      isSubmit && postData();
    }, [isSubmit]);


    if(!data) { return ( <Loader /> ) }

    console.log('data')
    console.log(data)


  return (
    <>
      <div className="w-[100%] flex items-center justify-center flex-col">
          <h1 className="leading-none pt-[1.5rem] pb-[1.5rem] text-center font-black text-[4rem]">
              Edit Role</h1>
          <hr className="border-t-4 border-black w-[10%] pb-[3.5rem]" />
      </div> 

       {/* ROW */}
       <div className='mx-auto w-[90%] flex justify-end items-center pb-[2rem] '>
            <Link
              href={`/admin/role/view/${id}`}
              className='transition-all duration-150 ease-in rounded-lg  px-8 py-3 bg-gradient-to-br from-[#6c0868] to-[#50014c] text-white border hover:bg-gradient-to-br hover:from-[#50014c] hover:to-[#6c0868]  '>
              Edit</Link>
        </div>

      <section className="mx-auto lg:w-[90%] w-[90%]">
        <div className="w-[100%] mb-[2rem]">
            <h6 className='font-bold pb-1'>Name:</h6>
            <input 
                type="text" 
                name="name" 
                value={data.name}
                onChange={handleInput}
                placeholder="Write your Name here..." 
                className="w-[100%] rounded-xl px-[1rem] py-[1rem] outline-none border border-slate-300" />
        </div>
        <div className="w-[100%] mb-[2rem]">
            <h6 className='font-bold pb-1'>Level:</h6>
            <select
                name="level" 
                onChange={handleInput}
                className="w-[100%] rounded-xl px-[1rem] py-[1rem] outline-none border border-slate-300">
                <option value=''>Select an option.</option>
                <option value='1' selected={data?.level == 1 && 'selected'}>1</option>
                <option value='2' selected={data?.level == 2 && 'selected'}>2</option>
                <option value='3' selected={data?.level == 3 && 'selected'}>3</option>
                <option value='4' selected={data?.level == 4 && 'selected'}>4</option>
            </select>
        </div>
        <div className="w-[100%] mb-[2rem] flex items-center justify-center gap-4">
            <button 
                onClick={ () => { setIsSubmit(true) }}
                className='lg:w-[20%] group transition ease-in-out duration-200 flex items-center justify-center gap-1 rounded-xl py-[1.3rem] px-[2.5rem] bg-gradient-to-br from-[#6c0868] to-[#50014c] text-white border hover:bg-gradient-to-br  hoverbg-gradient-to-br hover:from-[#50014c] hover:to-[#6c0868]'>
                {isSubmit === true 
                ? 'Processing' 
                : <>
                    Submit 
                    <BsArrowRight 
                      className='transition ease-in-out duration-200 group-hover:translate-x-1' />
                  </>
                } 
            </button>
        </div>
      </section>
    
    </>
  
   
  )
}
