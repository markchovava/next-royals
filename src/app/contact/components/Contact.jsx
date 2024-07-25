"use client";
import { BsArrowRight, BsChevronRight } from 'react-icons/bs';



export default function ContactView() {
  return (
    <>
        {/* Title */}
        <div className="w-[100%] flex items-center justify-center flex-col">
            <h1 className="leading-none pt-[1.8rem] pb-[1.5rem] text-center font-black text-[4rem]">
              Contact Us</h1>
              <hr className="border-t-4 border-black lg:w-[15%] w-[30%] pb-[3.5rem]" />
        </div>

        <section className='w-[100%] h-auto pb-[4rem]'>
            <div className='mx-auto lg:w-[70%] w-[90%]'>
            {/* NAME */}
            <div className='mb-4'>
                <p className='font-semibold pb-2'>Name:</p>
                <input type='text' className='w-[100%] rounded-xl outline-none border border-purple-300 px-3 py-4' />
            </div>
            {/* EMAIL */}
            <div className='mb-4'>
                <p className='font-semibold pb-2'>Email:</p>
                <input type='text' className='w-[100%] rounded-xl outline-none border border-purple-300 px-3 py-4' />
            </div>
            {/* PHONE */}
            <div className='mb-4'>
                <p className='font-semibold pb-2'>Phone Number:</p>
                <input type='text' className='w-[100%] rounded-xl outline-none border border-purple-300 px-3 py-4' />
            </div>
            {/* MESSAGE */}
            <div className='mb-4'>
                <p className='font-semibold pb-2'>Message:</p>
                <textarea className='w-[100%] h-[8rem] rounded-xl outline-none border border-purple-300 px-3 py-4'></textarea>
            </div>
            <div className='mb-4 flex justify-center items-center'>
                <button
                className='group text-xl flex items-center justify-center gap-2 border rounded-2xl px-12 py-5 bg-[#6c0868] hover:bg-gradient-to-br hover:from-[#6c0868] hover:to-[#570253] text-white '>
                Submit
                <BsArrowRight className='transition ease-in-out duration-300 group-hover:translate-x-1' />
                </button>
            </div>
            </div>
        </section>
    </>
  )
}
