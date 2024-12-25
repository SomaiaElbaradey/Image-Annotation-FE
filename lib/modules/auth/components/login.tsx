"use client";

import React from "react";
import { useForm } from "react-hook-form";

import Link from "next/link";

import { zodResolver } from "@hookform/resolvers/zod";

import { useAuth } from "@/lib/modules/auth/hooks";
import { Button, Input, Label, Typography, Alert } from "@/lib/ui";

import { LoginInputs, loginSchema } from "../schemas/auth";
import { getErrorMessage } from "../utils";

export default function Login() {
  const { login, error, isLoading } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInputs>({
    resolver: zodResolver(loginSchema),
  });

  return (
    <main className="flex min-h-screen items-center justify-center p-4 bg-gray-50">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        <Typography.H1 className="mb-3 font-bold">Sign in to your account</Typography.H1>
        <form onSubmit={handleSubmit(login)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email address</Label>
            <Input {...register("email")} type="email" id="email" placeholder="name@company.com" />
            {errors.email && (
              <Label role="alert" className="text-danger">
                {errors.email.message}
              </Label>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input {...register("password")} type="password" id="password" placeholder="••••••••" />
            {errors.password && (
              <Label role="alert" className="text-danger">{errors.password.message}</Label>
            )}
          </div>
          {error && (
            <Alert variant={'error'}>{getErrorMessage(error)}</Alert>
          )}
          <Button type="submit" className="w-full" variant="primary" disabled={isLoading}>
            {isLoading ? "Signing in..." : "Sign in"}
          </Button>
        </form>
        <div className="mt-2">
          <Typography.CP2 className="text-gray-600">
            New to our platform?{" "}
            <Link href="/register" className="font-medium text-primary hover:underline">
              Create an account
            </Link>
          </Typography.CP2>
        </div>
      </div>
    </main>
  );
}

