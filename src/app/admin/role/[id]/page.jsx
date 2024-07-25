import Link from "next/link";
import { BsChevronRight } from 'react-icons/bs';
import RoleView from "./components/RoleView";




export default function page({ params: {id}}) {

  return (
    <div>
        {/* BREADCRUMBS */}
        <section className='w-[100%] bg-slate-100 text-black'>
          <div className='mx-auto w-[90%]'>
              <ul className='py-2 flex items-center justify-start gap-2'>
                <li className='flex gap-1 justify-start items-center'>
                  <Link href='' className='flex justify-start items-center'>
                    Home</Link> 
                </li>
                <li><BsChevronRight /></li>
                <li className='flex justify-start items-center'>
                  <Link href='/admin/role'>
                    Role List</Link>
                </li>
                <li><BsChevronRight /></li>
                <li className='flex justify-start items-center'>
                  <Link href={`/admin/role/${id}`} className='font-semibold'>
                    View Role</Link>
                </li>
              </ul>
          </div>
        </section>
        
        <RoleView id={id} />

    </div>
  )
}
