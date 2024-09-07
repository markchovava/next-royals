"use client"
import React, { useState } from 'react'
import { IoChevronDownSharp } from "react-icons/io5"; 
import { FaUser } from "react-icons/fa";
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import NavAdminResponsive from './NavAdminResponsive';
import axiosClientAPI from '@/api/axiosClientAPI';
import { useRouter } from 'next/navigation';
import { tokenAuth } from '@/token/tokenAuth';
import { tokenRole } from '@/token/tokenRole';
import { removeAuthCookie } from '@/cookie/authCookieClient';
import { removeRoleCookie } from '@/cookie/roleCookieClient';



export default function NavAdmin() {
    const router = useRouter();
    const [isActive, setIsActive] = useState({
        one:false,
        two:false,
        three: false,
        four: false,
        five: false,
        six: false,
        seven: false,
    });
    const {getAuthToken, removeAuthToken} = tokenAuth();
    const { getRoleToken, removeRoleToken } = tokenRole();

    const config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${getAuthToken()}`
    }};

    /* LOGOUT */
    async function postLogout() {

        try{
        const result = await axiosClientAPI.get(`logout/`, config)
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
    <>
        <section className='hidden lg:block w-[100%] bg-[#570253] text-white'>
            <div className='mx-auto w-[90%] py-2 flex items-center justify-between '>
                <div className="w-[60%]">
                    <ul className="flex items-center justify-start gap-4">
                        {/* Settings */}
                        <li className="relative"
                            onMouseEnter={() => setIsActive({one: true})}
                            onMouseLeave={() => setIsActive({one: false})}
                            onClick={() => { setIsActive({one: !isActive.one}) }}>
                            <span className="cursor-pointer flex items-center justify-start gap-1 hover:text-blue-100">
                                Settings <IoChevronDownSharp />
                            </span>
                            { isActive.one && 
                                <AnimatePresence>
                                    <motion.ul 
                                        initial={{ opacity:1 }}
                                        animate={{ opacity:1 }}
                                        exit={{ opacity:1 }}
                                        transition={{ duration: 0.6, type:'spring' }}
                                        className="top-[105%] left-[-0.5rem] w-[160%] bg-[#570253] absolute z-10">
                                        <li className="px-[0.5rem] py-1 hover:bg-[#6c0868]">
                                            <Link href='/admin/app-info' className=" w-[100%]">AppInfo</Link>
                                        </li>
                                    
                                        <li className="px-[0.5rem] py-1 hover:bg-[#6c0868]">
                                            <Link href='/admin/role' className=" w-[100%] h-[100%]">
                                                Roles</Link>
                                        </li>
                                    
                                        <li className="px-[0.5rem] py-1 hover:bg-[#6c0868]">
                                            <Link href='/admin/price' className=" w-[100%] h-[100%]">Price</Link>
                                        </li>
                                        
                                    </motion.ul>
                                </AnimatePresence> 
                            }
                        </li>
                        
                        { getRoleToken() <= 2 &&
                            <>
                                {/* Users */}
                                <li className="relative"
                                    onMouseEnter={() => setIsActive({two: true})}
                                    onMouseLeave={() => setIsActive({two: false})}
                                    onClick={() => { setIsActive({two: !isActive.two}) }}>
                                    <span className="cursor-pointer flex items-center justify-start gap-1 hover:text-blue-100">
                                        Users <IoChevronDownSharp />
                                    </span>
                                    { isActive.two && 
                                        <AnimatePresence>
                                            <motion.ul 
                                                initial={{ opacity:1 }}
                                                animate={{ opacity:1 }}
                                                exit={{ opacity:1 }}
                                                transition={{ duration: 0.6, type:'spring' }}
                                                className="top-[105%] left-[-0.5rem] w-[160%] bg-[#570253] absolute z-10">
                                                <li className="px-[0.5rem] py-1 hover:bg-[#6c0868]">
                                                    <Link href='/admin/user/add' className=" w-[100%]">Add User</Link>
                                                </li>
                                            
                                                <li className="px-[0.5rem] py-1 hover:bg-[#6c0868]">
                                                    <Link href='/admin/user' className=" w-[100%] h-[100%]">
                                                        User List</Link>
                                                </li>
                                            
                                            </motion.ul>
                                        </AnimatePresence> 
                                    }
                                </li>

                                {/* User Roles */}
                                <li className="relative"
                                    onMouseEnter={() => setIsActive({seven: true})}
                                    onMouseLeave={() => setIsActive({seven: false})}
                                    onClick={() => { setIsActive({seven: !isActive.seven}) }}>
                                    <span className="cursor-pointer flex items-center justify-start gap-1 hover:text-blue-100">
                                        User Roles <IoChevronDownSharp />
                                    </span>
                                    { isActive.seven && 
                                        <AnimatePresence>
                                            <motion.ul 
                                                initial={{ opacity:1 }}
                                                animate={{ opacity:1 }}
                                                exit={{ opacity:1 }}
                                                transition={{ duration: 0.6, type:'spring' }}
                                                className="top-[105%] left-[-0.5rem] w-[160%] bg-[#570253] absolute z-10">
                                                <li className="px-[0.5rem] py-1 hover:bg-[#6c0868]">
                                                    <Link href='/admin/user-role/add' className=" w-[100%]">Add User Role</Link>
                                                </li>
                                            
                                                <li className="px-[0.5rem] py-1 hover:bg-[#6c0868]">
                                                    <Link href='/admin/user-role' className=" w-[100%] h-[100%]">
                                                    User Role List</Link>
                                                </li>
                                            
                                            </motion.ul>
                                        </AnimatePresence> 
                                    }
                                </li>
                            </>
                        }
                        
                        {getRoleToken() <= 1 && 
                            <>
                                {/* Campaign */}
                                <li className="relative"
                                    onMouseEnter={() => setIsActive({three: true})}
                                    onMouseLeave={() => setIsActive({three: false})}
                                    onClick={() => { setIsActive({three: !isActive.three}) }}>
                                    <span className="cursor-pointer flex items-center justify-start gap-1 hover:text-blue-100">
                                        Campaign <IoChevronDownSharp />
                                    </span>
                                    { isActive.three && 
                                        <AnimatePresence>
                                            <motion.ul 
                                                initial={{ opacity:1 }}
                                                animate={{ opacity:1 }}
                                                exit={{ opacity:1 }}
                                                transition={{ duration: 0.6, type:'spring' }}
                                                className="top-[105%] left-[-0.5rem] w-[160%] bg-[#570253] absolute z-10">
                                                <li className="px-[0.5rem] py-1 hover:bg-[#6c0868]">
                                                    <Link href='/admin/campaign/' className=" w-[100%]">Campaign List</Link>
                                                </li>

                                            </motion.ul>
                                        </AnimatePresence> 
                                    }
                                </li>
                                
                                {/* Managed Campaign */}
                                <li className="relative"
                                    onMouseEnter={() => setIsActive({four: true})}
                                    onMouseLeave={() => setIsActive({four: false})}
                                    onClick={() => { setIsActive({four: !isActive.four}) }}>
                                    <span className="cursor-pointer flex items-center justify-start gap-1 hover:text-blue-100">
                                    Managed Campaign <IoChevronDownSharp />
                                    </span>
                                    { isActive.four && 
                                        <AnimatePresence>
                                            <motion.ul 
                                                initial={{ opacity:1 }}
                                                animate={{ opacity:1 }}
                                                exit={{ opacity:1 }}
                                                transition={{ duration: 0.6, type:'spring' }}
                                                className="top-[100%] left-[-0.5rem] w-[130%] bg-[#570253] absolute z-10">
                                                <li className="px-[0.5rem] py-1 hover:bg-[#6c0868]">
                                                    <Link href='/admin/campaign-managed/add' className=" w-[100%]">
                                                    Add Managed Campaign</Link>
                                                </li>
                                                <li className="px-[0.5rem] py-1 hover:bg-[#6c0868]">
                                                    <Link href='/admin/campaign-managed' className=" w-[100%]">
                                                    Managed Campaign List</Link>
                                                </li>    
                                            
                                            </motion.ul>
                                        </AnimatePresence> 
                                    }
                                </li>
                            </>
                        }
                        
                        

                    </ul>
                </div>
                <div className="relative"
                     onMouseEnter={() => setIsActive({six: true})}
                     onMouseLeave={() => setIsActive({six: false})}
                    onClick={() => { setIsActive({six: !isActive.six}) }}>
                    <span className="cursor-pointer flex items-center justify-start gap-1 hover:text-slate-100">
                        <FaUser />
                        Profile 
                        <IoChevronDownSharp /></span>
                        { isActive.six && 
                            <AnimatePresence>
                                <motion.ul 
                                    initial={{ opacity:1 }}
                                    animate={{ opacity:1 }}
                                    exit={{ opacity:1 }}
                                    transition={{ duration: 0.6, type:'spring' }}
                                    className="top-[105%] left-[-0.5rem] w-[160%] bg-[#570253] absolute z-10">
                                    <li className="px-[0.5rem] py-1 hover:bg-[#6c0868]">
                                        <Link href='/admin/profile' className=" w-[100%]">Profile</Link>
                                    </li>
                                    <li className="px-[0.5rem] py-1 hover:bg-[#6c0868]">
                                        <Link href='/admin/profile/password' className=" w-[100%]">Set Password</Link></li>
                                    {getAuthToken() ? 
                                        <li className="px-[0.5rem] py-1 hover:bg-[#6c0868]">
                                            <button 
                                                onClick={() => postLogout() }
                                                className="text-left w-[100%]">
                                                    Logout
                                            </button>
                                        </li>
                                    :
                                        <li className="px-[0.5rem] py-1 hover:bg-[#6c0868]">
                                            <Link href='/login' className=" w-[100%]">Login</Link>
                                        </li>
                                    }
                                    
                                </motion.ul>
                            </AnimatePresence> 
                        }            
                </div>  
            </div>
        </section>
        <NavAdminResponsive />
    </>
  )
}
