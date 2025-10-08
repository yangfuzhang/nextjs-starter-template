"use client";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { createUrl } from "@/lib/utils";
import { routing } from "@/i18n/routing";
import { LOCALE_NAMES } from "@/lib/constants";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export type LocalePickerProps = {
  disabled?: boolean;
  value?: string;
  onChange?: (value: string | undefined) => void;
};

export function LocalePicker({ disabled, value, onChange }: LocalePickerProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const locale = searchParams.get("locale") ?? "en";
  const handleLocaleChange = (l?: string) => {
    onChange?.(l);
    router.push(createUrl(pathname, searchParams, { locale: l ?? "en" }));
  };

  return (
    <Select
      disabled={disabled}
      value={locale}
      onValueChange={handleLocaleChange}
    >
      <SelectTrigger>
        <SelectValue placeholder="请选择语言" />
      </SelectTrigger>
      <SelectContent>
        {routing.locales.map((l) => {
          return (
            <SelectItem key={l} value={l}>
              {LOCALE_NAMES[l as keyof typeof LOCALE_NAMES]}
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
}
