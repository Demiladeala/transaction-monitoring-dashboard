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
import Image from "next/image";

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
      <div className="hidden lg:flex lg:w-1/2 bg-primary-gradient text-white-token flex-col p-8 lg:p-14">
        {/* Background lines */}
        <div className="absolute">
          <Image
            src={
              "https://res.cloudinary.com/dld8u8zjg/image/upload/v1778684199/Background_Lines_j2klpw.png"
            }
            alt="Background lines"
            priority
            width={800}
            height={878}
            className="w-full h-219.5 "
          />
        </div>

        <div className="max-w-99">
          <h1 className="text-4xl font-bold mb-6 text-accent">LOGO</h1>
          <h2 className="text-3xl lg:text-4xl font-semibold leading-tight mb-6">
            All-in-One Access <br /> Control
          </h2>
          <p className="text-accent text-lg leading-relaxed">
            Manage your entire shop - jobs, customers, inventory, and finances -
            in one simple dashboard
          </p>
        </div>

        {/* Carousel Indicators */}
        <div className="mt-4 flex gap-2">
          <div className="w-8 h-2 rounded-full bg-[#FDF8F8]"></div>
          <div className="w-2 h-2 rounded-full bg-accent"></div>
          <div className="w-2 h-2 rounded-full bg-accent"></div>
        </div>
      </div>

      {/* Right Section - Login Form */}
      <div className="w-full lg:w-1/2 bg-white flex flex-col lg:justify-center px-4 sm:px-6 md:px-8 lg:px-12 py-8 lg:py-0">
        <div className="max-w-md w-full mx-auto">
          {/* Logo for mobile */}
          <h1 className="text-3xl font-bold text-primary lg:hidden">LOGO</h1>

          <h3 className="text-2xl sm:text-3xl font-bold lg:font-semibold text-black max-lg:mt-5 max-lg:mb-2">
            Welcome Back!
          </h3>
          <p className="text-gray-600 text-sm lg:hidden">
            Sign in to access your dashboard
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="mt-10">
            {/* Email Field */}
            <div>
              <label
                htmlFor={emailId}
                className="block text-sm font-medium text-neutral50 mb-2"
              >
                Email address <span className="text-error">*</span>
              </label>
              <Input
                id={emailId}
                type="email"
                placeholder="johndoe@example.com"
                error={!!errors.email}
                {...register("email")}
                className="w-full"
              />
              <p className="text-error text-xs h-px mt-1">
                {errors.email?.message}
              </p>
            </div>

            {/* Password Field */}
            <div>
              <label
                htmlFor={passwordId}
                className="block text-sm font-medium text-neutral50 mb-2 mt-4"
              >
                Password <span className="text-error">*</span>
              </label>
              <div className="relative">
                <Input
                  id={passwordId}
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••••••"
                  error={!!errors.password}
                  {...register("password")}
                  className="w-full pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-neutral50"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              <p className="text-error text-xs h-px mt-1">
                {errors.password?.message}
              </p>
            </div>

            {/* Forgot Password Link */}
            <div className="text-right mt-4">
              <Link
                href="/"
                className="text-sm text-primary hover:text-primary-500 font-medium"
              >
                Forgot password?
              </Link>
            </div>

            {/* Login Button */}
            <Button
              type="submit"
              isLoading={isSubmitting}
              loadingText="Logging in..."
              className="mt-8 lg:mt-10 w-full bg-primary hover:bg-primary-500 text-white-token font-semibold py-2 rounded-lg transition-colors"
            >
              Login
            </Button>
          </form>

          {/* Sign Up Link */}
          <div className="mt-6 text-center text-sm">
            <span className="text-gray-600">Don&apos;t have an account? </span>{" "}
            <Link
              href="/"
              className="text-primary hover:text-primary-500 font-semibold"
            >
              Create account
            </Link>
          </div>

          {/* Footer */}
          <p className="text-center text-gray-500 text-xs mt-8 lg:mt-16">
            © 2025 LOGO. All rights reserved.
          </p>

          {/* Demo Credentials Info */}
          <div className="mt-6 p-3 bg-accent border border-stroke rounded-lg">
            <p className="text-primary-500 text-xs font-medium">
              Demo Credentials:
            </p>
            <p className="text-primary text-xs">
              test@example.com / password123
            </p>
            <p className="text-primary text-xs">admin@example.com / admin123</p>
          </div>
        </div>
      </div>
    </div>
  );
}
