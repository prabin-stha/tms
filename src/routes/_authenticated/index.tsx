import { createFileRoute } from "@tanstack/react-router";

import { Button } from "@/components/ui/button";
import { useAuth } from "@/store/auth";

export const Route = createFileRoute("/_authenticated/")({
  component: Index,
});

function Index() {
  const { user, logout } = useAuth(({ logout, user }) => ({ user, logout }));

  return (
    <div className="p-2">
      <div className="flex justify-between items-center">
        <div className="flex flex-col gap-2">
          <h3>Welcome Home! {user?.name}</h3>
          <p>{user?.email}</p>
        </div>
        <Button onClick={logout}>Logout</Button>
      </div>
    </div>
  );
}
