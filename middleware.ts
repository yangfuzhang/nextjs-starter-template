import { auth } from "@/auth";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);

export default auth((req) => {
  return intlMiddleware(req);
});

export const config = {
  matcher:
    "/((?!api|auth|admin|_next/static|_next/image|robots.txt|sitemap.xml|favicon.ico|.*\\..*).*)",
};
