import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

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
    .from("profiles")
    .select("*", { count: "exact" })
    .order("created_at", { ascending: false });

  if (filters.name) {
    query.ilike("name", `%${filters.name}%`);
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
