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



export default function CampaignManagedList() {
    const { getAuthToken } = tokenAuth();
    const [data, setData] = useState();
    const [nextURL, setNextURL] = useState()
    const [prevURL, setPrevURL] = useState()
    const [search, setSearch] = useState('');
    const [searchSubmit, setSearchSubmit] = useState(false);
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getAuthToken()}`
    }}

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
        getData();
    }, []);

    if(!data){ return ( <Loader />)}

  return (
      
    <>
        {/* Title */}
        <div className="w-[100%] flex items-center justify-center flex-col">
              <h1 className="leading-none pt-[1.5rem] pb-[1.5rem] text-center font-black text-[4rem]">
                  Managed Campaign List</h1>
              <hr className="border-t-4 border-black w-[10%] pb-[3.5rem]" />
        </div> 

          {/* SEARCH */}
        <div className='mx-auto w-[90%] flex items-center justify-between h-auto pb-[1.2rem]'>
              <div className='lg:w-[40%] w-[70%] flex items-center justify-start gap-2'>
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
              <div>
                  <Link
                    href='/admin/campaign-managed/add'
                    className='bg__primary transition-all duration-150 ease-in rounded-xl px-7 py-4 text-white border bg__primary'>
                    Add</Link>
              </div>
        </div>

        <section className="mx-auto w-[90%] lg:overflow-hidden overflow-auto">
            {/* ROW */}
            <div className="w-[50rem] lg:w-[100%] font-bold flex items-center justify-start bg-slate-100 py-2 border border-slate-200 ">
                  <div className="w-[20%] p-3 ">NAME</div>
                  <div className="w-[20%] p-3 border-l border-slate-300">COMPANY</div>
                  <div className="w-[15%] p-3 border-l border-slate-300">DURATION</div>
                  <div className="w-[15%] p-3 border-l border-slate-300">STATUS</div>
                  <div className="w-[15%] p-3 border-l border-slate-300">AUTHOR</div>
                  <div className="w-[15%] p-3 border-l border-slate-300">ACTION</div>
            </div>

            { data.length > 0 ?
              data.map((item, i) => (
                <div key={i} className="w-[50rem] lg:w-[100%] flex items-center justify-start
                 border border-slate-200 ">
                      <div className="w-[20%] p-3 ">{item.name}</div>
                      <div className="w-[20%] p-3 border-l border-slate-300">
                        {item.company_name}
                      </div>
                      <div className="w-[15%] p-3 border-l border-slate-300">
                        {item.start_date} - {item.end_date}
                      </div>
                      <div className="w-[15%] p-3 border-l border-slate-300"> 
                        <span className={`${item.status === 'Processing' && 'bg-green-700'}
                          ${item.status === 'Active' && 'bg-pink-600'}
                          ${item.status === 'Completed' && 'bg-blue-700'} text-white px-2 py-1 rounded-lg`}>
                          {item.status}
                        </span>
                      </div>
                      <div className="w-[15%] p-3 border-l border-slate-300"> 
                        {item.user?.name ? item.user?.name : item.user?.email}
                      </div>
                      <div className="w-[15%] p-3 border-l border-slate-300 flex justify-start items-center gap-3 text-xl">
                          <Link href={`/campaign-managed/${item.id}`}> 
                              <FaEye className='hover:text-blue-500 duration-150 hover:scale-110 transition-all ease-in'/> 
                          </Link>
                          <Link href={`/campaign-managed/edit/${item.id}`}> 
                              <MdEdit className='hover:text-green-500 duration-150 hover:scale-110 transition-all ease-in' /> 
                          </Link>
                          <Link href={`/campaign-managed/status/${item.id}`}> 
                              <TbProgress className='hover:text-green-500 duration-150 hover:scale-110 transition-all ease-in' /> 
                          </Link>
                          <button> 
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
