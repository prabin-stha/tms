import { RouterProvider } from "@tanstack/react-router";
import { QueryClientProvider } from "@tanstack/react-query";

import { queryClient } from "@/lib/config/query-client";
import { router } from "@/lib/config/route";
import { useApplyTheme } from "@/hooks/useApplyTheme";
import { useInitializeApp } from "./hooks/useInitializeApp";

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

function App() {
  // Applying theme after toggle
  useApplyTheme();
  
  useInitializeApp();

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
