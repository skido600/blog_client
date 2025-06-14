import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import Home from "./pages/Home.tsx";
import About from "./pages/About.tsx";
import Contact from "./pages/Contact.tsx";
import RootLayout from "./layout/RootLayout.tsx";
import AdminLayout from "./layout/AdminLayout.tsx";
import Admin from "./pages/Admin.tsx";
import Login from "./components/Login.tsx";
import { Toaster } from "sonner";
import All_post from "./components/All_post.tsx";
import ProtectedRoute from "./Context/ProtectedRoute.tsx";
import AuthProtector from "./Context/AuthProtecter.tsx";
import PostDetail from "./components/PostDetail.tsx";

const queryClient = new QueryClient();

// ✅ Define your routes normally
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
        path: "/contact",
        element: <Contact />,
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
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>
);
