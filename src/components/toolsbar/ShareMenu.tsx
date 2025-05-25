import { deleteInvitation, shareRoom } from "@/app/actions/rooms";
import type { User } from "@prisma/client";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import UserAvatar from "./UserAvatar";
import { X } from "lucide-react";

export default function ShareMenu({
  roomId,
  othersWithAccessToRoom,
}: {
  roomId: string;
  othersWithAccessToRoom: User[];
}) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | undefined>(undefined);

  const inviteUser = async () => {
    const error = await shareRoom(roomId, email);
    setError(error);
  };
  return (
    <Dialog>
      <DialogTrigger className="h-fit w-fit cursor-pointer rounded-md bg-lime-500 px-4 py-2 text-[11px]">
        Share
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Share this file</DialogTitle>
        </DialogHeader>
        {/* <DialogDescription className="flex h-8 items-center space-x-2"> */}
        <input
          type="text"
          placeholder="Invite others by email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="h-full w-full rounded-md border border-gray-300 px-3 text-xs placeholder:text-gray-500 focus:border-black focus:outline-none"
        />
        <button
          onClick={inviteUser}
          className="h-full rounded-md bg-[#0c8ce9] px-4 py-2 text-[11px] text-white"
        >
          Share
        </button>

        {error && <p className="text-[11px] text-red-500">{error}</p>}
        <p className="text-[11px] text-gray-500">Who has access</p>
        <ul>
          {othersWithAccessToRoom.map((user, index) => (
            <li className="flex items-center justify-between py-1" key={index}>
              <div className="flex items-center space-x-2">
                <UserAvatar
                  name={user.email ?? "Anonymous"}
                  className="h-6 w-6"
                />
                <span className="text-[11px]">{user.email}</span>
              </div>
              <div className="flex items-center space-x-1">
                <span className="text-[11px] text-gray-500">Full access</span>

                <X
                  onClick={() => deleteInvitation(roomId, user.email)}
                  className="h-4 w-4 cursor-pointer text-gray-500"
                />
              </div>
            </li>
          ))}
        </ul>
        {/* </DialogDescription> */}
      </DialogContent>
    </Dialog>
  );
}
