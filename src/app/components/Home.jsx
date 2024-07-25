"use client"
import { BsArrowRight } from 'react-icons/bs'

import Link from 'next/link';



export default function Home() {
  return (
    <>
        {/* BANNER */}
        <section className='w-[100%] lg:h-[40rem] h-auto flex lg:flex-row flex-col items-center justify-start'>
            <div className='lg:w-[50%] w-[100%] py-[1.6rem] lg:py-0 h-[100%] flex items-center justify-start'>
                <div className='pl-[7%]'>
                    <h1 className='mb-[1.2rem] lg:text-6xl text-5xl leading-[4rem] font-extrabold'>
                        Unlock the Magic of Loyalty Rewards!</h1>
                    <p className='text-xl mb-[1.2rem] leading-[2rem] pr-[10%]'>
                        Use our intuitive and user-friendly campaign builder to launch today. 
                        Simply follow the step-by-step process to set up your campaign, define 
                        the rules, and determine the rewards or incentives you wish to offer.
                    </p>
                    <div className='flex'>
                        <Link href='/register'
                            className='group text-xl flex items-center justify-center gap-2 border rounded-2xl px-12 py-5 bg-[#6c0868] hover:bg-gradient-to-br hover:from-[#6c0868] hover:to-[#570253] text-white '>
                            Register
                            <BsArrowRight className='transition ease-in-out duration-300 group-hover:translate-x-1' />
                        </Link>
                    </div>
                </div>
            </div>
            <div className='lg:w-[50%] w-[100%] h-[100%] flex items-center justify-start'>
                <div className='w-[100%] h-[100%] flex justify-end'>
                    <img src='./assets/img/hero.png' className='object-fill' />
                </div>
            </div>
        </section>
        
        {/* <CampaignSlider /> */}
        
        {/* DESCRIPTION */}
        <section className='w-[100%] lg:h-[30rem] h-auto flex lg:flex-row flex-col items-center justify-start py-[4rem]'>
            <div className='lg:w-[50%] w-[100%] h-[100%] flex items-center justify-start'>
                <div className='w-[100%] h-[100%] flex justify-center'>
                    <img src='./assets/img/round.png' className='object-fit' />
                </div>
            </div>
            <div className='lg:w-[50%] w-[100%] py-[1.6rem] lg:py-0 h-[100%] flex items-center justify-start'>
                <div className='lg:pr-[20%] lg:px-0 px-[1rem]'>
                    <h1 className='mb-[1.2rem] lg:text-5xl text-5xl leading-[4rem] font-extrabold'>
                        SEE HOW WE CAN HELP YOU PROGRESS</h1>
                    <p className='text-xl mb-[1.2rem] leading-[2rem]  lg:pr-[20%]'>
                        Free yourself (and your customers) from shoppers’ cards and vendor tie-in. 
                        Run online using a PC, tablet or mobile phone, freeing you to focus on promoting 
                        your campaign while we handle all the technical functions. Shoppers redeem, track 
                        their progress and claim rewards on their mobile phones.
                    </p>

                </div>
            </div>   
        </section>


    </>
  )
}
