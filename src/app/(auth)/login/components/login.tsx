"use client";

import { useId, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Eye, EyeOff } from "lucide-react";
import { useAuthStore } from "@/src/lib/stores/auth";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function Login() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const emailId = useId();
  const passwordId = useId();
  const login = useAuthStore((state) => state.login);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      login(data.email, data.password);
      toast.success("Login successful!");
      router.push("/dashboard");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Section - Branding (Hidden on small screens) */}
      <div className="hidden md:flex md:w-1/2 bg-linear-to-br from-blue-600 to-blue-800 text-white flex-col justify-between p-8 lg:p-12">
        <div>
          <h1 className="text-4xl lg:text-5xl font-bold mb-6">LOGO</h1>
          <h2 className="text-3xl lg:text-4xl font-bold leading-tight mb-6">
            All-in-One Access Control
          </h2>
          <p className="text-blue-100 text-lg leading-relaxed">
            Manage your entire shop - jobs, customers, inventory, and finances -
            in one simple dashboard
          </p>
        </div>

        {/* Carousel Indicators */}
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-white"></div>
          <div className="w-3 h-3 rounded-full bg-blue-400"></div>
          <div className="w-3 h-3 rounded-full bg-blue-400"></div>
        </div>
      </div>

      {/* Right Section - Login Form */}
      <div className="w-full md:w-1/2 bg-white flex flex-col justify-center px-4 sm:px-6 md:px-8 lg:px-12 py-8 md:py-0">
        <div className="max-w-md w-full mx-auto">
          {/* Logo for mobile */}
          <h1 className="text-3xl font-bold text-blue-600 mb-8 md:hidden">
            LOGO
          </h1>

          <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
            Welcome Back!
          </h3>
          <p className="text-gray-600 text-sm mb-8">
            Sign in to access your dashboard
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Email Field */}
            <div>
              <label
                htmlFor={emailId}
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Email address <span className="text-red-500">*</span>
              </label>
              <Input
                id={emailId}
                type="email"
                placeholder="johndoe@example.com"
                {...register("email")}
                className="w-full"
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label
                htmlFor={passwordId}
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Password <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Input
                  id={passwordId}
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••••••"
                  {...register("password")}
                  className="w-full pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Forgot Password Link */}
            <div className="text-right">
              <Link
                href="/"
                className="text-sm text-blue-600 hover:text-blue-700 font-medium"
              >
                Forgot password?
              </Link>
            </div>

            {/* Login Button */}
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition-colors"
            >
              {isSubmitting ? "Logging in..." : "Login"}
            </Button>
          </form>

          {/* Sign Up Link */}
          <div className="mt-6 text-center text-sm">
            <span className="text-gray-600">Don&apos;t have an account? </span>
            <Link
              href="/"
              className="text-blue-600 hover:text-blue-700 font-semibold"
            >
              Create account
            </Link>
          </div>

          {/* Footer */}
          <p className="text-center text-gray-500 text-xs mt-8 md:mt-16">
            © 2025 LOGO. All rights reserved.
          </p>

          {/* Demo Credentials Info */}
          <div className="mt-6 p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-blue-700 text-xs font-medium">
              Demo Credentials:
            </p>
            <p className="text-blue-600 text-xs">
              test@example.com / password123
            </p>
            <p className="text-blue-600 text-xs">
              admin@example.com / admin123
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
