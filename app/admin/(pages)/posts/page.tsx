import { PostTable } from "./table";
import { LocalePicker } from "@/components/i18n";

export default function Page() {
  return (
    <div className="p-4 flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <h1 className="text-xl font-medium">博客列表</h1>
        <LocalePicker />
      </div>

      <PostTable />
    </div>
  );
}
