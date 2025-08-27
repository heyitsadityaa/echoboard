"use server";

import { auth } from "@/server/auth";
import { db } from "@/server/db";
import RoomsView from "@/components/dashboard/RoomsView";
import CreateRoom from "@/components/dashboard/CreateRoom";
import UserMenu from "@/components/dashboard/UserMenu";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Plus, Search, MoreHorizontal, Users, Clock, Settings, LogOut, Ghost, ArrowDown, ChevronDown } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";

export async function DashboardContent() {
  const session = await auth();

  if (!session) {
    redirect("/");
  }

  const user = await db.user.findUniqueOrThrow({
    where: {
      id: session?.user.id,
    },
    include: {
      ownedRooms: true,
      roomInvites: {
        include: {
          room: true,
        },
      },
    },
  });

  return (
    <div className="flex h-screen w-full bg-background">
      <div className="flex h-screen flex-col">
        <div className="flex justify-between min-h-[50px] items-center border-b border-border px-10">
          <h2 className="text-md">Recents</h2>

          <div className="">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center font-semibold text-lime-500 rounded-lg">
                  {user.email}
                  <ChevronDown className="size-6" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 bg-background border-slate-800" align="end">
                <DropdownMenuItem className="hover:bg-background text-red-400">
                  <LogOut className="mr-2 h-4 w-4" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <div className="flex h-full flex-col gap-10 p-8">
          <CreateRoom />
          <RoomsView
            ownedRooms={user.ownedRooms}
            roomInvites={user.roomInvites.map((x) => x.room)}
          />
        </div>
      </div>
    </div>
  );
}

export async function DashboardLoading() {
  return (
    <div className="flex h-screen flex-col">
      {/* Header skeleton */}
      <div className="flex justify-between items-center border-b border-border px-10">
        <Skeleton className="h-6 w-20" /> {/* "Recents" title */}
        <div className="flex items-center space-x-2">
          <Skeleton className="h-8 w-32" /> {/* User email */}
          <Skeleton className="h-4 w-4" />   {/* ChevronDown icon */}
        </div>
      </div>

      {/* Main content skeleton */}
      <div className="flex h-full flex-col gap-10 p-8">
        {/* Create Room skeleton */}
        <div className="space-y-4">
          <Skeleton className="h-10 w-40" /> {/* Create Room button */}
        </div>

        {/* Rooms View skeleton */}
        <div className="space-y-6">
          {/* View mode buttons */}
          <div className="flex space-x-4">
            <Skeleton className="h-8 w-16" />
            <Skeleton className="h-8 w-16" />
          </div>

          {/* Room cards grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="space-y-3">
                <Skeleton className="h-32 w-full rounded-xl" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-3 w-1/2" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default async function DashboardPage() {
  return (
    <Suspense fallback={<DashboardLoading />}>
      <DashboardContent />
    </Suspense>
  );
}


