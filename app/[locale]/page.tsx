import Link from "next/link";
import Image from "next/image";
import { Globe } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Button } from "@/components/ui/button";

export default async function HomePage() {
  const t = await getTranslations("global");
  const t_home = await getTranslations("home_page");

  return (
    <div className="flex flex-col items-center justify-center p-8 pt-20 gap-12 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 items-center sm:items-start">
        <Image
          className="dark:invert"
          src="/logo.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />

        <div className="flex flex-col gap-2">
          <h1 className="text-3xl md:text-5xl">{t("title")}</h1>
          <p>{t("subtitle")}</p>
        </div>

        <div className="flex flex-col gap-2 items-start">
          <h2 className="font-medium">{t_home("tech_stack")}</h2>
          <ol className="list-inside list-decimal font-[family-name:var(--font-geist-mono)]">
            <li>Nextjs</li>
            <li>Shadcn</li>
            <li>Zustand</li>
            <li>Nextauth.js</li>
            <li>TailwindCss</li>
            <li>Supabase</li>
          </ol>
        </div>

        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <Link
            className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto md:w-[158px]"
            href="/admin"
            target="_self"
            rel="noopener noreferrer"
          >
            {t_home("dashboard")}
          </Link>
          <Link
            className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto md:w-[158px]"
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            {t_home("docs")}
          </Link>
        </div>
      </main>
      <footer className="flex gap-4 items-center justify-center">
        <Link href="https://yangfuzhang.online" target="_blank">
          <Button variant="outline" className="cursor-pointer">
            <Globe size="16" />
          </Button>
        </Link>
        <Link
          href="https://github.com/yangfuzhang/nextjs-starter-template"
          target="_blank"
        >
          <Button className="cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path
                d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
                fill="currentColor"
              />
            </svg>
            <span>Github</span>
          </Button>
        </Link>
      </footer>
    </div>
  );
}
