import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaUser, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

type FormData = {
  email: string;
  password: string;
};

export default function LoginPage() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };
  const onSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      const response = await fetch(
        "https://my-blog-z9ga.onrender.com/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(data),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Login failed");
      }
      const cleanToken = result.token.replace(/^Bearer\s+/, "");
      localStorage.setItem("token", cleanToken);

      toast.success(result.message, {
        style: {
          backgroundColor: "#38A169",
          color: "white",
        },
      });

      reset();
      navigate("/admin");
    } catch (error) {
      toast.error((error as Error).message || "Something went wrong", {
        style: {
          backgroundColor: "#F56565",
          color: "white",
        },
      });
    } finally {
      setLoading(false);
    }
  };

  const onError = () => {
    toast.error("Please fill in all the fields.", {
      style: {
        backgroundColor: "#F56565",
        color: "white",
      },
    });
  };

  return (
    <main className="flex bg-[#001C30]  justify-center items-center min-h-screen p-4">
      <section className="w-full max-w-md bg-white rounded-xl p-8 shadow-lg">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            only for Admin
          </h1>
          <p className="text-gray-500">
            If you found yourself here and you are not an admin, please go back
            to the home page or contact the developer.
          </p>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit(onSubmit, onError)}>
          {/* Email */}
          <div className="relative">
            <FaUser className="absolute top-1/2 left-3 transform -translate-y-1/2 text-[#000235]" />
            <input
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Invalid email format",
                },
              })}
              placeholder="Email"
              className="w-full pl-10 pr-4 py-3 border-2 outline-none border-[#000235] rounded-lg focus:ring-1 focus:ring-[#000235] placeholder:text-gray-500"
            />
          </div>
          {errors.email && (
            <p className="text-red-600 text-sm -mt-4">{errors.email.message}</p>
          )}

          {/* Password */}
          <div className="relative">
            <FaLock className="absolute top-1/2 left-3 transform -translate-y-1/2 text-[#000235]" />
            <input
              type={showPassword ? "text" : "password"}
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
              placeholder="Password"
              className="w-full pl-10 pr-10 py-3 border-2 outline-none border-[#000235] rounded-lg focus:ring-1 focus:ring-[#000235] placeholder:text-gray-500"
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute top-1/2 right-3 transform -translate-y-1/2 text-[#000235] focus:outline-none">
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          {errors.password && (
            <p className="text-red-600 text-sm -mt-4">
              {errors.password.message}
            </p>
          )}

          {/* Submit Button with Loader */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full text-white py-3 rounded-lg font-medium transition-colors ${
              loading
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-[#0B001A] hover:bg-[#2d3748]"
            }`}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </section>
      {/* <Theme /> */}
    </main>
  );
}
