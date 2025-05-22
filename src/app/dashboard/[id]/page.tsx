import Canvas from "@/components/canvas/Canvas";
import Room from "@/components/liveblocks/Room";
import { auth } from "@/server/auth";

type ParamsType = Promise<{ id: string }>;

export default async function Page({ params }: { params: ParamsType }) {
  const { id } = await params;

  const session = await auth();

  // session?.user.id
  return (
    <Room roomId={`room:${id}`}>
      <Canvas />
    </Room>
  );
}
