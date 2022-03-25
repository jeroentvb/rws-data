import fetch from 'node-fetch';
import type { RwsApiResponse, RwsApiResponseSuccess } from '../interfaces/rws-api-response.model.js';

export async function makeJsonRequest<T extends RwsApiResponseSuccess>(url: string, body: Record<string, unknown>): Promise<T> {
   const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
   });

   if (!res.ok) throw new Error(`Request failed with status code ${res.status}`);

   const json = await res.json() as RwsApiResponse;

   if (json.Succesvol === false) throw new Error(`Request was unsuccessful. The following message was included in the response: ${json.Foutmelding}`);

   return json as T;
}
