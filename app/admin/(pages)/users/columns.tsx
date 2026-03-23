import { format } from "date-fns";
import { ColumnDef } from "@tanstack/react-table";
import type { User } from "@/types/user";
import { Checkbox } from "@/components/ui/checkbox";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const columns: ColumnDef<User>[] = [
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
    accessorKey: "name",
    header: "姓名",
    cell: ({ row }) => <div>{row.getValue("name")}</div>,
  },
  {
    accessorKey: "image",
    header: "头像",
    cell: ({ row }) => (
      <Avatar className="h-8 w-8 rounded-lg">
        <AvatarImage src={row.getValue("image")} alt={row.getValue("name")} />
        <AvatarFallback className="rounded-lg">A</AvatarFallback>
      </Avatar>
    ),
  },
  {
    accessorKey: "email",
    header: "邮箱",
    cell: ({ row }) => <div>{row.getValue("email")}</div>,
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
];
