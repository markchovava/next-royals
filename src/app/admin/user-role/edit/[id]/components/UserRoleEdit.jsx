"use client"
import axiosClientAPI from "@/api/axiosClientAPI";
import Loader from "@/app/components/Loader";
import { tokenAuth } from "@/token/tokenAuth";
import { darkBounce } from "@/utils/toastify";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { BsArrowRight } from "react-icons/bs";
import { Bounce, toast } from "react-toastify";



export default function UserRoleEdit({id}) {
  const router = useRouter();
  const { getAuthToken } = tokenAuth()
  const [data, setData] = useState();
  const [user, setUser] = useState();
  const [roles, setRoles] = useState({});
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

    async function getUser() {
        try{
          const result = await axiosClientAPI.get(`user/${id}`, config)
            .then((response) => {
              console.log(response.data.data);
              setUser(response.data.data);
            })
          } catch (error) {
            console.error(`Error: ${error}`)
          }   
    } 

     /* POST DATA */
     async function postData() {
        const formData = {
        user_id: id,
        role_level: Number(data?.role_level),
        }
        try{
        const result = await axiosClientAPI.post(`user-author-role/${id}`, formData, config)
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



  useEffect(() => { 
    getRoles(); 
    getUser();
  }, []);


  useEffect(() => { 
    isSubmit && postData();
  }, [isSubmit]);

  if(!user) { return (<Loader />) }

  return (
    <div>
      <div className="w-[100%] flex items-center justify-center flex-col">
          <h1 className="leading-none pt-[1.5rem] pb-[1.5rem] text-center font-black text-[4rem]">
              Edit User Role</h1>
          <hr className="border-t-4 border-black w-[10%] pb-[3.5rem]" />
      </div> 

      <section className="mx-auto lg:w-[80%] w-[90%]">
        {/* USER */}
        {user &&
            <div className="w-[100%] mb-[2rem] flex items-center justify-center">
                <h6 className="text-xl">
                    {user?.name && 'Name: ' + user?.name}
                    {user?.email && ' | Email: ' + user?.email}
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
                        <option key={key} value={i.level} selected={i.level == user?.role_level && 'selected'}>
                          {i.name}
                        </option>
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
                  {isSubmit === true 
                    ? 'Processing' : 
                    <>
                      Submit <BsArrowRight className='transition ease-in-out duration-200 group-hover:translate-x-1' />
                    </>}
              
              </button>
        </div>
      </section>
    
    </div>
  )
}
