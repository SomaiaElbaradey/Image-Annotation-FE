"use client";

import { FormEvent, useState } from "react";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

import app from "@/lib/server/firebase/config";

export default function Login() {
  const [error, setError] = useState("");

  const router = useRouter();

  console.log("Logging in with email and password.");

  async function handleSubmit(event: FormEvent) {
    console.log("Logging in with email and password.");


    event.preventDefault();
    console.log(event, 'event');

    setError("");

    console.log("Logging in with email and password.");

    try {
      const auth = getAuth(app);
      const credential = await signInWithEmailAndPassword(auth, 'somayaelbaradey@gmail.com', '123456');
      console.log("credential", credential);


      const idToken = await credential.user.getIdToken();
      console.log("idToken", idToken);

      console.log("Login successful. Setting token in cookie.");

      // HERE TO SET THE COOKIE!

      router.push("/");
    } catch (err) {
      console.error("Login error:", err);
      setError((err as Error).message);
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8">
      <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <form
            onSubmit={handleSubmit}
            className="space-y-4 md:space-y-6"
            action="#"
          >
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Your email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 
                            block w-full p-2.5 "
                placeholder="name@company.com"
                required
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="••••••••"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block 
                             w-full p-2.5 "
                required
              />
            </div>
            {error && (
              <div
                className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
                role="alert"
              >
                <span className="block sm:inline">{error}</span>
              </div>
            )}
            <button
              type="submit"
              className="w-full text-white bg-gray-600 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg 
                          text-sm px-5 py-2.5 text-center"
            >
              Enter
            </button>
            <p className="text-sm font-light text-gray-500">
              Don&apos;t have an account?{" "}
              <Link
                href="/register"
                className="font-medium text-gray-600 hover:underline dark:text-gray-500"
              >
                Register here
              </Link>
            </p>
          </form>
        </div>
      </div>
    </main>
  );
}