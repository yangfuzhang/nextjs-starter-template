import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { toastError } from "@/lib/toast";

export function useLogout(redirect?: string) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const logout = async () => {
    setIsLoading(true);

    const supabase = createClient();
    const { error } = await supabase.auth.signOut();

    if (error) {
      toastError(error.message);
    }

    redirect ? router.push(redirect) : router.refresh();
  };

  return { logout, isLoading };
}
