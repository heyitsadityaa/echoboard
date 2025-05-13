"use client";

import Link from "next/link";
import { useActionState } from "react";
import { authenticate } from "../actions/auth";
// import { authenticate } from "../actions/auth";

export default function Page() {
  const [errorMessage, formAction, isPending] = useActionState(
    authenticate,
    undefined,
  );
  return (
    <div className="flex min-h-screen items-center justify-center bg-white px-4">
      <div className="w-full max-w-sm space-y-6">
        <h1 className="text-center text-2xl font-semibold text-gray-900">
          Sign in
        </h1>
        <form action={formAction} className="space-y-4">
          <input type="hidden" name="redirectTo" value="/dashboard" />

          <div className="relative h-fit">
            <input
              className="w-full rounded-md border border-gray-300 px-3 pt-7 pb-1 text-sm focus:border-black focus:outline-none"
              type="email"
              name="email"
              required
            />
            <label className="absolute top-2 left-3 text-[12px]">EMAIL</label>
          </div>

          <div className="relative h-fit">
            <input
              className="w-full rounded-md border border-gray-300 px-3 pt-7 pb-1 text-sm focus:border-black focus:outline-none"
              type="password"
              name="password"
              required
              minLength={8}
            />
            <label className="absolute top-2 left-3 text-[12px]">
              PASSWORD
            </label>
          </div>

          <button
            disabled={isPending}
            className="w-full rounded-md bg-black py-2 text-sm font-medium text-white hover:bg-gray-900 focus:outline-none disabled:cursor-not-allowed disabled:bg-gray-300"
          >
            {isPending ? "Logging in..." : "Log in"}
          </button>

          <p className="text-center text-xs text-gray-600">
            No account?{" "}
            <Link className="text-blue-400 hover:text-blue-600" href="/signup">
              Create one
            </Link>
          </p>

          {errorMessage && (
            <p className="text-center text-sm text-red-500">{errorMessage}</p>
          )}
        </form>
      </div>
    </div>
  );
}
