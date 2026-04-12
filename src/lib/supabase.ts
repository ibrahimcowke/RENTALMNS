import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://xlreyjzkembxqgyhhvbv.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhscmV5anprZW1ieHFneWhodmJ2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU0NzU3MjYsImV4cCI6MjA5MTA1MTcyNn0.WcaOEmbDqU-hqeci0AKs8xfNNw1msp0goMKAXfSTv48';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
