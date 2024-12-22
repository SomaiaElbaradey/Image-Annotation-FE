"use client";

import { useForm } from "react-hook-form";
import Link from "next/link";

import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@/hooks/useAuth";

import { RegisterInputs, registerSchema } from "../schemas/auth";

export default function Register() {
    const { register: registerUser, error, isLoading } = useAuth();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<RegisterInputs>({
        resolver: zodResolver(registerSchema),
    });

    return (
        <main className="flex min-h-screen items-center justify-center p-4 sm:p-8 bg-gray-50">
            <div className="w-full max-w-md bg-white rounded-lg shadow-md">
                <div className="p-6 space-y-4 md:space-y-6">
                    <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                        Register for an account
                    </h1>
                    <form
                        onSubmit={handleSubmit(registerUser)}
                        className="space-y-4 md:space-y-6"
                    >
                        <div>
                            <label
                                htmlFor="email"
                                className="block mb-2 text-sm font-medium text-gray-900"
                            >
                                Your email
                            </label>
                            <input
                                {...register("email")}
                                type="email"
                                id="email"
                                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                placeholder="name@company.com"
                                aria-invalid={errors.email ? "true" : "false"}
                            />
                            {errors.email && (
                                <p className="mt-1 text-sm text-red-600" role="alert">
                                    {errors.email.message}
                                </p>
                            )}
                        </div>
                        <div>
                            <label
                                htmlFor="password"
                                className="block mb-2 text-sm font-medium text-gray-900"
                            >
                                Password
                            </label>
                            <input
                                {...register("password")}
                                type="password"
                                id="password"
                                placeholder="••••••••"
                                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                aria-invalid={errors.password ? "true" : "false"}
                            />
                            {errors.password && (
                                <p className="mt-1 text-sm text-red-600" role="alert">
                                    {errors.password.message}
                                </p>
                            )}
                        </div>
                        <div>
                            <label
                                htmlFor="confirm-password"
                                className="block mb-2 text-sm font-medium text-gray-900"
                            >
                                Confirm password
                            </label>
                            <input
                                {...register("confirmation")}
                                type="password"
                                id="confirm-password"
                                placeholder="••••••••"
                                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                aria-invalid={errors.confirmation ? "true" : "false"}
                            />
                            {errors.confirmation && (
                                <p className="mt-1 text-sm text-red-600" role="alert">
                                    {errors.confirmation.message}
                                </p>
                            )}
                        </div>
                        {error && (
                            <div
                                className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg"
                                role="alert"
                            >
                                <span className="block sm:inline">{error}</span>
                            </div>
                        )}
                        <button
                            type="submit"
                            className="w-full text-white bg-gray-600 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center disabled:opacity-50"
                            disabled={isLoading}
                        >
                            {isLoading ? "Creating account..." : "Create an account"}
                        </button>
                        <p className="text-sm font-light text-gray-500">
                            Already have an account?{" "}
                            <Link
                                href="/login"
                                className="font-medium text-gray-600 hover:underline"
                            >
                                Login here
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </main>
    );
}