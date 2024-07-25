"use client"
import axiosClientAPI from "@/api/axiosClientAPI";
import { tokenAuth } from "@/token/tokenAuth";
import { darkBounce } from "@/utils/toastify";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { BsArrowRight } from "react-icons/bs";
/* Toast */
import { Bounce, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



export default function PriceAdd() {
    const router = useRouter();
    const { getAuthToken } = tokenAuth()
    const [data, setData] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);
    const [errMsg, setErrMsg] = useState({});
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getAuthToken()}`
    }}

    const handleInput = (e) => {
      setData({...data, [e.target.name]: e.target.value})
    }

  /* POST DATA */
  async function postData() {
    if(!data.slug){
      const message = 'Slug is required.';
      setErrMsg({slug: message});
      toast.success(message, darkBounce);
      setIsSubmit(false);
      return;
    }
    if(!data.quantity){
      const message = 'Quantity is required.';
      setErrMsg({quantity: message});
      toast.success(message, darkBounce);
      setIsSubmit(false);
      return;
    }
    if(!data.amount){
      const message = 'Amount is required.';
      setErrMsg({amount: message});
      toast.success(message, darkBounce);
      setIsSubmit(false);
      return;
    }

    const formData = {
      name: data.name,
      slug: data.slug,
      priority: data.priority,
      quantity: data.quantity,
      amount: data.amount,
    }
    try{
      const result = await axiosClientAPI.post(`price`, formData, config)
        .then((response) => {
          if(response.data.status == 0){
            const message = response.data.message;
            setErrMsg({email: message});
            toast.success(message, darkBounce);
            setIsSubmit(false);
            return;
          }
          if(response.data.status == 1){
            const message = response.data.message;
            toast.success(message, darkBounce);
            setIsSubmit(false);
            router.push('/admin/price');
            return;
          }

        })
      } catch (error) {
        console.error(`Error: ${error}`)
        setIsSubmit(false);
      }
  }  


  useEffect(() => { 
    isSubmit == true && postData();
  }, [isSubmit]);

  return (
    <div>
      <div className="w-[100%] flex items-center justify-center flex-col">
          <h1 className="leading-none pt-[1.5rem] pb-[1.5rem] text-center font-black text-[4rem]">
              Add Price</h1>
          <hr className="border-t-4 border-black w-[10%] pb-[3.5rem]" />
      </div> 

      {/* ROW */}
      <div className='mx-auto w-[90%] flex justify-end items-center pb-[2rem] '>
            <Link
                href={`/admin/price`}
                className='transition-all duration-150 ease-in rounded-lg px-8 py-3 text-white border bg-gradient-to-br from-[#6c0868] to-[#50014c] hover:bg-gradient-to-br hover:to-[#6c0868] hover:from-[#50014c]'>
                All Prices
            </Link>
        </div>

      <section className="mx-auto lg:w-[90%] w-[90%]">
        <div className="w-[100%] mb-[2rem]">
            <h6 className='font-bold pb-1'>Name:</h6>
            <input 
                type="text" 
                name="name" 
                onChange={handleInput}
                placeholder="Write your Name here..." 
                className="w-[100%] rounded-xl px-[1rem] py-[1rem] outline-none border border-slate-300" />
        </div>
        {/* SLUG */}
        <div className="w-[100%] mb-[2rem]">
            <h6 className='font-bold pb-1'>Slug (small caps only):</h6>
            <input 
                type="text" 
                name="slug" 
                onChange={handleInput}
                placeholder="Write your Slug here..." 
                className="w-[100%] rounded-xl px-[1rem] py-[1rem] outline-none border border-slate-300" />
            {errMsg.slug &&
              <p className="text-red-500">{errMsg.slug}</p>
            }
        </div>
        {/* QUANTITY */}
        <div className="w-[100%] mb-[2rem]">
            <h6 className='font-bold pb-1'>Quantity:</h6>
            <input 
                type="number" 
                name="quantity" 
                onChange={handleInput}
                placeholder="Write your Quantity here..." 
                className="w-[100%] rounded-xl px-[1rem] py-[1rem] outline-none border border-slate-300" />
            {errMsg.slug &&
              <p className="text-red-500">{errMsg.slug}</p>
            }
        </div>
        {/* PRIORITY */}
        <div className="w-[100%] mb-[2rem]">
            <h6 className='font-bold pb-1'>Priority:</h6>
            <select 
                name="priority" 
                type="number"
                onChange={handleInput}
                className="w-[100%] rounded-xl px-[1rem] py-[1rem] outline-none border border-slate-300">
                  <option value=''>Select an option.</option>
                  <option value={1}>1</option>
                  <option value={2}>2</option>
                  <option value={3}>3</option>
                  <option value={4}>4</option>
                  <option value={5}>5</option>
                </select>
        </div>
        {/* AMOUNT */}
        <div className="w-[100%] mb-[2rem]">
            <h6 className='font-bold pb-1'>Amount:</h6>
            <input 
                name="amount" 
                type="number"
                onChange={handleInput}
                placeholder="Write your Amount here..." 
                className="w-[100%] rounded-xl px-[1rem] py-[1rem] outline-none border border-slate-300" />
            {errMsg.amount &&
              <p className="text-red-500">{errMsg.amount}</p>
            }
        </div>

        <div className="w-[100%] mb-[2rem] flex items-center justify-center gap-4">
              <button 
                  onClick={ () => {
                    setIsSubmit(true) 
                  }}
                  className='lg:w-[20%] group transition ease-in-out duration-200  flex items-center justify-center gap-1 rounded-xl py-[1.4rem] px-[2.5rem]  text-white border bg-gradient-to-br from-[#6c0868] to-[#50014c] hover:bg-gradient-to-br hover:to-[#6c0868] hover:from-[#50014c]'>
                  {setIsSubmit == true ? 'Processing' : 
                    <>
                      Submit <BsArrowRight className='transition ease-in-out duration-200 group-hover:translate-x-1' />
                    </>}
              
              </button>
        </div>
      </section>
    
    </div>
  )
}
