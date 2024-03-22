import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 1,
      retry: 1,
      refetchInterval: 3000,
      refetchIntervalInBackground: false,
      refetchOnReconnect: false,
    },
  },
});