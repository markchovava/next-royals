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
import { toast } from "react-toastify";




export default function UserRoleList() {
    const {getAuthToken} = tokenAuth();
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
              const result = await axiosClientAPI.get(`user-author-by-author?search=${search}`, config)
              .then((response) => {
                  setData(response.data.data)
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
          const result = await axiosClientAPI.get(`user-author-by-author`, config)
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
        const result = await axiosClientAPI.delete(`user-author/${id}`, config)
        .then((response) => {
          toast.success(response.data.message, darkBounce);
          getData()
        })
      } catch (error) {
        console.error(`Error: ${error}`)
      }   
    } 

    useEffect(() => { 
      searchSubmit == true && searchData()
    }, [searchSubmit]); 

    useEffect(() => { 
        getData();
    }, []);


    if(!data){ return (<Loader />) }

    console.log('data')
    console.log(data)
  return (

    <>
        {/* Title */}
        <div className="w-[100%] flex items-center justify-center flex-col">
              <h1 className="leading-none pt-[1.5rem] pb-[1.5rem] text-center font-black text-[4rem]">
                  User Role List</h1>
              <hr className="border-t-4 border-blue-900 w-[10%] pb-[3.5rem]" />
        </div> 

          {/* SEARCH */}
        <div className='mx-auto w-[90%] flex items-center justify-between h-auto pb-[1.2rem]'>
              <div className='lg:w-[40%] w-[70%] flex items-center justify-start gap-2'>
                  <input 
                      type='text'
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      placeholder='Search by name...' 
                      className='w-[100%] py-3 px-3 rounded-lg outline-none border border-blue-300' 
                  />
                  <button 
                      onClick={() => setSearchSubmit(true)}
                      className='transition-all duration-150 ease-in rounded-xl px-7 py-4 text-white border bg-gradient-to-br from-[#6c0868] to-[#50014c] hover:bg-gradient-to-br hover:from-[#50014c] hover:to-[#6c0868]'>
                      Search</button>
              </div>
              <div>
                  <Link
                    href='/admin/user-role/add'
                    className='transition-all duration-150 ease-in rounded-2xl px-7 py-4 text-white border bg-gradient-to-br from-[#6c0868] to-[#50014c] hover:bg-gradient-to-br hover:from-[#50014c] hover:to-[#6c0868]'>
                    Add</Link>
              </div>
        </div>

        <section className="mx-auto w-[90%] lg:overflow-hidden overflow-auto">
            {/* ROW */}
            <div className="w-[50rem] lg:w-[100%] font-bold flex items-center justify-start bg-slate-100 py-2 border border-slate-200 ">
                  <div className="w-[50%] p-3 ">NAME</div>
                  <div className="w-[30%] p-3 border-l border-slate-300">ROLE</div>
                  <div className="w-[20%] p-3 border-l border-slate-300">ACTION</div>
            </div>

            { data.length > 0 ?
              data.map((item, i) => (
                <div key={i} className="w-[50rem] lg:w-[100%] flex items-center justify-start border border-slate-200 ">
                      <div className="w-[50%] p-3 ">{item.name}</div>
                      <div className="w-[30%] p-3 border-l border-slate-300">{item.role?.name ? item.role?.name : 'Not Added.'}</div>
                      <div className="w-[20%] p-3 border-l border-slate-300 flex justify-start items-center gap-3 text-xl">
                        <Link href={`/admin/user-role/${item.id}`}> 
                          <FaEye className='hover:text-blue-500 duration-150 hover:scale-110 transition-all ease-in'/> 
                        </Link>
                        <Link href={`/admin/user-role/edit/${item.id}`}> 
                          <MdEdit className='hover:text-green-500 duration-150 hover:scale-110 transition-all ease-in' /> 
                        </Link>
                        <button> 
                          <MdDeleteForever 
                            onClick={() => deleteData(item?.user_author?.id)}
                            className='hover:text-red-500 duration-150 hover:scale-110 transition-all ease-in' /> 
                        </button>
                      </div>
                </div>
              ))
              :
              <div className="w-[50rem] lg:w-[100%] flex items-center justify-center py-4 border border-slate-200 ">
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
                  <BsArrowLeft className='transition ease-in-out duration-300 group-hover:-tranblue-x-1' />
                  Prev 
              </button>
            }
            { nextURL && 
              <button
                  onClick={() => paginationHandler(nextURL)} 
                  className='group flex items-center justify-center gap-1 rounded-lg px-4 py-3 bg-blue-500 text-white border hover:bg-gradient-to-br  hover:from-blue-500 hover:to-blue-700 hover:text-white '>
                  Next 
                  <BsArrowRight className='transition ease-in-out duration-300 group-hover:tranblue-x-1' />
              </button> 
            }
          </div>
        

    </>
 
  )
}
