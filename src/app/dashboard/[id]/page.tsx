import Canvas from "@/components/canvas/Canvas";
import Room from "@/components/liveblocks/Room";
import { auth } from "@/server/auth";
import { db } from "@/server/db";
import { redirect } from "next/navigation";

type ParamsType = Promise<{ id: string }>;

export default async function Page({ params }: { params: ParamsType }) {
  const { id } = await params;

  const session = await auth();

  const room = await db.room.findUnique({
    where: { id: id },
    select: {
      title: true,
      ownerId: true,
      roomInvites: {
        select: {
          user: true,
        },
      },
    },
  });

  if (!room) redirect("/404");

  const inviteeUserIds = room.roomInvites.map((invite) => invite.user.id);
  if (
    !inviteeUserIds.includes(session?.user.id ?? "") &&
    session?.user.id !== room.ownerId
  ) {
    redirect("/404");
  }

  return (
    <Room roomId={"room:" + id}>
      <Canvas
        roomName={room.title}
        roomId={id}
        othersWithAccessToRoom={room.roomInvites.map((x) => x.user)}
      />
    </Room>
  );
}
