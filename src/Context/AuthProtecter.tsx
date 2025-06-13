import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

type DecodedToken = {
  email: string;
  role: string;
  exp: number;
};

export default function AuthProtector({
  children,
}: {
  children: React.ReactNode;
}) {
  const storedToken = localStorage.getItem("token");

  if (!storedToken) {
    return <Navigate to="/login" replace />;
  }

  try {
    const decoded: DecodedToken = jwtDecode(storedToken);
    const isExpired = decoded.exp * 1000 < Date.now();

    if (isExpired) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      return <Navigate to="/login" replace />;
    }

    localStorage.setItem(
      "user",
      JSON.stringify({ email: decoded.email, role: decoded.role })
    );

    return <>{children}</>;
  } catch (error) {
    console.error("Token decoding error:", error);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    return <Navigate to="/login" replace />;
  }
}
