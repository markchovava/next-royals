"use client"
import Link from "next/link";
import { MdPhoneIphone, MdOutlineMailOutline } from "react-icons/md";
import { FaFacebook, FaInstagramSquare, FaPhoneAlt } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaWhatsappSquare } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { FaAngleRight } from "react-icons/fa";
import { useState } from "react";





export default function Footer({ appInfoData }) {
    const {data, setData} = useState(appInfoData?.data);

    console.log('appInfoData')
    console.log(appInfoData?.data)
    

  return (
    <section className="w-[100%] h-auto bg-gradient-to-br from-[#6c0868] to-[#570253] text-white">
        <div className="w-[90%] mx-auto py-[4rem] flex lg:flex-row flex-col lg:gap-1 gap-4 items-start justify-between">
            <div className="lg:w-[40%] w-[100%] h-auto flex items-start justify-center flex-col gap-4">
                {/* <img src=''className="object-fill" alt="" /> */}
                <h1 className="leading-none font-black text-6xl py-3">Royals</h1>
                <ul className='flex items-center justify-start gap-3 text-2xl'>
                    <li><Link href='#' ><FaFacebook className="hover:scale-110 transition-all ease-in-out" /></Link></li>
                    <li><Link href='#'><FaSquareXTwitter className="hover:scale-110 transition-all ease-in-out" /></Link></li>
                    <li><Link href='#'><FaInstagramSquare className="hover:scale-110 transition-all ease-in-out" /></Link></li>
                    <li><Link href='#'><FaWhatsappSquare className="hover:scale-110 transition-all ease-in-out" /></Link></li>
                </ul> 
            </div>
            <div className="lg:w-[30%] w-[100%]">
                <h4 className="text-2xl font-extrabold mb-[1rem]">Navigation Links</h4>
                <ul className="text-sm pl-[1rem] flex flex-col justify-center items-start gap-2">
                    <li>
                        <Link href='/about' className="group flex items-center justify-start gap-2">
                            <FaAngleRight className='transition ease-in-out duration-200 group-hover:translate-x-1' />
                            About Us</Link>
                    </li>
                    <li>
                        <Link href='/about' className="group flex items-center justify-start gap-2">
                            <FaAngleRight className='transition ease-in-out duration-200 group-hover:translate-x-1' />
                            Campaigns
                        </Link>
                    </li>
                    <li>
                        <Link href='/about' className="group flex items-center justify-start gap-2">
                            <FaAngleRight className='transition ease-in-out duration-200 group-hover:translate-x-1' />
                            Rewards
                        </Link>
                    </li>
                    <li> 
                        <Link href='/project' className="group flex items-center justify-start gap-2">
                            <FaAngleRight className='transition ease-in-out duration-200 group-hover:translate-x-1' />
                            My Account</Link>
                    </li>
                    <li> 
                        <Link href='/contact' className="group flex items-center justify-start gap-2">
                            <FaAngleRight className='transition ease-in-out duration-200 group-hover:translate-x-1' />
                            Contact Us</Link>
                    </li>
                   
                        <>
                            <li> 
                                <Link href='/register' className="group flex items-center justify-start gap-2">
                                    <FaAngleRight className='transition ease-in-out duration-200 group-hover:translate-x-1' />
                                    Register</Link></li>
                         
                        </>
                    
                </ul>
            </div>
            <div className="lg:w-[30%] w-[100%]">
                <h4 className="text-2xl font-extrabold mb-[1rem]">Contact Details</h4>
                <ul className="pl-3 flex flex-col gap-4 text-sm">
                    <li className="flex items-start justify-start gap-3 ">
                        <FaLocationDot className="mt-1" />
                        <div>
                            <h6 className="font-bold">Address</h6>
                            {data?.address}
                        </div>
                    </li>
                    <li className="flex items-start justify-start gap-3 ">
                        <MdPhoneIphone className="mt-1"  />
                        <div>
                            <h6 className="font-bold">Phone Number</h6>
                            {data?.phone}
                        </div>
                        </li>
                    <li className="flex items-start justify-start gap-3 ">
                        <MdOutlineMailOutline className="mt-1" /> 
                        <div>
                            <h6 className="font-bold">Email</h6>
                            {data?.email}
                        </div>
                        </li>
                </ul>
            </div>
        </div>
        <div className="fixed bottom-[5%] right-[5%] z-20">
            <Link href={`#`}>
                <FaWhatsappSquare className="text-[4rem] text-green-600 border border-white drop-shadow-lg hover:scale-110 transition-all ease-in-out" />
            </Link>
        </div>
      
    </section>
  )
}
