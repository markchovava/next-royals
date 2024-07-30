import React from 'react'
import VoucherList from './components/VoucherList'
import { BsChevronRight } from 'react-icons/bs'
import Link from 'next/link'




export default function page({ params: {id} }) {
  return (
    <>
        {/* BREADCRUMBS */}
        <section className='w-[100%] bg-slate-100 text-black'>
          <div className='mx-auto w-[90%]'>
              <ul className='py-2 flex items-center justify-start gap-2'>
                <li className='flex gap-1 justify-start items-center'>
                  <Link href='/' className='flex justify-start items-center'>
                    Home</Link> 
                </li>
               
                <li><BsChevronRight /></li>
                <li className='flex justify-start items-center'>
                  <Link href='/admin/campaign-managed'>
                    Managed Campaign List</Link>
                </li>
                <li><BsChevronRight /></li>
                <li className='flex justify-start items-center'>
                  <Link href={`/admin/campaign-managed/${id}`} className=''>
                    View Managed Campaign</Link>
                </li>
                <li><BsChevronRight /></li>
                <li className='flex justify-start items-center'>
                  <Link href={`/admin/campaign-managed/voucher/${id}`} className='font-semibold'>
                    Voucher List</Link>
                </li>
              </ul>
          </div>
        </section>
        
        <VoucherList id={id} />
    </>
  )
}
