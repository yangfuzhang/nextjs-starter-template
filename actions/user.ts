import { createClient } from "@/lib/supabase/server";

export async function getUserByEmail(email: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("email", email)
    .single();

  if (error) throw error;

  return data;
}

export async function getAllUsers() {
  const supabase = await createClient();
  const { data, error } = await supabase.from("profiles").select("*");

  if (error) throw error;

  return data;
}
