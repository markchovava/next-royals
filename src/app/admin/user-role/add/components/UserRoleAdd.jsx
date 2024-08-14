"use client"
import axiosClientAPI from "@/api/axiosClientAPI";
import { tokenAuth } from "@/token/tokenAuth";
import { darkBounce } from "@/utils/toastify";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { BsArrowRight } from "react-icons/bs";
import { Bounce, toast } from "react-toastify";
import { IoSearchOutline } from "react-icons/io5";
import { GoDotFill } from "react-icons/go";


export default function UserRoleAdd() {
  const router = useRouter();
  const { getAuthToken } = tokenAuth()
  const [data, setData] = useState({});
  const [user, setUser] = useState();
  const [roles, setRoles] = useState({});
  const [isSearch, setIsSearch] = useState();
  const [search, setSearch] = useState('');
  const [isSubmit, setIsSubmit] = useState(false);
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getAuthToken()}`
  }}

  const handleInput = (e) => {
    setData({...data, [e.target.name]: e.target.value})
  }

    /* GET DATA */
    async function getRoles() {
    try{
      const result = await axiosClientAPI.get(`role-all`, config)
        .then((response) => {
          setRoles(response.data.data);
        })
      } catch (error) {
        console.error(`Error: ${error}`)
      }   
    } 

    async function searchData() {
        try{
          const result = await axiosClientAPI.get(`user-by-email?email=${search}`, config)
            .then((response) => {
              console.log(response.data.data);
              setUser(response.data.data);
              setIsSearch(false);
            })
          } catch (error) {
            console.error(`Error: ${error}`)
            setIsSearch(false);
          }   
    } 

     /* POST DATA */
     async function postData() {
        const formData = {
        user_id: Number(data?.user?.id),
        role_level: Number(data?.role_level),
        }
        console.log(formData);
        setIsSubmit(false);
        try{
        const result = await axiosClientAPI.post(`user-author-role`, formData, config)
            .then((response) => {
            if(response.data.status == 1){
                const message = response.data?.message;
                toast.success(message, darkBounce);
                router.push('/admin/user-role')
                setIsSubmit(false);
                return;
            }
            setIsSubmit(false);
            })
        } catch (error) {
            console.error(`Error: ${error}`);
            setIsSubmit(false);
        } 
    }  



  useEffect(() => { getRoles(); }, []);

  useEffect(() => {
    isSearch == true & searchData();
  }, [isSearch])

  useEffect(() => { 
    isSubmit && postData();
  }, [isSubmit]);

  return (
    <div>
      <div className="w-[100%] flex items-center justify-center flex-col">
          <h1 className="leading-none pt-[1.5rem] pb-[1.5rem] text-center font-black text-[4rem]">
              Add User Role</h1>
          <hr className="border-t-4 border-black w-[10%] pb-[3.5rem]" />
      </div> 

      <section className="mx-auto lg:w-[80%] w-[90%]">
        <div className="w-[100%] mb-[2rem]">
            <h6 className='font-semibold pb-1'>Email:</h6>
            <section className="relative">
                <div className="flex items-center justify-start">
                    <input 
                        type="email" 
                        name="search" 
                        onChange={(e) => {
                            setSearch(e.target.value);
                            setIsSearch(true);
                        }}
                        placeholder="Enter Email here..." 
                        className="w-[90%] rounded-l-xl px-[1rem] py-[1rem] outline-none border-l border-y border-slate-300" />
                    <button
                    onClick={() => setIsSearch(true)}
                    className="w-[10%] flex items-center justify-center px-[1rem] py-[1rem] rounded-r-xl border border-slate-300 hover:border-[#6c0868] hover:text-[#6c0868]">
                        { isSearch == true
                            ? <GoDotFill className="text-2xl animate-pulse" />
                            : <IoSearchOutline className="text-2xl " />
                        }
                    </button>
                </div>
                {user &&
                <div className="w-[100%] absolute z-20 bg-gray-50 drop-shadow-md rounded-b-lg">
                    <ul className="p-[1rem]">
                        {user.map((i, key) => (
                            <li key={key} onClick={() => {
                                setData({user: i})
                                setUser();
                            }
                            } 
                                className="cursor-pointer px-3 pt-2 pb-2 border-b border-slate-200 hover:bg-gray-100 transition-all ease-in-out">
                                {i.email}
                            </li>

                        ))}
                    </ul>
                </div>
                }
            </section>  
        </div>
        {/* USER */}
        {data?.user &&
            <div className="w-[100%] mb-[2rem] flex items-center justify-center">
                <h6 className="text-xl">
                    {data?.user?.name && 'Name: ' + data?.user?.name}
                    {data?.user?.email && ' | Email: ' + data?.user?.email}
                </h6>
            </div>
        }
        {roles.length > 0 &&
            <div className="w-[100%] mb-[2rem]">
                <h6 className='font-semibold pb-1'>Role:</h6>
                <select
                    type="text" 
                    name="role_level" 
                    onChange={handleInput}
                    placeholder="Write your Phone here..." 
                    className="w-[100%] rounded-xl px-[1rem] py-[1rem] outline-none border border-slate-300">
                    <option value=''>Select an option.</option>
                    {roles.map((i, key) => (
                        <option key={key} value={i.level}>{i.name}</option>
                    ))}
                </select>
            </div>
        }
        <div className="w-[100%] mb-[2rem] flex items-center justify-center gap-4">
              <button 
                  onClick={ () => {
                    setIsSubmit(true) 
                  }}
                  className='lg:w-[20%] group transition ease-in-out duration-200  flex items-center justify-center gap-1 rounded-xl py-[1rem] px-[2.5rem] bg-gradient-to-br from-[#6c0868] to-[#50014c] text-white hover:bg-gradient-to-br  hover:from-[#50014c] hover:to-[#6c0868]'>
                  {isSubmit === true ? 'Processing' : 
                    <>
                      Submit <BsArrowRight className='transition ease-in-out duration-200 group-hover:translate-x-1' />
                    </>}
              
              </button>
        </div>
      </section>
    
    </div>
  )
}
