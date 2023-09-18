import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://hktgqdbouuybaamrnbrx.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhrdGdxZGJvdXV5YmFhbXJuYnJ4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTMzOTc2NjksImV4cCI6MjAwODk3MzY2OX0.GrN-glvBRD4Msw_cnbXmOWk6rm_k-IQKsOuNS6np-FI";
const supabase = createClient(supabaseUrl, supabaseKey);
export default supabase;
