// /sanity/lib/writeClient.ts
import { createClient } from '@sanity/client';

export const writeClient = createClient({
  projectId: 'srkj07q7',          
  dataset: 'production',          
  apiVersion: '2023-05-03',       
  token: process.env.SANITY_WRITE_TOKEN, 
  useCdn: false,                  
});
