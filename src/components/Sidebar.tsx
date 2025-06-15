import { useState, useEffect } from "react";
import { toast } from "sonner";
import { CgMenuRight } from "react-icons/cg";
import { FiHome, FiBox, FiX } from "react-icons/fi";
import { IoIosLogOut } from "react-icons/io";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Theme from "./Theme";

function Sidebar() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<{ email: string; role: string } | null>(
    null
  );
  const token = localStorage.getItem("token");
  const handleLogout = async () => {
    try {
      const response = await fetch(
        "https://my-blog-z9ga.onrender.com/api/auth/logout",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          method: "POST",
          credentials: "include",
        }
      );

      const data = await response.json();
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      if (response.ok) {
        toast.success(data.message || "Logged out successfully", {
          style: {
            backgroundColor: "#38A169",
            color: "white",
            border: "none",
          },
        });
        console.log(data.message);
        navigate("/login");
      } else {
        toast.error(data.message, {
          style: {
            backgroundColor: "#F56565",
            color: "white",
            border: "none",
          },
        });
      }
    } catch (error) {
      toast.error((error as Error).message || "Something went wrong", {
        style: {
          backgroundColor: "#F56565",
          color: "white",
          border: "none",
        },
      });
    }
  };

  const menuItems = [
    {
      name: "Dashboard",
      icon: <FiHome className="icon" />,
      path: "/admin",
    },
    {
      name: "All post",
      icon: <FiBox className="icon" />,
      path: "/all",
    },

    {
      name: "Logout",
      icon: <IoIosLogOut className="icon" />,
      action: handleLogout,
    },
  ];

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      } catch (error) {
        console.error("Error parsing user from localStorage:", error);
      }
    }
  }, []);

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={handleToggle}
        className="md:hidden fixed top-0 right-0   z-50 p-2 rounded-lg">
        {isOpen ? <FiX size={30} /> : <CgMenuRight size={30} />}
      </button>

      {/* Self-close overlay for mobile */}
      {isOpen && (
        <div
          className="md:hidden fixed inset-0 bg-[#06141799] backdrop-blur-sm z-40"
          onClick={handleToggle}
        />
      )}

      {/* Sidebar */}
      <div
        className={`h-screen w-65 fixed left-0 top-0 bg-[#FBFBFB] border-r  border-neutral-400 p-6
          transform transition-transform overflow-y-auto duration-300 ease-in-out
          ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          } md:translate-x-0 z-50`}>
        {/* Logo */}
        <div className="mb-10">
          <p className="text-gray-500 text-sm">
            If you found yourself here and you are not an admin, please go back
            to the home page or contact the developer.
          </p>
          <p className="text-2xl text-gray-500 mt-1">Admin Dashboard</p>
        </div>

        {/* Menu Items */}
        <nav className="h-[50vh] md:h-auto overflow-y-auto">
          <ul>
            <div>
              <h1 className="text-gray-600 font-medium font-inter mb-4">
                Menu
              </h1>
            </div>
            {menuItems.map((item) => (
              <li key={item.name}>
                {item.path ? (
                  <Link
                    to={item.path}
                    className="flex items-center md:py-3 md:px-0 py-3 px-2 rounded-lg transition-all hover:bg-gradient-to-r from-[#6857F610] to-[#A549E210] text-gray-600"
                    onClick={handleToggle}>
                    <span className="mr-3 text-xl">{item.icon}</span>
                    <span className="font-medium font-inter">{item.name}</span>
                  </Link>
                ) : (
                  <button
                    onClick={item.action}
                    className="flex items-center w-full md:py-3 md:px-0 py-3 px-2 rounded-lg transition-all hover:bg-gradient-to-r from-[#6857F610] to-[#A549E210] text-gray-600">
                    <span className="mr-3 text-xl">{item.icon}</span>
                    <span className="font-medium font-inter">{item.name}</span>
                  </button>
                )}
              </li>
            ))}
            <Theme />
          </ul>
        </nav>

        {/* Bottom Profile */}
        <div className="absolute bottom-0 mb-4  border-t border-gray-100 pt-4">
          <div className="flex items-center">
            <div className="ml-3">
              {user ? (
                <>
                  <p className="text-sm text-gray-500 truncate">
                    {user.email.length > 20
                      ? user.email.slice(0, 20) + "..."
                      : user.email}
                  </p>
                  <p className="text-xs text-gray-400">
                    {user.role.toUpperCase()}
                  </p>
                </>
              ) : (
                <p className="text-sm text-gray-500">no user</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
