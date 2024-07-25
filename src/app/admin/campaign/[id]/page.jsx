
import Link from 'next/link';
import { BsChevronRight } from 'react-icons/bs';
import CampaignView from './components/CampaignView';





export default function page({ params: {id} }) {


  return (
    <main>

      {/* BREADCRUMBS */}
      <section className='w-[100%] bg-slate-100 text-black'>
        <div className='mx-auto w-[90%]'>
            <ul className='py-2 flex items-center justify-start gap-2'>
              <li className='flex gap-1 justify-start items-center'>
                <Link href='/' className='flex justify-start items-center'>
                  Home</Link> 
              </li>
              <li><BsChevronRight /></li>
              <li className='flex justify-start items-center'>
                <Link href='/'>
                  Admin</Link>
              </li>
              <li><BsChevronRight /></li>
              <li className='flex justify-start items-center'>
                <Link href='/admin/campaign'>
                  Campaign List</Link>
              </li>
              <li><BsChevronRight /></li>
              <li className='flex justify-start items-center'>
                <Link href={`/campaign/${id}`} className='font-semibold'>
                  View Campaign</Link>
              </li>
            </ul>
        </div>
      </section>
        
      <CampaignView id={id} />

      
    </main>
  );
}
 