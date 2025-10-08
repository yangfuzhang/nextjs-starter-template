import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { formSchema } from "@/schemas/post";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ document_id: string }> }
) {
  const { document_id } = await params;
  const searchParams = request.nextUrl.searchParams;
  const locale = searchParams.get("locale");

  if (!locale) {
    return NextResponse.json(
      { message: "locale is required" },
      { status: 400 }
    );
  }

  const supabase = await createClient();
  const { error, data } = await supabase
    .from("posts")
    .select("*")
    .eq("document_id", document_id)
    .eq("locale", locale)
    .maybeSingle();

  if (error) {
    return NextResponse.json(error, { status: 500 });
  }

  return NextResponse.json(data);
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ document_id: string }> }
) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ message: "unauthorized" }, { status: 401 });
  }

  const { document_id } = await params;
  const searchParams = request.nextUrl.searchParams;
  const locale = searchParams.get("locale");

  if (!locale) {
    return NextResponse.json(
      { message: "locale is required" },
      { status: 400 }
    );
  }

  const reqRaw = await request.json();
  const req = formSchema.partial().safeParse(reqRaw);

  if (!req.success) {
    return NextResponse.json(req.error, { status: 400 });
  }

  const query = supabase
    .from("posts")
    .update({ ...req.data })
    .eq("document_id", document_id);

  if (locale !== "all") {
    query.eq("locale", locale);
  }

  const { error, data } = await query;

  if (error) {
    return NextResponse.json(error, { status: 500 });
  }

  return NextResponse.json(data);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ document_id: string }> }
) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ message: "unauthorized" }, { status: 401 });
  }

  const { document_id } = await params;
  const searchParams = request.nextUrl.searchParams;
  const locale = searchParams.get("locale");

  if (!locale) {
    return NextResponse.json(
      { message: "locale is required" },
      { status: 400 }
    );
  }

  const query = supabase.from("posts").delete().eq("document_id", document_id);

  if (locale !== "all") {
    query.eq("locale", locale);
  }

  const { error } = await query;

  if (error) {
    return NextResponse.json(error, { status: 500 });
  }

  return NextResponse.json({ message: "success" });
}
