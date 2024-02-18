// lib/config/config.js

// Define default values
const DEFAULT_NEXTAUTH_URL = 'https://app.podfol.com/';
const DEFAULT_LIMIT = '10';

// Export configuration constants
export const NEXTAUTH_URL = process.env.NEXTAUTH_URL || DEFAULT_NEXTAUTH_URL;
export const NEXT_PUBLIC_LIMIT = process.env.NEXT_PUBLIC_LIMIT || DEFAULT_LIMIT;
export const NEXTAUTH_SECRET = process.env.NEXTAUTH_SECRET;
export const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
export const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

export const LINKEDIN_CLIENT_ID = process.env.LINKEDIN_CLIENT_ID;
export const LINKEDIN_CLIENT_SECRET = process.env.LINKEDIN_CLIENT_SECRET;

