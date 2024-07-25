import { baseURL } from "./baseURL";



export async function getPricePriorityOne() {
    const response = await fetch( `${baseURL}price-priority-one`, {cache: 'no-cache'} );
    if(!response.ok) {
       throw new Error('failed to fetch Data.')
    }
    return await response.json()
}