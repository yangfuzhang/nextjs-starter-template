import { supabase } from "@/lib/supabase";

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

export async function getAllUsers() {
  const { data, error } = await supabase.schema("next_auth").from("users")
    .select(`
      id,
      name,
      email,
      emailVerified,
      image,
      accounts (
        id,
        type,
        provider
      )  
    `);

  if (error) throw error;

  return data;
}
