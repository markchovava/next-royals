"use client";
import { tokenRole } from '@/token/tokenRole';
import { tokenAuth } from '@/token/tokenAuth';
import NavAdmin from './NavAdmin'
import NavMain from './NavMain'



export default function Header() {
  const { getRoleToken } = tokenRole();
  const { getAuthToken } = tokenAuth();
  

  return (
    <> 
    {getAuthToken() &&
      <NavAdmin />
    }
      <NavMain />
    </>
  )
}
