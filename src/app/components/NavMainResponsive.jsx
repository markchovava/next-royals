"use client"
import axiosClientAPI from '@/api/axiosClientAPI';
import { tokenAuth } from '@/token/tokenAuth';
import { tokenRole } from '@/token/tokenRole';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { GiHamburgerMenu } from "react-icons/gi";
import { GrClose } from "react-icons/gr";
import { IoChevronDownSharp } from 'react-icons/io5';



export default function NavMainResponsive() {
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);
    const { getAuthToken, removeAuthToken } = tokenAuth();
    const { removeRoleToken } = tokenRole();
    const [isActive, setIsActive] = useState({
      one:false
    })
    const [isLogout, setIsLogout] = useState(false)
 
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getAuthToken()}`
      }
    };

    async function getData() {
        try{
          const result = await axiosClientAPI.get(`logout`, config)
            .then((response) => {
              removeAuthToken();
              removeRoleToken();
              removeIdToken();
              router.push('/login');
              setIsLogout(false);
            })
          } catch (error) {
            console.error(`Error: ${error}`);
            setIsLogout(false);
          }   
    }

    useEffect(() => {
        isLogout === true && getData();
    }, [isLogout]);


  return (
    <div className='lg:hidden flex flex-col w-[100%]'>
      <div className="mx-auto w-[90%] py-2 flex items-center justify-end">
        { isOpen === false ?
                <GiHamburgerMenu
                    onClick={() => setIsOpen(true)} 
                    className='text-white text-xl' />
                :
                <GrClose 
                    onClick={() => setIsOpen(false)} 
                    className='text-white text-xl' />
        }
      </div>
      {isOpen && 
        <ul className="flex lg:flex-row flex-col items-center justify-start gap-4 font-semibold tracking-wider">
            <li><Link href='/' className="flex items-center justify-center gap-1 hover:border-b border-slate-300 hover:text-slate-100 py-3 transition-all ease-in duration-100">
                HOME</Link></li>
            <li><Link href='/about' className="flex items-center justify-center gap-1 hover:border-b border-slate-300 hover:text-slate-100 py-3 transition-all ease-in duration-100">
                ABOUT US</Link></li>
            
                <li className=''>
                    <span 
                        onClick={() => setIsActive({one: !isActive.one})} 
                        className=" mx-auto cursor-pointer flex items-center justify-center gap-1 hover:border-b border-slate-300 hover:text-slate-100 py-3 transition-all ease-in duration-100">
                        CAMPAIGNS <IoChevronDownSharp />
                    </span>
                    {isActive.one &&
                        <AnimatePresence>
                            <motion.ul 
                                initial={{ opacity:1 }}
                                animate={{ opacity:1 }}
                                exit={{ opacity:1 }}
                                transition={{ duration: 0.6, type:'spring' }}
                                className="relative w-[100wv] bg-[#570253]">
                                {getAuthToken() &&
                                    <li className="w-[100%] text-center pb-3 pt-1 hover:bg-[#6c0868]">
                                        <Link href='/campaign-program' className=" w-[100%] h-[100%]">MY CAMPAIGNS</Link>
                                    </li>
                                }
                                <li className="w-[100%] text-center px-[0.5rem] py-1 hover:bg-[#6c0868]">
                                    <Link href='/campaign' className=" w-[100%] h-[100%]">
                                        ALL CAMPAIGNS</Link>
                                </li>
                                <li className="w-[100%] text-center px-[0.5rem] py-1 hover:bg-[#6c0868]">
                                    <Link href='/voucher-redeem' className=" w-[100%]">REDEEM VOUCHERS</Link>
                                </li>
                                <li className="w-[100%] text-center px-[0.5rem] py-1 hover:bg-[#6c0868]">
                                    <Link href='/voucher-reward' className=" w-[100%]">REDEEM REWARD</Link>
                                </li>
                               
                                
                            </motion.ul>
                        </AnimatePresence>
                    }

                </li>
            
            <li><Link href='/contact' className="flex items-center justify-center gap-1 hover:border-b border-slate-300 hover:text-slate-100 py-3 transition-all ease-in duration-100">
                CONTACT US</Link></li>
            
            { getAuthToken() ?
                <li className='my-[1rem]'>
                  <button 
                    onClick={() => setIsLogout(true)} 
                    className='border border-white py-[0.8rem] px-[1.8rem] rounded-lg transition-all ease-linear hover:bg-white hover:text-[#50014c]'>
                    Login
                  </button>
                </li>
              :
              <>
                <li className='my-[1rem]'>
                  <Link href='/login' className='border border-white py-[0.8rem] px-[1.8rem] rounded-lg transition-all ease-linear hover:bg-white hover:text-[#50014c]'>
                    Login
                  </Link>
                </li>
                <li className='my-[1rem]'>
                  <Link href='/register' className='border py-[0.8rem] px-[1.8rem] rounded-lg transition-all ease-linear bg-white text-[#50014c] hover:border-white hover:text-white hover:bg-[#50014c]'>
                    Register
                  </Link>
                </li>
              </>
            }
              
        </ul>
      }
    </div>
  )
}
