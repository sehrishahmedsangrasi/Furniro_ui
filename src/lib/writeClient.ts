// /sanity/lib/writeClient.ts
import { createClient } from '@sanity/client';

export const writeClient = createClient({
  projectId: 'srkj07q7',          // your Sanity project ID
  dataset: 'production',          // your dataset
  apiVersion: '2023-05-03',       // same as used in your fetch URL
  token: process.env.SANITY_WRITE_TOKEN, // secure write token from .env
  useCdn: false,                  // do NOT use CDN for writing
});
