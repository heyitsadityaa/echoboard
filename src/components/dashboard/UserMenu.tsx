"use client";

import { ChevronDown, LogOut } from "lucide-react";
import { signout } from "@/app/actions/auth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";

export default function UserMenu({ email }: { email: string | null }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="flex items-center font-semibold text-lime-500 rounded-lg">
          {email}
          <ChevronDown className="size-6" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 bg-background border-slate-800" align="end">
        <DropdownMenuItem onClick={() => signout()} className="hover:bg-background text-red-400">
          <LogOut className="mr-2 h-4 w-4" />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
