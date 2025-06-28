import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function Page() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-4 row-start-2 items-center justify-center">
        <p className="text-3xl">用户列表</p>
        <Link href="/" target="_self" rel="noopener noreferrer">
          <Button variant="outline">返回首页</Button>
        </Link>
      </main>
    </div>
  );
}
