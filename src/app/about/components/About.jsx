"use client";
import Link from 'next/link';
import { BsArrowRight } from 'react-icons/bs';



export default function About() {
  return (
    <>
    {/* BANNER */}
      <section className='w-[100%] lg:h-[40rem] h-auto flex lg:flex-row flex-col items-center justify-start'>
        <div className='lg:w-[50%] w-[100%] py-[1.6rem] lg:py-0 h-[100%] flex items-center justify-start'>
            <div className='lg:pl-[10%]'>
                <h1 className='mb-[1.2rem] lg:text-6xl text-5xl leading-[4rem] font-extrabold'>
                  About Us</h1>
                <p className='text-xl mb-[1.2rem] leading-[2rem] pr-[10%]'>
                  We are passionate about celebrating loyalty and creating rewarding experiences for our valued 
                  members. Our mission is simple yet powerful: to unlock the magic of loyalty rewards and elevate 
                  your shopping journey like never before. As a premier loyalty campaign and voucher website, we 
                  are committed to providing you with exclusive offers, exciting promotions, and incredible savings 
                  that make every interaction with us truly unforgettable.
                </p>
                <div className='flex'>
                    <Link href='/'
                        className='group text-xl flex items-center justify-center gap-2 border rounded-2xl px-12 py-5 bg-[#6c0868] hover:bg-gradient-to-br hover:from-[#6c0868] hover:to-[#570253] text-white '>
                        Home
                        <BsArrowRight className='transition ease-in-out duration-300 group-hover:translate-x-1' />
                    </Link>
                </div>
            </div>
        </div>
        <div className='lg:w-[50%] w-[100%] h-[100%] flex items-center justify-start'>
            <div className='w-[100%] h-[100%] flex justify-end'>
                <img src='./assets/img/about.png' className='object-fit' />
            </div>
        </div>
      </section>
    </>
  )
}
