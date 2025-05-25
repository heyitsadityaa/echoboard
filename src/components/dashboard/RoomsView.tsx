"use client";

import { useRouter } from "next/navigation";
import React, { useRef } from "react";
import { useEffect, useMemo, useState } from "react";
import { deleteRoom, updateRoomTitle } from "@/app/actions/rooms";
import ConfirmationModal from "./ConfirmationModal";
import type { Room } from "@prisma/client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EllipsisVertical, Trash2 } from "lucide-react";

const PASTEL_COLORS = [
  "rgb(255, 182, 193)", // pink
  "rgb(176, 224, 230)", // powder blue
  "rgb(221, 160, 221)", // plum
  "rgb(188, 143, 143)", // rosy brown
  "rgb(152, 251, 152)", // pale green
  "rgb(238, 232, 170)", // pale goldenrod
  "rgb(230, 230, 250)", // lavender
  "rgb(255, 218, 185)", // peach
];

export default function RoomsView({
  ownedRooms,
  roomInvites,
}: {
  ownedRooms: Room[];
  roomInvites: Room[];
}) {
  const [viewMode, setViewMode] = useState("owns");
  const [selected, setSelected] = useState<string | null>(null);
  const router = useRouter();
  const outerDivRef = useRef<HTMLDivElement>(null);

  const filteredRooms = useMemo(() => {
    if (viewMode === "owns") {
      return ownedRooms;
    } else if (viewMode === "shared") {
      return roomInvites;
    }
    return [];
  }, [viewMode, ownedRooms, roomInvites]);

  const roomColors = useMemo(() => {
    return filteredRooms.map((room, index) => ({
      id: room.id,
      color: PASTEL_COLORS[index % PASTEL_COLORS.length],
    }));
  }, [filteredRooms]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        outerDivRef.current &&
        !outerDivRef.current.contains(e.target as Node)
      ) {
        setSelected(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={outerDivRef} className="flex flex-col gap-5">
      <div className="flex gap-1">
        <ViewModeButton
          onSelect={() => setViewMode("owns")}
          active={viewMode === "owns"}
          text="My project"
        />
        <ViewModeButton
          onSelect={() => setViewMode("shared")}
          active={viewMode === "shared"}
          text="Shared files"
        />
      </div>
      <div className="flex flex-wrap gap-4">
        {filteredRooms.map((room) => {
          const roomColor =
            roomColors.find((rc) => rc.id === room.id)?.color ??
            PASTEL_COLORS[0]!;

          return (
            <React.Fragment key={room.id}>
              <SingleRoom
                id={room.id}
                title={room.title}
                description={`Created ${room.createdAt.toDateString()}`}
                color={roomColor}
                selected={selected === room.id}
                select={() => setSelected(room.id)}
                navigateTo={() => router.push("/dashboard/" + room.id)}
                canEdit={viewMode === "owns"}
              />
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}

function SingleRoom({
  id,
  title,
  description,
  color,
  selected,
  select,
  navigateTo,
  canEdit,
}: {
  id: string;
  title: string;
  description: string;
  color: string;
  selected: boolean;
  select: () => void;
  navigateTo: () => void;
  canEdit: boolean;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

  const handleKeyPress = async (
    event: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (event.key === "Enter") {
      event.preventDefault();
      setIsEditing(false);
      await updateRoomTitle(editedTitle, id);
    }
  };

  const handleBlur = async () => {
    setIsEditing(false);
    await updateRoomTitle(editedTitle, id);
  };

  const confirmDelete = async () => {
    await deleteRoom(id);
    setShowConfirmationModal(false);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Backspace" && selected && !isEditing) {
        e.preventDefault();
        setShowConfirmationModal(true);
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [selected, id, isEditing]);

  return (
    <div
      onDoubleClick={navigateTo}
      onClick={select}
      className={`flex flex-col gap-0.5 rounded-md border border-gray-200 pb-1 ${selected ? "border-2 border-lime-500" : "border border-[#e8e8e8]"} cursor-pointer`}
    >
      <div
        style={{ backgroundColor: color }}
        className={`flex h-56 w-96 items-center justify-center rounded-md`}
      >
        <p className="text-md font-medium select-none">{title}</p>
      </div>
      <div className="ml-1.5 flex items-center justify-between">
        <div className="flex flex-col">
          {isEditing && canEdit ? (
            <input
              type="text"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              onBlur={handleBlur}
              onKeyPress={handleKeyPress}
              autoFocus
              className="w-full"
            />
          ) : (
            <p
              onClick={() => setIsEditing(true)}
              className="mt-2 text-[13px] font-medium select-none"
            >
              {title}
            </p>
          )}
          <p className="text-[10px] text-gray-400 select-none">{description}</p>
        </div>
        <ConfirmationModal
          isOpen={showConfirmationModal}
          onClose={() => setShowConfirmationModal(false)}
          onConfirm={confirmDelete}
          message="Are you sure you want to delete this room?"
        />
        <DropdownMenu>
          <DropdownMenuTrigger className="rounded-full hover:bg-gray-100 focus:outline-none">
            <EllipsisVertical className="m-2 h-5 w-5" />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem
              onClick={() => setShowConfirmationModal(true)}
              className="hover:bg-red-100/80 hover:text-red-500"
            >
              <Trash2 className="h-4 w-4" />
              <span className="">Delete room</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}

function ViewModeButton({
  onSelect,
  active,
  text,
}: {
  onSelect: () => void;
  active: boolean;
  text: string;
}) {
  return (
    <button
      onClick={onSelect}
      className={`rounded-md p-1 px-2 text-[11px] select-none hover:bg-gray-100 ${active ? "bg-gray-100" : ""}`}
    >
      {text}
    </button>
  );
}
