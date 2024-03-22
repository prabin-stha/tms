import { createFileRoute, redirect } from "@tanstack/react-router";

import { useAuth } from "@/store/auth";

export const Route = createFileRoute("/_authenticated")({
  beforeLoad() {
    const { token } = useAuth.getState();

    if (!token)
      throw redirect({
        to: "/login",
      });
  },
});
