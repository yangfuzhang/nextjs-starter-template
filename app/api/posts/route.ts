import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { formSchema } from "@/schemas/post";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const page = Number(searchParams.get("page") ?? 1);
  const pageSize = Number(searchParams.get("pageSize") ?? 10);
  const filters = JSON.parse(searchParams.get("filters") ?? "{}");

  const start = (page - 1) * pageSize;
  const end = start + pageSize - 1;

  const supabase = await createClient();
  const query = supabase
    .from("posts")
    .select("*", { count: "exact" })
    .order("created_at", { ascending: false });

  if (filters.locale) {
    query.eq("locale", filters.locale);
  }

  if (filters.title) {
    query.ilike("title", `%${filters.title}%`);
  }

  const { error, data, count } = await query.range(start, end);

  if (error) {
    return NextResponse.json(error, { status: 500 });
  }

  return NextResponse.json({
    code: 200,
    success: true,
    items: data,
    total: count,
    page,
    pageSize,
  });
}

export async function POST(request: Request) {
  const reqRaw = await request.json();
  const { document_id } = reqRaw;
  const req = formSchema.safeParse(reqRaw);

  if (!req.success) {
    return NextResponse.json(req.error, { status: 400 });
  }

  const { slug, locale } = req.data;
  const supabase = await createClient();
  const dbItem = await supabase
    .from("posts")
    .select()
    .eq("slug", slug)
    .eq("locale", locale)
    .single();

  if (dbItem.data) {
    return NextResponse.json({ message: "文章已存在" }, { status: 400 });
  }

  const { data, error } = await supabase
    .from("posts")
    .insert({ ...req.data, document_id })
    .select()
    .single();

  if (error) {
    return NextResponse.json(error, { status: 500 });
  }

  return Response.json(data);
}
