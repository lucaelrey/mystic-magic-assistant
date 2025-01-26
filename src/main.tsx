import { createRoot } from 'react-dom/client';
import { RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { LanguageProvider } from "@/contexts/LanguageContext";
import router from './App';
import './index.css';

// Optimierte Query Client Konfiguration
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 Minuten
      gcTime: 1000 * 60 * 30, // 30 Minuten (formerly cacheTime)
      retry: 1,
      refetchOnWindowFocus: false, // Reduziert unnötige Refetches
    },
  },
});

createRoot(document.getElementById("root")!).render(
  <LanguageProvider>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </LanguageProvider>
);