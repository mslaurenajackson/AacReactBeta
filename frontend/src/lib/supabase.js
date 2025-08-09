import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://vepwsryrfshpybupaapn.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZlcHdzcnlyZnNocHlidXBhYXBuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIwMTQ2ODksImV4cCI6MjA2NzU5MDY4OX0.UMLCF5uBrM-ko_VbiOl1L3LbYlyMuPJx0K7_pK6h0gA'

export const supabase = createClient(supabaseUrl, supabaseKey)