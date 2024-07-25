import Link from 'next/link'
import React from 'react'
import { BsChevronRight } from 'react-icons/bs'
import VoucherRewardView from './components/VoucherRewardView'




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
                  <Link href={`/campaign/voucher-reward/${id}`} className='font-semibold'>
                    Reward Voucher List</Link>
                </li>
                <li><BsChevronRight /></li>
                <li className='flex justify-start items-center'>
                  <Link href={`/campaign/voucher-reward/view/${id}`} className='font-semibold'>
                    View Reward Voucher</Link>
                </li>
              </ul>
          </div>
        </section>

        <VoucherRewardView id={id} />

    </>
  )
}
