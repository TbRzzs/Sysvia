import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://miwlwivxnnhekeoszgjq.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1pd2x3aXZ4bm5oZWtlb3N6Z2pxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY5MDg2ODcsImV4cCI6MjA2MjQ4NDY4N30.EFiM9RbxDb2v_Kd5ahTy2lTXb81rmySVjFIUOVx4ZVo";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);