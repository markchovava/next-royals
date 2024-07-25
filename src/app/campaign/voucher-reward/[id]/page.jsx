import Link from 'next/link'
import React from 'react'
import { BsChevronRight } from 'react-icons/bs'
import VoucherRewardList from './components/VoucherRewardList'

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
              <Link href={`/voucher-reward/${id}`} className='font-semibold'>
                Reward Voucher List</Link>
            </li>
          </ul>
      </div>
    </section>
    

    <VoucherRewardList id={id} />

    </>
  )
}
