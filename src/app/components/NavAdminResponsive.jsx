"use client"
import React, { useState } from 'react'
import { IoChevronDownSharp } from "react-icons/io5"; 
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import axiosClientAPI from '@/api/axiosClientAPI';
import { GiHamburgerMenu } from 'react-icons/gi';
import { GrClose } from 'react-icons/gr';
import { useRouter } from 'next/navigation';
import { tokenAuth } from '@/token/tokenAuth';
import { tokenRole } from '@/token/tokenRole';
import { removeAuthCookie } from '@/cookie/authCookieClient';
import { removeRoleCookie } from '@/cookie/roleCookieClient';



function NavAdminResponsive() {
    const router = useRouter();
    const [isActive, setIsActive] = useState({
        one: false,
        two: false,
        three: false,
        four: false,
        five: false,
        six: false,
        seven: false,
        eight: false,
    });
    const [isOpen, setIsOpen] = useState(false);
    const {getAuthToken, removeAuthToken} = tokenAuth();
    const { removeRoleToken } = tokenRole();
    const config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${getAuthToken()}`
      }}

    /* LOGOUT */
    async function postLogout() {
        try{
        const result = await axiosClientAPI.get(`logout`, config)
            .then((response) => {
                removeAuthToken();
                removeRoleToken();
                removeAuthCookie();
                removeRoleCookie();
                router.push(`/login`) 
            
            })
        } catch (error) {
            console.error(`Error: ${error}`)
        } 
    } 


  return (
    <section className='w-[100%] lg:hidden bg-[#570253] text-white'>
        <div className="mx-auto w-[90%] py-4 flex items-center justify-end">
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
            <div className='mx-auto w-[100%] px-3 py-2 flex flex-col items-center justify-between'>
                <ul className="flex flex-col items-center justify-start gap-4">
                    {/* Settings */}
                    <li className="relative w-[100vw]"  
                            onClick={() => { setIsActive({one: !isActive.one}) }}>
                            <span className={`w-[100vw] py-2 ${isActive.one && 'bg-[#6c0868]'} cursor-pointer flex items-center justify-center gap-1 hover:text-slate-100`}>
                                Settings <IoChevronDownSharp />
                            </span>
                            { isActive.one && 
                                <AnimatePresence>
                                    <motion.ul 
                                        initial={{ opacity:1 }}
                                        animate={{ opacity:1 }}
                                        exit={{ opacity:1 }}
                                        transition={{ duration: 0.6, type:'spring' }}
                                        className="flex flex-col items-center justify-center w-[100vw] bg-[#570253] relative">
                                        <li className="px-[0.5rem] py-2 w-[100%] hover:bg-[#6c0868]">
                                            <Link 
                                                href='/admin/app-info' 
                                                className="text-center flex items-center justify-center w-[100%]" >
                                                AppInfo</Link>
                                        </li>
                                        <li className="px-[0.5rem] py-2 w-[100%] hover:bg-[#6c0868]">
                                            <Link 
                                                href='/admin/role' 
                                                className="text-center flex items-center justify-center w-[100%]">
                                                Roles</Link>
                                        </li>
                                        <li className="px-[0.5rem] py-2 w-[100%] hover:bg-[#6c0868]">
                                            <Link 
                                                href='/admin/price' 
                                                className="text-center flex items-center justify-center w-[100%]">
                                                Price</Link>
                                        </li>
                                        
                                    </motion.ul>
                                </AnimatePresence> 
                            }
                    </li>
                    {/* Users */}
                    <li className="relative w-[100vw]"
                        onClick={() => { setIsActive({two: !isActive.two}) }}>
                        <span className={`w-[100vw] py-2 ${isActive.two && 'bg-[#6c0868]'} cursor-pointer flex items-center justify-center gap-1 hover:text-slate-100`}>
                            Users <IoChevronDownSharp />
                        </span>
                        { isActive.two && 
                            <AnimatePresence>
                                <motion.ul 
                                    initial={{ opacity:1 }}
                                    animate={{ opacity:1 }}
                                    exit={{ opacity:1 }}
                                    transition={{ duration: 0.6, type:'spring' }}
                                    className="flex flex-col items-center justify-center w-[100vw] bg-[#570253] relative">
                                    <li className="px-[0.5rem] py-2 w-[100%] hover:bg-[#6c0868]">
                                        <Link href='/admin/user/add' className="text-center flex items-center justify-center w-[100%]">
                                            Add User</Link>
                                    </li>     
                                    <li className="px-[0.5rem] py-2 w-[100%] hover:bg-[#6c0868]">
                                        <Link href='/admin/user' className="text-center flex items-center justify-center w-[100%]">
                                            User List</Link>
                                    </li>  
                                </motion.ul>
                            </AnimatePresence> 
                        }
                    </li>
                    {/* Users Roles */}
                    <li className="relative w-[100vw]"
                        onClick={() => { setIsActive({seven: !isActive.seven}) }}>
                        <span className={`w-[100vw] py-2 ${isActive.seven && 'bg-[#6c0868]'} cursor-pointer flex items-center justify-center gap-1 hover:text-slate-100`}>
                            User Roles<IoChevronDownSharp />
                        </span>
                        { isActive.seven && 
                            <AnimatePresence>
                                <motion.ul 
                                    initial={{ opacity:1 }}
                                    animate={{ opacity:1 }}
                                    exit={{ opacity:1 }}
                                    transition={{ duration: 0.6, type:'spring' }}
                                    className="flex flex-col items-center justify-center w-[100vw] bg-[#570253] relative">
                                    <li className="px-[0.5rem] py-2 w-[100%] hover:bg-[#6c0868]">
                                        <Link href='/admin/user-role/add' className="text-center flex items-center justify-center w-[100%]">
                                            Add User Role</Link>
                                    </li>     
                                    <li className="px-[0.5rem] py-2 w-[100%] hover:bg-[#6c0868]">
                                        <Link href='/admin/user-role' className="text-center flex items-center justify-center w-[100%]">
                                            User Roles List</Link>
                                    </li>  
                                </motion.ul>
                            </AnimatePresence> 
                        }
                    </li>
                    {/* Campaign */}
                    <li className="relative w-[100vw]"
                        onClick={() => { setIsActive({three: !isActive.three}) }}>
                        <span className={`w-[100vw] py-2 ${isActive.three && 'bg-[#6c0868]'} cursor-pointer flex items-center justify-center gap-1 hover:text-slate-100`}>
                            Campaign <IoChevronDownSharp />
                        </span>
                        { isActive.three && 
                            <AnimatePresence>
                                <motion.ul 
                                    initial={{ opacity:1 }}
                                    animate={{ opacity:1 }}
                                    exit={{ opacity:1 }}
                                    transition={{ duration: 0.6, type:'spring' }}
                                    className="flex flex-col items-center justify-center w-[100vw] bg-[#570253] relative">
                                    <li className="px-[0.5rem] py-2 w-[100%] hover:bg-[#6c0868]">
                                        <Link href='/admin/campaign' className="text-center flex items-center justify-center w-[100%]">
                                            Campaign List</Link>
                                    </li> 
                                </motion.ul>
                            </AnimatePresence> 
                        }
                    </li>
                    {/* Managed Campaign */}
                    <li className="relative w-[100vw]"
                        onClick={() => { setIsActive({four: !isActive.four}) }}>
                        <span className={`w-[100vw] py-2 ${isActive.four && 'bg-[#6c0868]'} cursor-pointer flex items-center justify-center gap-1 hover:text-slate-100`}>
                            Managed Campaign <IoChevronDownSharp />
                        </span>
                        { isActive.four && 
                            <AnimatePresence>
                                <motion.ul 
                                    initial={{ opacity:1 }}
                                    animate={{ opacity:1 }}
                                    exit={{ opacity:1 }}
                                    transition={{ duration: 0.6, type:'spring' }}
                                    className="flex flex-col items-center justify-center w-[100vw] bg-[#570253] relative">
                                    <li className="px-[0.5rem] py-2 w-[100%] hover:bg-[#6c0868]">
                                        <Link href='/admin/campaign-managed/add' className="text-center flex items-center justify-center w-[100%]">
                                        Add Managed Campaign</Link>
                                    </li>
                                    <li className="px-[0.5rem] py-2 w-[100%] hover:bg-[#6c0868]">
                                        <Link href='/admin/campaign-managed' className="text-center flex items-center justify-center w-[100%]">
                                        Managed Campaign List</Link>
                                    </li>   
                                </motion.ul>
                            </AnimatePresence> 
                        }
                    </li>
                   
                </ul>
            {/* Profile */}
            <div className='py-2'>
                <div className="relative"
                    onClick={() => { setIsActive({five: !isActive.five}) }}>
                    <span className={`w-[100vw] py-2 ${isActive.five && 'bg-[#6c0868]'} cursor-pointer flex items-center justify-center gap-1 hover:text-slate-100`}>
                        Profile <IoChevronDownSharp />
                    </span>
                    { isActive.five && 
                        <AnimatePresence>
                            <motion.ul 
                                initial={{ opacity:1 }}
                                animate={{ opacity:1 }}
                                exit={{ opacity:1 }}
                                transition={{ duration: 0.6, type:'spring' }}
                                className="flex flex-col items-center justify-center w-[100vw] bg-[#570253] relative">
                                <li className="px-[0.5rem] py-2 w-[100%] hover:bg-[#6c0868]">
                                    <Link href='/admin/profile' className="text-center flex items-center justify-center w-[100%]">
                                        Profile</Link>
                                </li>
                                <li className="px-[0.5rem] py-2 w-[100%] hover:bg-[#6c0868]">
                                    <Link href='/admin/password' className="text-center flex items-center justify-center w-[100%]">
                                        Set Password</Link>
                                </li>       
                                {getAuthToken() ? 
                                    <li className="px-[0.5rem] py-2 w-[100%] hover:bg-[#6c0868]">
                                        <button 
                                            onClick={() => postLogout() }
                                            className="text-center flex items-center justify-center w-[100%]">
                                                Logout
                                        </button>
                                    </li>      
                                :
                                    <li className="px-[0.5rem] py-2 w-[100%] hover:bg-[#6c0868]">
                                        <Link href='/login' className="text-center flex items-center justify-center w-[100%]">
                                            Login</Link>
                                    </li>   
                                }  
                            </motion.ul>
                        </AnimatePresence> 
                    }
                </div>
            </div>
            </div>
        }
    </section>
  )
}

export default NavAdminResponsive