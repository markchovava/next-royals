"use client"
import axiosClientAPI from '@/api/axiosClientAPI';
import Loader from '@/app/components/Loader';
import { tokenAuth } from '@/token/tokenAuth';
import { formatDate } from '@/utils/stringManilupation';
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { BsArrowLeft, BsArrowRight } from 'react-icons/bs'
import { FaEye } from 'react-icons/fa';



export default function CampaignList() {
    const [data, setData] = useState();
    const [search, setSearch] = useState()
    const [searchSubmit, setSearchSubmit] = useState(false)
    const [nextURL, setNextURL] = useState()
    const [prevURL, setPrevURL] = useState()
    const { getAuthToken } = tokenAuth();
    const config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${getAuthToken()}`
        }
    };


    async function paginationHandler(url) {
        try{
          const result = await axios.get(url, config)
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
            const result = await axiosClientAPI.get(`campaign-list-by-user?search=${search}`, config)
            .then((response) => {
                setData(response.data.data)
                setPrevURL(response.data?.links?.prev)
                setNextURL(response.data?.links?.next)
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
        const result = await axiosClientAPI.get(`campaign`, config)
            .then((response) => {
            setData(response.data.data);
            setPrevURL(response.data.links?.prev)
            setNextURL(response.data.links?.next)
            })
        } catch (error) {
            console.error(`Error: ${error}`)
        }   
    }

    useEffect(() => {
        getData();
    }, []);

    console.log(data)

    if(!data){ return (<Loader />) }


   return (
    <>
        {/* Title */}
        <div className="w-[100%] flex items-center justify-center flex-col">
              <h1 className="leading-none pt-[1.5rem] pb-[1.5rem] text-center font-black text-[4rem]">
                  Campaign List</h1>
              <hr className="border-t-4 border-black w-[10%] pb-[3.5rem]" />
        </div> 

        {/* SEARCH */}
        <div className='mx-auto w-[90%] flex lg:flex-row flex-col items-center justify-between gap-4 h-auto pb-[1.2rem]'>
                <div className='lg:w-[40%] w-[100%] flex items-center justify-start gap-2'>
                    <input 
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      type='text'
                      placeholder='Search by name...' 
                      className='w-[100%] py-4 px-3 rounded-lg outline-none border border-purple-300' 
                    />
                    <button 
                      onClick={() => setSearchSubmit(true)}
                      className='bg-gradient-to-br transition-all duration-150 ease-in rounded-lg px-7 py-4 bg-[#6c0868] text-white border hover:bg-gradient-to-br hover:from-[#6c0868] hover:to-[#3d003a] hover:text-white '>
                      Search</button>
                </div>
                <div className='flex items-center justify-end gap-3'>
                 
                    <Link
                      href='/voucher-redeem'
                      className='transition-all duration-150 ease-in rounded-lg px-7 py-4 bg-gradient-to-br from-[#6c0868] to-[#3d003a] text-white border hover:bg-gradient-to-br  hover:from-[#3d003a] hover:to-[#6c0868] hover:text-white '>
                      Redeem Voucher</Link>
                </div>
          </div>

            <section className="mx-auto w-[90%] lg:overflow-hidden overflow-auto">
                {/* ROW */}
                <div className="w-[70rem] lg:w-[100%] font-bold flex items-center justify-start bg-slate-100 py-3 border border-slate-200 ">
                    <div className="w-[20%] p-3 border-l border-slate-300">CAMPAIGN NAME</div>
                    <div className="w-[20%] p-3 border-l">USER NAME</div>
                    <div className="w-[20%] p-3 border-l border-slate-300">DURATION</div>
                    <div className="w-[15%] p-3 border-l border-slate-300">CURRENT POINTS</div>
                    <div className="w-[15%] p-3 border-l border-slate-300">REWARD POINTS</div>
                    <div className="w-[10%] p-3 border-l border-slate-300">ACTION</div>
                </div>

                <div className='w-[100%] border border-slate-300'>
                    {/* ROW */}
                    {data?.length > 0 ?
                        data?.map((item, i) => (
                        <div key={i} className="w-[70rem] lg:w-[100%] flex items-center justify-start py-3 border-b border-slate-300">
                            <div className="w-[20%] p-3">
                            {item?.campaign_managed?.name}
                            </div>
                            <div className="w-[20%] p-3 border-l border-slate-300">
                                {item?.user?.name ? item?.user?.name : item?.user?.email}
                            </div>
                            <div className="w-[20%] p-3 border-l border-slate-300 ">
                                <span className='mr-1'>{item.campaign_managed.start_date ? formatDate(item.campaign_managed.start_date) : '--/--/--'}</span> to 
                                <span className='ml-1'>{item.campaign_managed.end_date ? formatDate(item.campaign_managed.end_date) : '--/--/--'}</span>
                            </div>
                            <div className="w-[15%] p-3 border-l border-slate-300">{item.current_points} points</div>
                            <div className="w-[15%] p-3 border-l border-slate-300">{item.reward.target_points} points</div>
                            <div className="w-[10%] p-3 border-l border-slate-300">
                            <Link href={`/admin/campaign/${item.id}`}> 
                                <FaEye className='text-xl hover:text-blue-500 duration-150 hover:scale-110 transition-all ease-in'/> 
                            </Link>
                            </div>
                        </div>
                    ))
                    :
                    <div className="w-[50rem] lg:w-[100%] flex items-center justify-center py-4 border border-slate-200 ">
                        <h6 className='text-2xl'>No Data Available at the moment.</h6>
                    </div>
                    }

                </div>
                

            </section>


        {/* PAGINATION */}
        <div className="mx-auto w-[90%] flex items-center justify-end gap-4 pb-[3rem] pt-[2rem]"> 
            {prevURL &&
            <button 
                onClick={() => paginationHandler(prevURL)}
                className='group flex items-center justify-center gap-1 rounded-lg px-4 py-3 bg-[#6c0868] text-white border hover:bg-gradient-to-br  hover:from-[#6c0868] hover:to-[#3d003a] hover:text-white '>
                <BsArrowLeft className='transition ease-in-out duration-300 group-hover:-translate-x-1' />
                Prev 
            </button>
            }
            {nextURL &&
            <button
                onClick={() => paginationHandler(nextURL)}
                className='group flex items-center justify-center gap-1 rounded-lg px-4 py-3 bg-[#6c0868] text-white border hover:bg-gradient-to-br  hover:from-[#6c0868] hover:to-[#3d003a] hover:text-white '>
                Next 
                <BsArrowRight className='transition ease-in-out duration-300 group-hover:translate-x-1' />
            </button> 
            }
        </div>
      
    </>
  )
}
