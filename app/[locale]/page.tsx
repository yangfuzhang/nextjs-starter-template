import Link from "next/link";
import Image from "next/image";
import { getTranslations } from "next-intl/server";

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
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center font-light">
        <a
          href="https://yangfuzhang.online"
          target="_blank"
          className="underline"
        >
          https://yangfuzhang.online
        </a>
      </footer>
    </div>
  );
}
