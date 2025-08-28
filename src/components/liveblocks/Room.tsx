"use client";

import type { Layer } from "@/types";
import { LiveList, LiveMap, type LiveObject } from "@liveblocks/client";
import {
  ClientSideSuspense,
  LiveblocksProvider,
  RoomProvider,
} from "@liveblocks/react";
import React, { type ReactNode } from "react";
import { Spinner } from "../spinner";

const Room = ({
  children,
  roomId,
}: {
  children: ReactNode;
  roomId: string;
}) => {
  return (
    <LiveblocksProvider authEndpoint="/api/liveblocks-auth">
      <RoomProvider
        id={roomId}
        initialPresence={{
          selection: [],
          cursor: null,
          penColor: null,
          pencilDraft: null,
        }}
        initialStorage={{
          roomColor: { r: 18, g: 18, b: 18, a: 1 },
          layers: new LiveMap<string, LiveObject<Layer>>(),
          layerIds: new LiveList([]),
        }}
      >
        <ClientSideSuspense fallback={<Spinner />}>
          {children}
        </ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
  );
};

export default Room;
