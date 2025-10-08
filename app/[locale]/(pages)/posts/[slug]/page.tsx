import type { Metadata } from "next";
import { Content } from "./content";
import { createClient } from "@/lib/supabase/server";

type Props = {
  params: Promise<{ locale: string; slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const supabase = await createClient();
  const { data: post } = await supabase
    .from("posts")
    .select("*")
    .eq("slug", slug)
    .eq("locale", locale)
    .maybeSingle();
  const title = post?.seo_title || post?.name;
  const description = post?.seo_description || post?.description;

  return {
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL!),
    alternates: {
      canonical: `/${locale}/posts/${slug}`,
    },
    title,
    description,
    openGraph: {
      locale,
      title,
      description,
    },
    twitter: {
      card: "summary",
      title,
      description,
    },
  };
}

export default async function Page(props: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const params = await props.params;
  const { locale, slug } = params;
  const supabase = await createClient();
  const { data: post } = await supabase
    .from("posts")
    .select("*")
    .eq("slug", slug)
    .eq("locale", locale)
    .eq("published", true)
    .maybeSingle();

  if (!post) {
    return null;
  }

  return (
    <div className="w-[800px] flex-1 flex flex-col gap-4 overflow-y-auto">
      <h1 className="text-center text-4xl">{post.title}</h1>

      <div className="flex-1">
        <Content content={post.content} />
      </div>
    </div>
  );
}
