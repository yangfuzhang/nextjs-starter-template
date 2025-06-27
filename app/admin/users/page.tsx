import Link from "next/link";
import { redirect } from "next/navigation";
import { signOut } from "@/auth";
import { getUserInfo } from "@/services/user";
import { Button } from "@/components/ui/button";

export default async function Page() {
  const userInfo = await getUserInfo();

  if (!userInfo?.email) return redirect("/auth/signin");

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-4 row-start-2 items-center justify-center">
        <p className="text-3xl">管理后台</p>
        <Link href="/" target="_self" rel="noopener noreferrer">
          <Button variant="outline">返回首页</Button>
        </Link>
        <Button
          onClick={async () => {
            "use server";
            await signOut();
          }}
        >
          退出登录
        </Button>
      </main>
    </div>
  );
}
