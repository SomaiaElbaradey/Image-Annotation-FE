"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";

import { useAuth } from "@/lib/modules/auth/hooks";
import { Button, Input, Label, Typography, Alert } from "@/lib/ui";

import { RegisterInputs, registerSchema } from "../schemas/auth";
import { getErrorMessage } from "../utils";

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
        <main className="flex min-h-screen items-center justify-center p-4 bg-gray-50">
            <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
                <Typography.H1 className="mb-3 font-bold">Create an account</Typography.H1>
                <form onSubmit={handleSubmit(registerUser)} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="email">Email address</Label>
                        <Input {...register("email")} type="email" id="email" placeholder="example@example.com" />
                        {errors.email && (
                            <Label role="alert" className="text-danger"> {errors.email.message}</Label>
                        )}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>
                        <Input {...register("password")} type="password" id="password" placeholder="••••••••" />
                        {errors.password && (
                            <Label role="alert" className="text-danger">{errors.password.message}</Label>
                        )}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="confirmation">Confirm password</Label>
                        <Input {...register("confirmation")} type="password" id="confirmation" placeholder="••••••••" />
                        {errors.confirmation && (
                            <Label role="alert" className="text-danger"> {errors.confirmation.message}</Label>
                        )}
                    </div>
                    {error && <Alert variant={"error"}>{getErrorMessage(error)}</Alert>}
                    <Button type="submit" className="w-full" variant="primary" disabled={isLoading}>
                        {isLoading ? "Creating account..." : "Create an account"}
                    </Button>
                </form>
                <div className="mt-2">
                    <Typography.CP2 className="text-gray-600">
                        Already have an account?{" "}
                        <Link href="/login" className="font-medium text-primary hover:underline">
                            Login here
                        </Link>
                    </Typography.CP2>
                </div>
            </div>
        </main>
    );
}