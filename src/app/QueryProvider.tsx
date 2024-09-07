"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";
import SessionWrapper from "@/components/SessionWrapper";
import BootstrapBundle from "@/hooks/BootstrapBundle";

const queryClient = new QueryClient({
  defaultOptions:{
    queries:{
      staleTime:0,
      // staleTime:60*1000,
    }
  }
})
export default function QueryProvider({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <SessionWrapper>
        <BootstrapBundle />
        <Toaster position="top-right" />
        {children}
      </SessionWrapper>
    </QueryClientProvider>
  );
}
