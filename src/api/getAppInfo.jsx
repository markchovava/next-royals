import { baseURL } from "./baseURL";



export async function getAppInfo() {
    const response = await fetch( `${baseURL}app-info`, {cache: 'no-cache'} );
    if(!response.ok) {
       throw new Error('failed to fetch Data.')
    }
    return await response.json()
}