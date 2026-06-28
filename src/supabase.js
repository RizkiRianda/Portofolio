import { createClient } from '@supabase/supabase-js';

// Tembak langsung nilainya di sini tanpa menggunakan import.meta.env
const supabaseUrl = 'https://fagridgenreqatusfrrn.supabase.co'; 
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'; // <--- Paste token panjang eyJ... milikmu di sini secara utuh

export const isSupabaseConfigured = true;

export const supabase = createClient(supabaseUrl, supabaseKey);