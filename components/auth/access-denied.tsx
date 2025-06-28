export async function AccessDenied() {
  return (
    <div className="w-screen h-screen flex flex-col gap-2 items-center justify-center">
      <h1 className="text-3xl">Access Denied</h1>
      <p className="text-muted-foreground">
        Your are not allowed to access this page.
      </p>
    </div>
  );
}
