"use client";

import React from "react";
import { signOut } from "next-auth/react";
import { redirect } from "next/navigation";

const page = () => {
  return (
    <div className="flex w-20 flex-col gap-4">
      Dashboard
      <button
        className="rounded-md bg-black px-2 py-2 text-white"
        onClick={() => redirect("/dashboard/test")}
      >
        test
      </button>
      <button
        className="rounded-md bg-black px-2 py-2 text-white"
        onClick={() => signOut()}
      >
        SignOut
      </button>
    </div>
  );
};

export default page;
