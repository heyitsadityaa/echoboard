"use client";

import { useState } from "react";
import { PencilLine } from "lucide-react";
import { createRoom } from "@/app/actions/rooms";

export default function CreateRoom() {
  const [hover, setHover] = useState(false);

  return (
    <div
      onMouseOver={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={() => createRoom()}
      className="flex h-fit w-fit cursor-pointer items-center gap-3 rounded-xl px-6 py-5 transition-all select-none hover:bg-lime-600 bg-lime-500"
    >
      <div className="flex h-fit w-fit items-center justify-center rounded-full bg-lime-700 p-2">
        <PencilLine className="h-4 w-4 text-white" />
      </div>
      <div className="flex flex-col gap-0.5 text-[11px]">
        <p className={`font-semibold ${hover ? "text-white" : ""}`}>
          New design file
        </p>
        <p className={`${hover ? "text-white" : ""}`}>
          Create a new design
        </p>
      </div>
    </div>
  );
}
