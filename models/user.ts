import { supabase } from "./db";

export async function getUserByEmail(email: string) {
  const { data, error } = await supabase
    .schema("next_auth")
    .from("users")
    .select("*")
    .eq("email", email)
    .single();

  if (error) throw error;

  return data;
}
