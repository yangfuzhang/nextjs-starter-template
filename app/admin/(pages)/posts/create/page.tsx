import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { PostForm } from "../components/post-form";

export default async function Page(props: {
  searchParams: Promise<{ locale: string }>;
}) {
  const searchParams = await props.searchParams;
  const locale = searchParams.locale ?? "en";

  return (
    <div className="p-4 flex flex-col gap-4">
      <Link
        href={`/admin/posts?locale=${locale}`}
        className="flex items-center gap-2 cursor-pointer transition-all hover:text-primary"
      >
        <ChevronLeft size="16" />
        <span>返回</span>
      </Link>
      <h1 className="text-xl font-medium">新建文章</h1>

      <PostForm />
    </div>
  );
}
