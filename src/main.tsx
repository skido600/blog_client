import { StrictMode, Suspense, lazy } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";

// ✅ Lazy-loaded pages/components
const Home = lazy(() => import("./pages/Home.tsx"));
const About = lazy(() => import("./pages/About.tsx"));
const Admin = lazy(() => import("./pages/Admin.tsx"));
const Login = lazy(() => import("./components/Login.tsx"));
const All_post = lazy(() => import("./components/All_post.tsx"));
const PostDetail = lazy(() => import("./components/PostDetail.tsx"));

import RootLayout from "./layout/RootLayout.tsx";
import AdminLayout from "./layout/AdminLayout.tsx";
import ProtectedRoute from "./Context/ProtectedRoute.tsx";
import AuthProtector from "./Context/AuthProtecter.tsx";
import Loader from "./components/helper/Loader.tsx";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/post/:id",
        element: <PostDetail />,
      },
    ],
  },
  {
    element: (
      <AuthProtector>
        <ProtectedRoute>
          <AdminLayout />
        </ProtectedRoute>
      </AuthProtector>
    ),
    children: [
      {
        path: "/admin",
        element: <Admin />,
      },
      {
        path: "/all",
        element: <All_post />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <Toaster position="top-center" />
      <Suspense fallback={<Loader />}>
        <RouterProvider router={router} />
      </Suspense>
    </QueryClientProvider>
  </StrictMode>
);
