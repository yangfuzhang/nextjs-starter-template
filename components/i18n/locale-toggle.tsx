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
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();
  const localeRegex = new RegExp(`^/${locale}`);
  const pathnameWithoutLocale = pathname.replace(localeRegex, "");

  const handleLocaleChange = (locale: string) => {
    router.replace(`/${locale}${pathnameWithoutLocale}`);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm">
          <Languages size="16" />
          {LOCALE_NAMES[locale as keyof typeof LOCALE_NAMES]}
          <ChevronDown size="16" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {routing.locales.map((l) => (
          <DropdownMenuItem key={l} onClick={() => handleLocaleChange(l)}>
            {LOCALE_NAMES[l as keyof typeof LOCALE_NAMES]}
            {l === locale && <Check size="16" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
