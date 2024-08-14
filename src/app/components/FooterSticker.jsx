"use client";
import Link from 'next/link';
import React from 'react'
import { MdManageAccounts } from "react-icons/md";
import { IoQrCodeOutline } from "react-icons/io5";
import { IoMdQrScanner } from "react-icons/io";
import { FaHome } from "react-icons/fa";
import { tokenAuth } from '@/token/tokenAuth';
import { tokenRole } from '@/token/tokenRole';



export default function FooterSticker() {
    const { getAuthToken } = tokenAuth();
    const { getRoleToken } = tokenRole();


  return (
    <>
    {getAuthToken() &&
        <div className="fixed bottom-[5%] left-[50%] right-[50%] z-20">
            <div className="flex items-center justify-center gap-2">
                <Link href={`/`} className='p-[0.6rem] rounded-lg border border-slate-50 bg-slate-50 drop-shadow-md'>
                    <FaHome className="text-[3rem] text-slate-500 drop-shadow-lg hover:scale-110 transition-all ease-in-out" />
                </Link>
                { getRoleToken() <= 3 &&
                <>
                    <Link 
                        href={`/voucher-reward`} 
                        className='p-[0.6rem] rounded-lg border border-slate-50 bg-slate-50 drop-shadow-md'>
                        <IoMdQrScanner className="text-[3rem] text-slate-500 drop-shadow-lg hover:scale-110 transition-all ease-in-out" />
                    </Link>
                    <Link 
                        href={`/voucher-issue`} 
                        className='p-[0.6rem] rounded-lg border border-slate-50 bg-slate-50 drop-shadow-md'>
                        <IoQrCodeOutline className="text-[3rem] text-slate-500 drop-shadow-lg hover:scale-110 transition-all ease-in-out" />
                    </Link>
                </>
                }
                <Link 
                    href={`/campaign-managed`} 
                    className='p-[0.6rem] rounded-lg border border-slate-50 bg-slate-50 drop-shadow-md'>
                    <MdManageAccounts className="text-[3rem] text-slate-500 drop-shadow-lg hover:scale-110 transition-all ease-in-out" />
                </Link>
            </div>
        </div>
    }
    </>
  )
}
