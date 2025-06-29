import { UserList } from "./list";

export default async function Page() {
  return (
    <div className="p-4 flex flex-col gap-4">
      <h1 className="text-xl font-medium">用户列表</h1>
      <UserList />
    </div>
  );
}
