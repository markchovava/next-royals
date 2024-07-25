import Link from "next/link";
import { BsChevronRight } from 'react-icons/bs';
import { getPricePriorityOne } from "@/api/getPrices";
import CampaignManagedEdit from "./components/CampaignManagedEdit";




export default async function page({ params: {id}}) {
  const priceData = await getPricePriorityOne();

  return (
    <>
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
                  <Link href='/campaign-managed'>
                  Managed Campaign List</Link>
                </li>
                <li><BsChevronRight /></li>
                <li className='flex justify-start items-center'>
                  <Link href={`/campaign-managed/edit/${id}`} className='font-semibold'>
                    Edit Managed Campaign</Link>
                </li>
              </ul>
          </div>
        </section>
        
        <CampaignManagedEdit id={id} priceData={priceData} />

    </>
  )
}
