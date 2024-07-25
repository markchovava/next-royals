"use client"
import axiosClientAPI from "@/api/axiosClientAPI";
import Loader from "@/app/components/Loader";
import { tokenAuth } from "@/token/tokenAuth";
import { darkBounce } from "@/utils/toastify";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { BsArrowRight } from "react-icons/bs";
/* Toast */
import { Bounce, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';




export default function UserEdit({ id }) {
    const router = useRouter();
    const { getAuthToken } = tokenAuth()
    const [data, setData] = useState({});
    const [errMsg, setErrMsg] = useState({})
    const [roles, setRoles] = useState([]);
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
        const result = await axiosClientAPI.get(`user/${id}`, config)
          .then((response) => {
            setData(response.data.data); 
          })
        } catch (error) {
          console.error(`Error: ${error}`)
        }   
    } 
    async function getRoles() {
      try{
        const result = await axiosClientAPI.get(`role-all`, config)
          .then((response) => {
            setRoles(response.data.data);
          })
        } catch (error) {
          console.error(`Error: ${error}`)
        }   
    } 
    /* POST DATA */
    async function postData() {
      if(!data.phone){
        const message = 'Phone Number required.';
        setErrMsg({phone: message});
        toast.success(message, darkBounce);
        setIsSubmit(false);
        return;
      }
      if(!data.email){
        const message = 'Email is required.';
        setErrMsg({email: message});
        toast.success(message, darkBounce);
        setIsSubmit(false);
        return;
      }
      const formData = {
        name: data.name,
        phone: data.phone,
        email: data.email,
        address: data.address,
        dob: data.dob,
        id_number: data.id_number,
        gender: data.gender,
        role_level: data.role_level,
      }
      try{
        const result = await axiosClientAPI.post(`user/${id}`, formData, config)
          .then((response) => {
            if(response.data.status == 0){
              const message = response.data.message;
              setErrMsg({email: message});
              toast.success(message, darkBounce);
              setIsSubmit(false);
              return;
            }
            if(response.data.status == 2){
              const message = response.data.message;
              setErrMsg({phone: message});
              toast.success(message, darkBounce);
              setIsSubmit(false);
              return;
            }
            if(response.data.status == 1){
              const message = response.data.message;
              setErrMsg({phone: message});
              toast.success(message, darkBounce);
              router.push('/admin/user')
              setIsSubmit(false)
              return;
            }
          })
        } catch (error) {
          console.error(`Error: ${error}`)
        }
    }  

    useEffect(() => { 
      getData();
      getRoles();
    }, []);

    useEffect(() => { 
      isSubmit && postData();
    }, [isSubmit]);


    if(!data && !roles) { return (<Loader />) }


  return (
  
    <div>
      <div className="w-[100%] flex items-center justify-center flex-col">
          <h1 className="leading-none pt-[1.5rem] pb-[1.5rem] text-center font-black text-[4rem]">
              Edit User</h1>
          <hr className="border-t-4 border-black w-[10%] pb-[3.5rem]" />
      </div> 

      {/* ROW */}
      <div className='mx-auto w-[90%] flex justify-end items-center pb-[2rem] '>
            <Link
                href={`/admin/user/view/${id}`}
                className='transition-all duration-150 ease-in rounded-lg px-8 py-3 text-white border bg-gradient-to-br from-[#6c0868] to-[#50014c] hover:bg-gradient-to-br hover:from-[#6c0868] hover:to-[#50014c]'>
                View</Link>
        </div>

      <section className="mx-auto lg:w-[90%] w-[90%]">
      {/* NAME */}
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
       {/* EMAIL */}
       <div className="w-[100%] mb-[2rem]">
          <h6 className='font-bold pb-1'>Email:</h6>
          <input 
              type="text" 
              name="email" 
              value={data.email} 
              onChange={handleInput}
              placeholder="Write your Email here..." 
              className="w-[100%] rounded-xl px-[1rem] py-[1rem] outline-none border border-slate-300" />
          {errMsg.email &&
            <p className="text-red-500">
              {errMsg.email}
            </p>
          }
      </div>
      {/* PHONE */}
      <div className="w-[100%] mb-[2rem]">
          <h6 className='font-bold pb-1'>Phone:</h6>
          <input 
              type="text" 
              name="phone"
              value={data.phone} 
              onChange={handleInput}
              placeholder="Write your Phone here..." 
              className="w-[100%] rounded-xl px-[1rem] py-[1rem] outline-none border border-slate-300" />
          {errMsg.phone &&
          <p className="text-red-500">
            {errMsg.phone}
          </p>
          }
      </div>
      {/* ADDRESS */}
      <div className="w-[100%] mb-[2rem]">
          <h6 className='font-bold pb-1'>Address:</h6>
          <input 
              type="text" 
              name="address" 
              value={data.address} 
              onChange={handleInput}
              placeholder="Write your Address here..." 
              className="w-[100%] rounded-xl px-[1rem] py-[1rem] outline-none border border-slate-300" />
      </div>
      {/* ROLES */}
      { roles.length > 0 &&
        <div className="w-[100%] mb-[2rem]">
            <h6 className='font-bold pb-1'>Role Level:</h6>
            <select
                type="text" 
                name="role_level" 
                onChange={handleInput}
                placeholder="Write your Level here..." 
                className="w-[100%] rounded-xl px-[1rem] py-[1rem] outline-none border border-slate-300">
                <option value=''>Select an option.</option>
                { roles.map((item, i) => (
                  <option 
                    key={i} 
                    value={item.level} 
                    selected={data.role_level === item.level && 'selected'}>
                      {item.name}
                    </option>
                )) }
            </select>
        </div>
      }

      <div className="w-[100%] mb-[2rem] flex items-center justify-center gap-4">
          <button 
              onClick={ () => {
                setIsSubmit(true) 
              }}
              className=' group transition ease-in-out duration-200  flex items-center justify-center gap-1 rounded-xl py-[1.3rem] px-[3rem] bg-gradient-to-br from-[#6c0868] to-[#50014c] text-white border hover:bg-gradient-to-br  hover:to-[#6c0868] hover:from-[#50014c]'>
              { isSubmit == true ? 'Processing' : 
                <>
                  Submit <BsArrowRight className='transition ease-in-out duration-200 group-hover:translate-x-1' />
                </>
              }
          
          </button>
      </div>
    </section>
    
    </div>
    
  )
}
