"use client";
import { Languages, ChevronDown, Check } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import { useLocale } from "next-intl";
import { routing } from "@/i18n/routing";
import { LOCALE_NAMES } from "@/lib/constants";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

export function LocaleToggle() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const pathnameWithoutLocale = pathname.replace(`/${locale}`, "");

  const handleLocaleChange = (locale: string) => {
    router.replace(`/${locale}${pathnameWithoutLocale}`);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm">
          <Languages size="12" />
          {LOCALE_NAMES[locale as keyof typeof LOCALE_NAMES]}
          <ChevronDown size="12" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {routing.locales.map((l) => (
          <DropdownMenuItem key={l} onClick={() => handleLocaleChange(l)}>
            {LOCALE_NAMES[l as keyof typeof LOCALE_NAMES]}
            {l === locale && <Check size="12" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
