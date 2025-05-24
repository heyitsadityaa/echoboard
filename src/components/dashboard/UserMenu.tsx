"use client";

import { useEffect, useRef, useState } from "react";
import UserAvatar from "@/components/toolsbar/UserAvatar";
import { ChevronDown, LogOut } from "lucide-react";
import { signout } from "@/app/actions/auth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

export default function UserMenu({ email }: { email: string | null }) {
  return (
    <div className="relative">
      <DropdownMenu>
        <DropdownMenuTrigger className="flex w-fit cursor-pointer items-center gap-2 rounded-md p-1 hover:bg-gray-100">
          <UserAvatar name={email ?? "Anonymous"} />
          <h2 className="scroll-m-20 text-[13px] font-medium">{email}</h2>
          <ChevronDown className="h-4 w-4" />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem
            onClick={signout}
            className={`flex w-full items-center justify-between p-1 hover:bg-lime-500`}
          >
            <span className="text-xs">Sign out</span>
            <LogOut className="mr-2 h-4 w-4" />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
