"use client"
import axiosClientAPI from "@/api/axiosClientAPI";
import Loader from "@/app/components/Loader";
import { tokenAuth } from "@/token/tokenAuth";
import { darkBounce } from "@/utils/toastify";
import Link from "next/link";
import { useEffect, useState } from "react";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import { FaEye } from "react-icons/fa";
import { MdDeleteForever, MdEdit } from 'react-icons/md';
import { TbProgress } from "react-icons/tb";
import { toast } from "react-toastify";
import { FaCalendarDay } from "react-icons/fa6";
import { trimRightToChar } from "@/utils/stringManilupation";
import { redirect } from "next/navigation";


export default function CampaignManagedList() {
    const { getAuthToken } = tokenAuth();
    const [data, setData] = useState();
    const  [user, setUser] = useState();
    const [nextURL, setNextURL] = useState()
    const [prevURL, setPrevURL] = useState()
    const [search, setSearch] = useState('');
    const [searchSubmit, setSearchSubmit] = useState(false);
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getAuthToken()}`
    }}

    if(!getAuthToken()){
      redirect('/login')
  }

    /* PAGINATION */
    async function paginationHandler(url) {
      try{
        const result = await axiosClientAPI.get(url, config)
        .then((response) => {
              setData(response.data.data)
              setPrevURL(response.data.links.prev)
              setNextURL(response.data.links.next)
        })
      } catch (error) {
        console.error(`Error: ${error}`)
      }     
    }

    /* SEARCH DATA */
    async function searchData() {
      if(search == ''){
         getData()
         setSearchSubmit(false)
      }
          try{
              const result = await axiosClientAPI.get(`campaign-managed-list-by-user?search=${search}`, config)
              .then((response) => {
                  setPrevURL(response.data.links.prev)
                  setNextURL(response.data.links.next)
                  setSearch(search)
                  setSearchSubmit(false)
              })
          } catch (error) {
              console.error(`Error: ${error}`)
          }   
    }

    /* GET DATA */
    async function getData() {
        try{
          const result = await axiosClientAPI.get(`campaign-managed-list-by-user`, config)
            .then((response) => {
              setData(response.data.data);
              setPrevURL(response.data.links.prev)
              setNextURL(response.data.links.next)
            })
          } catch (error) {
            console.error(`Error: ${error}`)
          }   
    } 


    async function getUser() {
        try{
          const result = await axiosClientAPI.get(`profile`, config)
            .then((response) => {
              setUser(response.data.data);
            })
          } catch (error) {
            console.error(`Error: ${error}`)
          }   
    } 

    /* DELETE DATA */
    async function deleteData(id) {
      try{
        const result = await axiosClientAPI.delete(`campaign-managed/${id}`, config)
        .then((response) => {
          toast.success(response.data.message, darkBounce);
          getData();
        })
      } catch (error) {
        console.error(`Error: ${error}`);
      }   
    } 

 
    useEffect(() => { 
      searchSubmit == true && searchData();
    }, [searchSubmit]); 

    useEffect(() => {
        getUser(); 
        getData();
    }, []);

    if(!data){ return ( <Loader />)}

    console.log(data)

  return (
      
    <>
        {/* Title */}
        <div className="w-[100%] flex items-center justify-center flex-col">
              <h1 className="leading-none pt-[1.5rem] pb-[1.5rem] text-center font-black text-[4rem]">
                  Managed Campaign List</h1>
              <hr className="border-t-4 border-black w-[10%] pb-[3.5rem]" />
        </div> 

        <div className="w-[100%] pb-[2rem]">
            <p className='w-[90%] mx-auto mb-2 text-3xl font-bold'> 
                <span className='text-[#6c0868]'>
                  Hi {user?.email ? trimRightToChar(user?.email, '@') : ''}. </span>
            </p>
            <p className="w-[90%] mx-auto leading-normal text-xl">
              Below are a list of the campaigns you've created or a manager of. 
              Get started by clicking "Create Campaign" and providing all the required information.
            </p>
        </div>

          {/* SEARCH */}
        <div className='mx-auto w-[90%] flex lg:flex-row flex-col items-center justify-between gap-4 h-auto pb-[1.2rem]'>
              <div className='lg:w-[40%] w-[100%] flex items-center justify-start gap-2'>
                  <input 
                      type='text'
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      placeholder='Search by name...' 
                      className='w-[100%] py-4 px-3 rounded-xl outline-none border border-slate-300' 
                  />
                  <button 
                      onClick={() => setSearchSubmit(true)}
                      className='bg__primary transition-all duration-150 ease-in rounded-xl px-7 py-4 text-white border'>
                      {searchSubmit == true ? 'Processing' : 'Search'}
                    </button>
              </div>
             
              <div className='lg:w-[60%] w-[100%] grid lg:grid-cols-4 grid-cols-2 gap-3'>
                  <Link
                    href='/campaign-managed/add'
                    className='text-center transition-all duration-150 ease-in rounded-lg px-5 py-4 bg-gradient-to-br from-blue-600 to-[#6c0868] text-white border hover:bg-gradient-to-br  hover:from-[#6c0868] hover:to-blue-600 hover:text-white '>
                    Create Campaign</Link>
                  <Link
                    href='/voucher-issue'
                    className='text-center transition-all duration-150 ease-in rounded-lg px-5 py-4 bg-gradient-to-br from-green-700 to-blue-600 text-white border hover:bg-gradient-to-br  hover:from-blue-600 hover:to-green-700 hover:text-white '>
                    Issue Voucher</Link>
                  <Link
                    href='/voucher-redeem'
                    className='text-center transition-all duration-150 ease-in rounded-lg px-5 py-4 bg-gradient-to-br from-[#6c0868] to-[#570253] text-white border hover:bg-gradient-to-br hover:to-[#6c0868] hover:from-[#570253] hover:text-white '>
                    Redeem Voucher</Link>
                  <Link
                    href='/voucher-reward'
                    className='text-center transition-all duration-150 ease-in rounded-lg px-5 py-4 bg-gradient-to-br from-orange-500 to-red-700 text-white border hover:bg-gradient-to-br  hover:from-red-700 hover:to-orange-600 hover:text-white '>
                    Verify Reward</Link>
              </div>
              
        </div>

        <section className="mx-auto w-[90%] lg:overflow-hidden overflow-auto">
            {/* ROW */}
            <div className="w-[70rem] lg:w-[100%] font-bold flex items-center justify-start bg-slate-100 py-2 border border-slate-200 ">
                  <div className="w-[20%] p-3 ">NAME</div>
                  <div className="w-[20%] p-3 border-l border-slate-300">COMPANY</div>
                  <div className="w-[15%] p-3 border-l border-slate-300">DURATION</div>
                  <div className="w-[15%] p-3 border-l border-slate-300">STATUS</div>
                  <div className="w-[15%] p-3 border-l border-slate-300">VOUCHERS</div>
                  <div className="w-[15%] p-3 border-l border-slate-300">ACTION</div>
            </div>

            { data.length > 0 ?
              data.map((item, i) => (
                <div key={i} className="w-[70rem] lg:w-[100%] flex items-center justify-start
                 border border-slate-200 ">
                      <div className="w-[20%] p-3 ">{item.name}</div>
                      <div className="w-[20%] p-3 border-l border-slate-300">
                        {item.company_name}
                      </div>
                      <div className="w-[15%] p-3 border-l border-slate-300">
                        {item.num_of_days ? item.num_of_days + ' days' : 'Not added.' }
                      </div>
                      <div className="w-[15%] p-3 border-l border-slate-300"> 
                        <span className={` bg-blue-700 text-white px-2 py-1 rounded-lg`}>
                          {item.status}
                        </span>
                      </div>
                      <div className="w-[15%] p-3 border-l border-slate-300"> 
                        {item.quantity_remaining ? item.quantity_remaining + ' of ' : ''}
                        {item.quantity ? item.quantity : 'Not added.'}
                      </div>
                      <div className="w-[15%] p-3 border-l border-slate-300 flex justify-start items-center gap-3 text-xl">
                          <Link title="View" href={`/campaign-managed/${item.id}`}> 
                              <FaEye className='hover:text-blue-500 duration-150 hover:scale-110 transition-all ease-in'/> 
                          </Link>
                          <Link title="Edit" href={`/campaign-managed/edit/${item.id}`}> 
                              <MdEdit className='hover:text-green-500 duration-150 hover:scale-110 transition-all ease-in' /> 
                          </Link>
                          <Link title="Update Status" href={`/campaign-managed/status/${item.id}`}> 
                              <TbProgress className='hover:text-gray-500 duration-150 hover:scale-110 transition-all ease-in' /> 
                          </Link>
                          <Link title="Update Dates" href={`/campaign-managed/duration/${item.id}`}> 
                              <FaCalendarDay className='hover:text-cyan-500 duration-150 hover:scale-110 transition-all ease-in' /> 
                          </Link>
                          <button title="Delete"> 
                              <MdDeleteForever 
                                onClick={() => deleteData(item.id)}
                                className='hover:text-red-500 duration-150 hover:scale-110 transition-all ease-in' /> 
                          </button>
                          
                      </div>
                </div>
              ))
              :
              <div className="w-[50rem] lg:w-[100%] flex items-center justify-center py-8 border border-slate-200 ">
                  <h6 className='text-2xl'>No Data Available at the moment.</h6>
              </div>
            }
        </section>

        {/* PAGINATION */}
        <div className="mx-auto w-[90%] flex items-center justify-end gap-4 pb-[3rem] pt-[2rem]">
            { prevURL && 
              <button 
                  onClick={() => paginationHandler(prevURL)}
                  className='group flex items-center justify-center gap-1 rounded-lg px-4 py-3 bg-blue-500 text-white border hover:bg-gradient-to-br  hover:from-blue-500 hover:to-blue-700 hover:text-white '>
                  <BsArrowLeft className='transition ease-in-out duration-300 group-hover:-translate-x-1' />
                  Prev 
              </button>
            }
            { nextURL && 
              <button
                  onClick={() => paginationHandler(nextURL)} 
                  className='group flex items-center justify-center gap-1 rounded-lg px-4 py-3 bg-blue-500 text-white border hover:bg-gradient-to-br  hover:from-blue-500 hover:to-blue-700 hover:text-white '>
                  Next 
                  <BsArrowRight className='transition ease-in-out duration-300 group-hover:translate-x-1' />
              </button> 
            }
        </div>
        

    </>
  
   
  )
}
