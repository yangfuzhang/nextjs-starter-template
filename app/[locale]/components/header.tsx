import Link from "next/link";
import { Atom } from "lucide-react";
import { LocaleToggle } from "@/components/i18n/locale-toggle";
import { Menu } from "./menu";

export function Header() {
  return (
    <div className="flex items-center justify-between">
      <div className="p-4 flex items-center gap-4">
        <Link href="/" className="flex items-center gap-2">
          <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
            <Atom size="18" />
          </div>
        </Link>

        <Menu />
      </div>

      <LocaleToggle />
    </div>
  );
}
