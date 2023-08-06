import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://zvvoldyfzrzhipgpmfgx.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp2dm9sZHlmenJ6aGlwZ3BtZmd4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTExNDY3NTUsImV4cCI6MjAwNjcyMjc1NX0.teRsbjckFM7u93zcwsZli8VYvrDs_xaKp5VKg-wCEZQ";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
