"use client"
import axiosClientAPI from '@/api/axiosClientAPI';
import Loader from '@/app/components/Loader';
import { tokenAuth } from '@/token/tokenAuth';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { BsArrowLeft, BsArrowRight } from 'react-icons/bs';
import CsvDownloader from 'react-csv-downloader';
import { redirect } from 'next/navigation';



export default function VoucherList({ id }) {
    const csvTitle = 'Voucher_List'
    const {getAuthToken} = tokenAuth();
    const [data, setData] = useState();
    const [csvData, setCsvData] = useState();
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

    const columns = [
        {id: 'first', displayName: 'CODE'}, 
        {id: 'second', displayName: 'CAMPAIGN'},
        {id: 'third', displayName: 'POINTS'},
        {id: 'forth', displayName: 'AMOUNT'},
    ];
      
    /* PAGINATION */
    async function paginationHandler(url) {
      try{
        const result = await axiosClientAPI.get(url, config)
        .then((response) => {
                setPrevURL(response.data.links.prev)
                setNextURL(response.data.links.next)
                /* DATA */
                setData(response.data.data);
                /* const res = response.data.data;
                let items = []
                for(let i = 0; i < res.length; i++) {
                    items = [...items, 
                        {first: res[i].code, second: res[i]?.campaign_managed?.name, 
                        third: res[i]?.points, forth: res[i]?.amount}
                    ];
                }
                setCsvData(items); */
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
          return
        }
            try{
                const result = await axiosClientAPI.get(`voucher-generated-by-campaign/${id}?search=${search}`, config)
                .then((response) => {
                    setPrevURL(response.data?.links?.prev)
                    setNextURL(response.data?.links?.next)
                    setSearch(search)
                    setSearchSubmit(false)
                    /* DATA */
                    setData(response.data.data);
                    /* const res = response.data.data;
                    let items = []
                    for(let i = 0; i < res.length; i++) {
                        items = [...items, 
                            {first: res[i].code, second: res[i]?.campaign_managed?.name, 
                            third: res[i]?.points, forth: res[i]?.amount}
                        ];
                    }
                    setCsvData(items); */
                    return;
                })
            } catch (error) {
                console.error(`Error: ${error}`)
            }   
    }
    /* GET DATA */
    async function getData() {
        try{
          const result = await axiosClientAPI.get(`voucher-generated-by-campaign/${id}`, config)
            .then((response) => {
                setPrevURL(response.data.links.prev)
                setNextURL(response.data.links.next)
                /* DATA */
                setData(response.data.data);
                /* const res = response.data.data;
                let items = []
                for(let i = 0; i < res.length; i++) {
                    items = [...items, 
                        {first: res[i].code, second: res[i]?.campaign_managed?.name, 
                        third: res[i]?.points, forth: res[i]?.amount}
                    ];
                }
                setCsvData(items); */
            })
          } catch (error) {
            console.error(`Error: ${error}`)
          }   
    } 
    /* GET DATA */
    async function getDataCsv() {
        try{
          const result = await axiosClientAPI.get(`voucher-generated-by-campaign-csv/${id}`, config)
            .then((response) => {
                const res = response.data.data;
                console.log(response.data.data)
                let items = []
                for(let i = 0; i < res.length; i++) {
                    items = [...items, 
                        {first: res[i].code, second: res[i]?.campaign_managed?.name, 
                        third: res[i]?.points, forth: res[i]?.amount}
                    ];
                }
                setCsvData(items);
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
          getDataCsv();
      }, []);
  
  
      if(!data && !csvData){ return (<Loader />) }
  
      console.log(data)

    return (
        <>
        <div className='w-[100%] pb-[4rem]'>
            {/* Title */}
            <section className="w-[100%] flex items-center justify-center flex-col">
                <h1 className="leading-none pt-[1.5rem] pb-[1.5rem] text-center font-black text-[4rem]">
                    Voucher List</h1>
                <hr className="border-t-4 border-black w-[10%] pb-[3.5rem]" />
            </section> 
            {/* SEARCH */}
            <section className='mx-auto w-[90%] flex items-center justify-between h-auto pb-[1.2rem]'>
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
                        {searchSubmit === true ? 'Processing' : 'Search'}
                        </button>
                </div>
                <div>
                    <button
                    href='/'
                    className='transition-all duration-150 ease-in rounded-2xl px-7 py-4 text-white border bg-gradient-to-br from-[#6c0868] to-[#50014c] hover:bg-gradient-to-br hover:from-[#50014c] hover:to-[#6c0868]'>
                    <CsvDownloader
                        filename={csvTitle}
                        extension=".csv"
                        separator=","
                        wrapColumnChar=" "
                        columns={columns}
                        datas={csvData}
                        text="CSV Download" />
                    
                    </button>
                </div>
            </section>
            
            {/*  */}
            <section className="mx-auto w-[90%] lg:overflow-hidden overflow-auto">
                {/* ROW */}
                <div className="w-[50rem] lg:w-[100%] text-lg font-bold flex items-center justify-start bg-slate-100 py-2 border border-slate-200 ">
                    <div className="w-[30%] p-3 ">CODE</div>
                    <div className="w-[30%] p-3 border-l border-slate-300">CAMPAIGN</div>
                    <div className="w-[20%] p-3 border-l border-slate-300">POINTS</div>
                    <div className="w-[20%] p-3 border-l border-slate-300">AMOUNT</div>
                </div>
                {/* ROW */}
                {data.length > 0 ?
                    data.map((i, key) => (
                        <div className="w-[50rem] lg:w-[100%] text-lg flex items-center justify-start border border-slate-200 ">
                            <div className="w-[30%] p-3 ">{i.code}</div>
                            <div className="w-[30%] p-3 border-l border-slate-300">
                                {i.campaign_managed?.name}
                            </div>
                            <div className="w-[20%] p-3 border-l border-slate-300">
                                {i.points + ' points'}
                            </div>
                            <div className="w-[20%] p-3 border-l border-slate-300">
                                { '$' + (i.amount).toFixed(2)}
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
                    className='group flex items-center justify-center gap-1 rounded-lg px-4 py-3 text-white border bg-gradient-to-br from-[#6c0868] to-[#50014c] hover:bg-gradient-to-br hover:from-[#6c0868] hover:to-[#50014c] hover:text-white '>
                    <BsArrowLeft className='transition ease-in-out duration-300 group-hover:-translate-x-1' />
                    Prev 
                </button>
                }
                { nextURL && 
                <button
                    onClick={() => paginationHandler(nextURL)} 
                    className='group flex items-center justify-center gap-1 rounded-lg px-4 py-3 text-white border bg-gradient-to-br from-[#6c0868] to-[#50014c] hover:bg-gradient-to-br hover:from-[#6c0868] hover:to-[#50014c] hover:text-white '>
                    Next 
                    <BsArrowRight className='transition ease-in-out duration-300 group-hover:translate-x-1' />
                </button> 
                }
            </div>

        </div>
        </>
    )
}
