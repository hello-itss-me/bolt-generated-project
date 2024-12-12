import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://yyvkwphwqiwhkonrfrkm.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl5dmt3cGh3cWl3aGtvbnJmcmttIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzM2NDk3MTUsImV4cCI6MjA0OTIyNTcxNX0.HihoTwSZjN1M-fJ7XXGqq7ROSZIBHOd6-N-INzjM2lQ';

export const supabase = createClient(supabaseUrl, supabaseKey);
