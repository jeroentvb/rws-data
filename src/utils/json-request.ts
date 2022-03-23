import fetch from 'node-fetch';

export async function makeJsonRequest<T = any>(url: string, body: Record<string, unknown>) {
   const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
   });

   if (!res.ok) throw new Error(`Request failed with status code ${res.status}`);

   return await res.json() as T;
}
