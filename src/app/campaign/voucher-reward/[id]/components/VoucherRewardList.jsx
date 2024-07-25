"use client"
import axiosClientAPI from "@/api/axiosClientAPI";
import Loader from "@/app/components/Loader";
import { tokenAuth } from "@/token/tokenAuth";
import Link from "next/link";
import { useEffect, useState } from "react"
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import { FaEye } from "react-icons/fa";



export default function VoucherRewardList({ id }) {
    const [nextURL, setNextURL] = useState()
    const [prevURL, setPrevURL] = useState()
    const [search, setSearch] = useState()
    const [data, setData] = useState();
    const [isSearch, setIsSearch] = useState(false)
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
          getData();
          setSearchSubmit(false);
      }
          try{
              const result = await axiosClientAPI.get(`voucher-reward-by-campaign/${id}?search=${search}`, config)
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
        const result = await axiosClientAPI.get(`voucher-reward-by-campaign/${id}`, config)
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

    useEffect(() => {
      isSearch === true && searchData();
    }, [isSearch])

    if(!data){ return (<Loader />)}


    console.log(data)

  return (
    <>
        {/* Title */}
        <div className="w-[100%] flex items-center justify-center flex-col">
            <h1 className="leading-none pt-[1.8rem] pb-[1.5rem] text-center font-black text-[4rem]">
              Reward Vouchers</h1>
              <hr className="border-t-4 border-black lg:w-[15%] w-[30%] pb-[3.5rem]" />
        </div>

         {/* SEARCH */}
         <section className='mx-auto w-[90%] flex lg:flex-row flex-col items-center justify-between gap-4 h-auto pb-[1.2rem]'>
            <div className='lg:w-[40%] w-[100%] flex items-center justify-start gap-2'>
                <input 
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  type='text'
                  placeholder='Search by name...' 
                  className='w-[100%] py-4 px-3 rounded-lg outline-none border border-purple-300' 
                />
                <button 
                  onClick={() => setIsSearch(true)}
                  className='bg-gradient-to-br transition-all duration-150 ease-in rounded-lg px-7 py-4 bg-[#6c0868] text-white border hover:bg-gradient-to-br hover:from-[#6c0868] hover:to-[#3d003a] hover:text-white '>
                    {isSearch === true ? 'Processing' : 'Search'}
                  </button>
            </div>
            <div className='flex items-center justify-end gap-3'>                 
                <Link
                  href='/campaign'
                  className='transition-all duration-150 ease-in rounded-lg px-7 py-4 bg-gradient-to-br from-[#6c0868] to-[#3d003a] text-white border hover:bg-gradient-to-br  hover:from-[#3d003a] hover:to-[#6c0868] hover:text-white '>
                  My Campaigns</Link>
            </div>
          </section>

          <section className="mx-auto w-[90%] lg:overflow-hidden overflow-auto">
              {/* HEADER */}
              <div className="w-[50rem] lg:w-[100%] font-bold flex items-center justify-start bg-slate-100 py-3 border border-slate-200 ">
                  <div className="w-[25%] p-3">CODE</div>
                  <div className="w-[25%] p-3 border-l border-slate-300">CAMPAIGN NAME</div>
                  <div className="w-[20%] p-3 border-l border-slate-300">REWARD</div>
                  <div className="w-[20%] p-3 border-l border-slate-300">USER</div>
                  <div className="w-[10%] p-3 border-l border-slate-300">ACTION</div>
              </div>
              {/* ROW */}
              {data?.length > 0 &&
                data.map((i, key) => (
                <div key={key} className="w-[50rem] lg:w-[100%] flex items-center justify-start border border-slate-200">
                    <div className="w-[25%] p-3">{i.code}</div>
                    <div className="w-[25%] p-3 border-l border-slate-300">
                      {i?.campaign_managed?.name}
                    </div>
                    <div className="w-[20%] p-3 border-l border-slate-300">{i.reward?.name}</div>
                    <div className="w-[20%] p-3 border-l border-slate-300">
                      {i.user?.name ? i.user?.name : i.user?.email }
                    </div>
                    <div className="w-[10%] p-3 border-l border-slate-300">
                        <Link href={`/campaign/voucher-reward/view/${i.id}`}> 
                            <FaEye className='text-xl hover:text-blue-500 duration-150 hover:scale-110 transition-all ease-in'/> 
                        </Link>
                    </div>
                </div>
                ))
              }
              
          </section>

          {/* PAGINATION */}
          <section className="mx-auto w-[90%] flex items-center justify-end gap-4 pb-[3rem] pt-[2rem]"> 
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
            
            
          </section>
    </>
  )
}
