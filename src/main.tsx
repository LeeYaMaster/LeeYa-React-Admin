import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Suspense, createElement, lazy } from "react";

import List from "./dashboard/list.tsx";
import Statistics from "./dashboard/statistics.tsx";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { staleTime: 1000 * 30, retry: 1 }, // 30s 后标脏，失败重试 1 次
  },
});

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <App />,
      children: [
        { index: true, element: <App /> }, // 默认子路由 / -> /dashboard
        {
          path: '/list',
          element: (
            <Suspense fallback={<div>Loading...</div>}>
              {createElement(lazy(() => import('./dashboard/list.tsx')))}
            </Suspense>
          ),
        },
        {
          path: '/statistics',
          element: (
            <Suspense fallback={<div>Loading...</div>}>
              {createElement(lazy(() => import('./dashboard/statistics.tsx')))}
            </Suspense>
          ),
        },
      ],
    },
  ]
)

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      {/* <App /> */}
      <RouterProvider router={router}/>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>  
  </StrictMode>
);
