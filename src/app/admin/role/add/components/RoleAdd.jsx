"use client"
import axiosClientAPI from "@/api/axiosClientAPI";
import { tokenAuth } from "@/token/tokenAuth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { BsArrowRight } from "react-icons/bs";
import { Bounce, toast } from "react-toastify";




export default function RoleAdd() {
  const router = useRouter();
  const { getAuthToken } = tokenAuth()
  const [data, setData] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
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
    const formData = {
      name: data?.name,
      level: data?.level,
    }
    try{
      const result = await axiosClientAPI.post(`role/`, formData, config)
        .then((response) => {
          if(response.data.status == 1){
            setIsSubmit(false);
            router.push('/admin/role')
            const message = response.data?.message;
            toast.warn(message, {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "dark",
              transition: Bounce,
            });
            return;
          }
        })
      } catch (error) {
        console.error(`Error: ${error}`)
      } 
  }  

  useEffect(() => { 
    isSubmit && postData();
  }, [isSubmit]);

  return (
    <div>
      <div className="w-[100%] flex items-center justify-center flex-col">
          <h1 className="leading-none pt-[1.5rem] pb-[1.5rem] text-center font-black text-[4rem]">
              Add Role</h1>
          <hr className="border-t-4 border-black w-[10%] pb-[3.5rem]" />
      </div> 

      <section className="mx-auto lg:w-[80%] w-[90%]">
        <div className="w-[100%] mb-[2rem]">
            <h6 className='font-bold pb-1'>Name:</h6>
            <input 
                type="text" 
                name="name" 
                onChange={handleInput}
                placeholder="Write your Name here..." 
                className="w-[100%] rounded-xl px-[1rem] py-[1rem] outline-none border border-slate-300" />
        </div>
        <div className="w-[100%] mb-[2rem]">
            <h6 className='font-bold pb-1'>Level:</h6>
            <select
                type="text" 
                name="level" 
                onChange={handleInput}
                placeholder="Write your Phone here..." 
                className="w-[100%] rounded-xl px-[1rem] py-[1rem] outline-none border border-slate-300">
                <option value=''>Select an option.</option>
                <option value='1'>1</option>
                <option value='2'>2</option>
                <option value='3'>3</option>
                <option value='4'>4</option>
            </select>
        </div>
        <div className="w-[100%] mb-[2rem] flex items-center justify-center gap-4">
              <button 
                  onClick={ () => {
                    setIsSubmit(true) 
                  }}
                  className='lg:w-[20%] group transition ease-in-out duration-200  flex items-center justify-center gap-1 rounded-xl py-[1rem] px-[2.5rem] bg-gradient-to-br from-[#6c0868] to-[#50014c] text-white hover:bg-gradient-to-br  hover:from-[#50014c] hover:to-[#6c0868]'>
                  {isSubmit === true ? 'Processing' : 
                    <>
                      Submit <BsArrowRight className='transition ease-in-out duration-200 group-hover:translate-x-1' />
                    </>}
              
              </button>
        </div>
      </section>
    
    </div>
  )
}
