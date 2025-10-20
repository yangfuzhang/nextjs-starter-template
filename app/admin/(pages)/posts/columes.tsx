import * as React from "react";
import Link from "next/link";
import { format } from "date-fns";
import { Edit, Eye } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";
import type { Post } from "@/types/post";
import { toastWarning } from "@/lib/toast";
import { Checkbox } from "@/components/ui/checkbox";
import { Actions } from "./actions";

export const columns: ColumnDef<Post>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "title",
    header: "标题",
    cell: ({ row }) => (
      <div className="flex flex-col gap-2">
        {row.getValue("title")}
        <div className="flex items-center gap-4">
          <Link
            href={`/admin/posts/edit/${row.original.document_id}?locale=${row.original.locale}`}
          >
            <Edit
              size="16"
              className="cursor-pointer transition-all hover:text-primary"
            />
          </Link>
          <Link
            href={`/${row.original.locale}/posts/${row.original.slug}`}
            target="_blank"
            onClick={(e) => {
              if (!row.original.published) {
                toastWarning("该文章未发布");
                e.preventDefault();
              }
            }}
          >
            <Eye
              size="16"
              className="cursor-pointer transition-all hover:text-primary"
            />
          </Link>
        </div>
      </div>
    ),
  },
  {
    accessorKey: "slug",
    header: "Slug",
    cell: ({ row }) => <div>{row.getValue("slug")}</div>,
  },
  {
    accessorKey: "cover",
    header: "封面图",
    cell: ({ row }) => (
      <div className="relative w-16 aspect-square flex items-center justify-center overflow-hidden rounded-lg">
        <img src={row.original.cover} alt={row.original.title} />
      </div>
    ),
  },
  {
    accessorKey: "published",
    header: "发布状态",
    cell: ({ row }) => (
      <div>{row.getValue("published") ? "已发布" : "未发布"}</div>
    ),
  },
  {
    accessorKey: "created_at",
    header: "创建日期",
    cell: ({ row }) => (
      <div>
        {row.getValue("created_at")
          ? format(new Date(row.getValue("created_at")), "yyyy-MM-dd HH:mm:ss")
          : ""}
      </div>
    ),
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      return <Actions post={row.original} />;
    },
  },
];
