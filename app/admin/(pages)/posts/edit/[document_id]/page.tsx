import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { PostForm } from "../../components/post-form";

export default async function Page(props: {
  searchParams: Promise<{ locale: string }>;
  params: Promise<{ document_id: string }>;
}) {
  const searchParams = await props.searchParams;
  const params = await props.params;
  const locale = searchParams.locale ?? "en";
  const document_id = params.document_id;

  return (
    <div className="p-4 flex flex-col gap-4">
      <Link
        href={`/admin/posts?locale=${locale}`}
        className="flex items-center gap-2 cursor-pointer transition-all hover:text-primary"
      >
        <ChevronLeft size="16" />
        <span>返回</span>
      </Link>
      <h1 className="text-xl font-medium">编辑文章</h1>

      <PostForm document_id={document_id} />
    </div>
  );
}
