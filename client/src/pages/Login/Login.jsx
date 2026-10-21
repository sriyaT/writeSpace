import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../../schemas/auth.schema";
import { useLoginMutation } from "../../queries/authQueries";
import useAuthStore from "../../store/authStore";

import { useNavigate } from "react-router-dom";

import { Link } from "react-router-dom";
const Login = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });
  const { mutate, isPending } = useLoginMutation();

  const login = useAuthStore((state) => state.login);

  const [showPassword, setShowPassword] = useState(false);

  const [serverError, setServerError] = useState("");

  const loginHandler = (formData) => {
    mutate(formData, {
      onSuccess: (response) => {
        login({
          user: {
            id: response.user.id,
            username: response.user.username,
            email: response.user.email,
          },
          accessToken: response.user.token,
          refreshToken: response.user.refresh_token,
        });

        navigate("/dashboard");
      },

      onError: (error) => {
        setServerError(error.response?.data?.message || "Invalid credentials");
      },
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        <h1 className="text-3xl font-bold text-center mb-2">
          Welcome Back!! 👋🏻
        </h1>
        <p className="text-center text-gray-500 mb-6">
          Login to your account!!
        </p>
        <form
          className="text-gray-500 mb-6"
          onSubmit={handleSubmit(loginHandler)}
        >
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input type="text" placeholder="Email" {...register("email")} />
            {errors?.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                {...register("password")}
              />

              <button
                type="button"
                className="absolute right-3 top-3 text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>
            {errors?.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>
          <div className="text-right mb-6">
            <Link
              className="text-blue-600 text-sm hover:underline"
              to="/auth/forgot-password"
            >
              Forgot Password?
            </Link>
          </div>
          {serverError && (
            <div className="bg-red-50 border border-red-200 text-red-600 rounded-lg p-3 mb-4">
              {serverError}
            </div>
          )}
          <button type="submit" disabled={isPending}>
            {isPending ? "Signing In..." : "Login"}
          </button>
          <div>
            <p className="text-center text-sm text-gray-600 mt-6">
              Don't have an account?{" "}
              <button
                className="text-blue-600 font-medium hover:underline"
                onClick={() => navigate("/auth/register")}
              >
                Register
              </button>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
