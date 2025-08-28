"use client";

import {
  colorToCss,
  connectionIdToColor,
  findIntersectionLayerWithRectangle,
  penPointsToPathLayer,
  pointerEventToCanvasPoint,
  resizeBounds,
} from "@/utils";
import {
  useHistory,
  useCanRedo,
  useCanUndo,
  useMutation,
  useStorage,
  useSelf,
  useOthers,
} from "@liveblocks/react";
import React, { useCallback, useEffect, useState } from "react";
import LayerComponent from "./LayerComponent";
import {
  LayerType,
  type RectangleLayer,
  type Layer,
  type Point,
  type Camera,
  type EllipseLayer,
  CanvasMode,
  type CanvasState,
  type NoteLayer,
  type TextLayer,
  type Side,
  type XYWH,
} from "@/types";
import { LiveObject } from "@liveblocks/client";
import { nanoid } from "nanoid";
import ToolsBar from "../toolsbar/ToolsBar";
import Path from "./Path";
import SelectionBox from "./SelectionBox";
import useDeleteLayers from "@/hooks/useDeleteLayers";
import SelectionTools from "./SelectionTools";
import UserAvatar from "../toolsbar/UserAvatar";
import MultiplayerGuides from "./MultiplayerGuides";
import type { User } from "@prisma/client";
import ShareMenu from "../toolsbar/ShareMenu";
import VoiceChat from "./VoiceChat";
import ToolButton from "../toolsbar/tool-Button";
import { ArrowLeft, LocateFixed } from "lucide-react";
import Link from "next/link";
import { updateRoomTitle } from "@/app/actions/rooms";

const MAX_LAYERS = 100;

const Canvas = ({
  roomId,
  othersWithAccessToRoom,
  roomName
}: {
  roomName: string;
  roomId: string;
  othersWithAccessToRoom: User[];
}) => {
  const roomColor = useStorage((root) => root.roomColor);
  const layerIds = useStorage((root) => root.layerIds);
  const [camera, setCamera] = useState<Camera>({ x: 0, y: 0, zoom: 1 });
  const [canvasState, setCanvasState] = useState<CanvasState>({
    mode: CanvasMode.None,
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(roomName);
  const pencilDraft = useSelf((me) => me.presence.pencilDraft);
  const history = useHistory();
  const canUndo = useCanUndo();
  const canRedo = useCanRedo();
  const deleteLayers = useDeleteLayers();
  const me = useSelf();
  const others = useOthers();

  const handleKeyPress = async (
    event: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (event.key === "Enter") {
      event.preventDefault();
      setIsEditing(false);
      await updateRoomTitle(editedTitle, roomId);
    }
  };

  const handleBlur = async () => {
    setIsEditing(false);
    await updateRoomTitle(editedTitle, roomId);
  };


  const selectAllLayers = useMutation(
    ({ setMyPresence }) => {
      if (layerIds) {
        setMyPresence({ selection: [...layerIds] }, { addToHistory: true });
      }
    },
    [layerIds],
  );

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      const activeElement = document.activeElement;
      const isInputField =
        activeElement &&
        (activeElement.tagName === "INPUT" ||
          activeElement.tagName === "TEXTAREA");
      if (isInputField) return;

      switch (e.key) {
        case "Backspace":
          deleteLayers();
          break;
        case "z":
          if (e.ctrlKey || e.metaKey) {
            history.undo();
          }
          break;
        case "q":
          if (e.ctrlKey || e.metaKey) {
            history.redo();
          }
          break;
        case "a":
          selectAllLayers();
          break;
      }
    }

    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [deleteLayers, history, selectAllLayers]);

  const onLayerPointerDown = useMutation(
    ({ self, setMyPresence }, e: React.PointerEvent, layerId: string) => {
      if (
        canvasState.mode === CanvasMode.Pencil ||
        canvasState.mode === CanvasMode.Inserting
      ) {
        return;
      }

      e.stopPropagation();
      if (!self.presence.selection.includes(layerId)) {
        setMyPresence(
          {
            selection: [layerId],
          },
          { addToHistory: true },
        );
      }

      if (e.nativeEvent.button === 2) {
        setCanvasState({ mode: CanvasMode.RightClick });
      } else {
        const point = pointerEventToCanvasPoint(e, camera);
        setCanvasState({ mode: CanvasMode.Translating, current: point });
      }
    },
    [canvasState.mode, camera],
  );

  const onResizeHandlePointerDown = useCallback(
    (corner: Side, initialBounds: XYWH) => {
      history.pause();
      setCanvasState({
        mode: CanvasMode.Resizing,
        initialBounds,
        corner,
      });
    },
    [history],
  );

  const insertLayer = useMutation(
    (
      { storage, setMyPresence },
      layerType:
        | LayerType.Ellipse
        | LayerType.Rectangle
        | LayerType.Note
        | LayerType.Text,
      position: Point,
    ) => {
      const liveLayers = storage.get("layers");
      if (liveLayers.size >= MAX_LAYERS) {
        return;
      }

      const liveLayerIds = storage.get("layerIds");
      const layerId = nanoid();
      let layer: LiveObject<Layer> | null = null;

      if (layerType === LayerType.Rectangle) {
        layer = new LiveObject<RectangleLayer>({
          type: LayerType.Rectangle,
          x: position.x,
          y: position.y,
          height: 100,
          width: 100,
          fill: { r: 0, g: 0, b: 0, a: 0 },
          stroke: { r: 255, g: 255, b: 255, a: 1 },
          cornerRadius: 10,
          opacity: 100,
        });
      } else if (layerType === LayerType.Ellipse) {
        layer = new LiveObject<EllipseLayer>({
          type: LayerType.Ellipse,
          x: position.x,
          y: position.y,
          height: 100,
          width: 100,
          fill: { r: 0, g: 0, b: 0, a: 0 },
          stroke: { r: 255, g: 255, b: 255, a: 1 },
          opacity: 100,
        });
      } else if (layerType === LayerType.Note) {
        layer = new LiveObject<NoteLayer>({
          type: LayerType.Note,
          x: position.x,
          y: position.y,
          height: 100,
          width: 100,
          fill: { r: 255, g: 255, b: 255, a: 1 },
          stroke: { r: 255, g: 255, b: 255, a: 1 },
          opacity: 100,
        });
      } else if (layerType === LayerType.Text) {
        layer = new LiveObject<TextLayer>({
          type: LayerType.Text,
          x: position.x,
          y: position.y,
          height: 100,
          width: 100,
          fontSize: 16,
          fontWeight: 400,
          fontFamily: "Inter",
          value: "Text",
          fill: { r: 255, g: 255, b: 255, a: 1 },
          stroke: { r: 255, g: 255, b: 255, a: 1 },
          opacity: 100,
        });
      }

      if (layer) {
        liveLayerIds.push(layerId);
        liveLayers.set(layerId, layer);

        setMyPresence({ selection: [layerId] }, { addToHistory: true });
        setCanvasState({ mode: CanvasMode.None });
      }
    },
    [],
  );

  const translateSelectedLayers = useMutation(
    ({ storage, self }, point: Point) => {
      if (canvasState.mode !== CanvasMode.Translating) {
        return;
      }

      const offset = {
        x: point.x - canvasState.current.x,
        y: point.y - canvasState.current.y,
      };

      const liveLayers = storage.get("layers");
      for (const id of self.presence.selection) {
        const layer = liveLayers.get(id);
        if (layer) {
          layer.update({
            x: layer.get("x") + offset.x,
            y: layer.get("y") + offset.y,
          });
        }
      }

      setCanvasState({ mode: CanvasMode.Translating, current: point });
    },
    [canvasState],
  );

  const resizeSelectedLayer = useMutation(
    ({ storage, self }, point: Point) => {
      if (canvasState.mode !== CanvasMode.Resizing) {
        return;
      }

      const bounds = resizeBounds(
        canvasState.initialBounds,
        canvasState.corner,
        point,
      );

      const liveLayers = storage.get("layers");

      if (self.presence.selection.length > 0) {
        const layer = liveLayers.get(self.presence.selection[0]!);
        if (layer) {
          layer.update(bounds);
        }
      }

      // Update layes to set the new width and height of the layer
    },
    [canvasState],
  );

  const unselectLayers = useMutation(({ self, setMyPresence }) => {
    if (self.presence.selection.length > 0) {
      setMyPresence({ selection: [] });
    }
  }, []);

  const startDrawing = useMutation(
    ({ setMyPresence }, point: Point, pressure: number) => {
      setMyPresence({
        pencilDraft: [[point.x, point.y, pressure]],
        penColor: { r: 255, g: 255, b: 255, a: 1 },
      });
    },
    [],
  );

  const continueDrawing = useMutation(
    ({ self, setMyPresence }, point: Point, e: React.PointerEvent) => {
      const { pencilDraft } = self.presence;

      if (
        canvasState.mode !== CanvasMode.Pencil ||
        e.buttons !== 1 ||
        pencilDraft === null
      ) {
        return;
      }
      setMyPresence({
        cursor: point,
        pencilDraft: [...pencilDraft, [point.x, point.y, e.pressure]],
      });
    },
    [canvasState.mode],
  );

  const insertPath = useMutation(({ storage, self, setMyPresence }) => {
    const liveLayers = storage.get("layers");
    const { pencilDraft } = self.presence;

    if (
      pencilDraft === null ||
      pencilDraft.length < 2 ||
      liveLayers.size >= MAX_LAYERS
    ) {
      setMyPresence({ pencilDraft: null });
      return;
    }

    const id = nanoid();
    liveLayers.set(
      id,
      new LiveObject(
        penPointsToPathLayer(pencilDraft, { r: 255, g: 255, b: 255, a: 1 }),
      ),
    );

    const liveLayerIds = storage.get("layerIds");
    liveLayerIds.push(id);
    setMyPresence({ pencilDraft: null });
    setCanvasState({ mode: CanvasMode.Pencil });
  }, []);

  const onPointerUp = useMutation(
    ({ }, e: React.PointerEvent) => {
      if (canvasState.mode === CanvasMode.RightClick) return;

      const point = pointerEventToCanvasPoint(e, camera);

      if (
        canvasState.mode === CanvasMode.None ||
        canvasState.mode === CanvasMode.Pressing
      ) {
        unselectLayers();
        setCanvasState({ mode: CanvasMode.None });
      } else if (canvasState.mode === CanvasMode.Inserting) {
        insertLayer(canvasState.layerType, point);
      } else if (canvasState.mode === CanvasMode.Dragging) {
        setCanvasState({ mode: CanvasMode.Dragging, origin: null });
      } else if (canvasState.mode === CanvasMode.Pencil) {
        insertPath();
      } else {
        setCanvasState({ mode: CanvasMode.None });
      }
      history.resume();
    },
    [canvasState, setCanvasState, insertLayer, unselectLayers, history],
  );

  const onWheel = useCallback((e: React.WheelEvent) => {
    setCamera((camera) => ({
      x: camera.x - e.deltaX,
      y: camera.y - e.deltaY,
      zoom: camera.zoom,
    }));
  }, []);

  const startMultiSelection = useCallback((current: Point, origin: Point) => {
    if (Math.abs(current.x - origin.x) + Math.abs(current.y - origin.y) > 5) {
      setCanvasState({ mode: CanvasMode.SelectionNet, origin, current });
    }
  }, []);

  const updateSelectionNet = useMutation(
    ({ storage, setMyPresence }, current: Point, origin: Point) => {
      if (layerIds) {
        const layers = storage.get("layers").toImmutable();
        setCanvasState({
          mode: CanvasMode.SelectionNet,
          origin,
          current,
        });
        const ids = findIntersectionLayerWithRectangle(
          layerIds,
          layers,
          origin,
          current,
        );
        setMyPresence({ selection: ids });
      }
    },
    [layerIds],
  );

  const onPointerMove = useMutation(
    ({ setMyPresence }, e: React.PointerEvent) => {
      const point = pointerEventToCanvasPoint(e, camera);
      if (canvasState.mode === CanvasMode.Pressing) {
        startMultiSelection(point, canvasState.origin);
      } else if (canvasState.mode === CanvasMode.SelectionNet) {
        updateSelectionNet(point, canvasState.origin);
      } else if (
        canvasState.mode === CanvasMode.Dragging &&
        canvasState.origin !== null
      ) {
        const deltaX = e.movementX;
        const deltaY = e.movementY;

        setCamera((camera) => ({
          x: camera.x + deltaX,
          y: camera.y + deltaY,
          zoom: camera.zoom,
        }));
      } else if (canvasState.mode === CanvasMode.Pencil) {
        continueDrawing(point, e);
      } else if (canvasState.mode === CanvasMode.Resizing) {
        resizeSelectedLayer(point);
      } else if (canvasState.mode === CanvasMode.Translating) {
        translateSelectedLayers(point);
      }
      setMyPresence({ cursor: point });
    },
    [
      camera,
      canvasState,
      setCanvasState,
      insertLayer,
      continueDrawing,
      resizeSelectedLayer,
      updateSelectionNet,
      startMultiSelection,
    ],
  );

  const onPointerLeave = useMutation(({ setMyPresence }) => {
    setMyPresence({ cursor: null });
  }, []);

  const onPointerDown = useMutation(
    ({ }, e: React.PointerEvent) => {
      if (canvasState.mode === CanvasMode.RightClick) return;
      const point = pointerEventToCanvasPoint(e, camera);

      if (canvasState.mode === CanvasMode.Dragging) {
        setCanvasState({ mode: CanvasMode.Dragging, origin: point });
        return;
      }

      if (canvasState.mode === CanvasMode.Inserting) return;

      if (canvasState.mode === CanvasMode.Pencil) {
        startDrawing(point, e.pressure);
        return;
      }

      setCanvasState({ mode: CanvasMode.Pressing, origin: point });
    },
    [canvasState.mode, setCanvasState, camera, startDrawing],
  );

  return (
    <div className="bg-background flex h-screen w-full flex-col">
      <header
        style={{ backgroundColor: "#121212" }}
        className="bg-background border-border z-20 flex h-17 items-center justify-center border-b px-4 backdrop-blur-sm"
      >
        <div className="flex items-center space-x-4">
          <Link href="/dashboard" className="text-foreground-secondary">
            <ArrowLeft size={20} />
          </Link>

          <div className="bg-border h-6 w-px"></div>

          <div className="flex items-center">
            {isEditing ? (
              <input
                type="text"
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
                onBlur={handleBlur}
                onKeyDown={handleKeyPress}
                autoFocus
                className="bg-background-tertiary border-border focus:ring-accent rounded border px-2 py-1 text-sm font-medium focus:border-transparent focus:ring-2 focus:outline-none"
              />
            ) : (
              <h1
                className="hover:text-gray-400 cursor-pointer text-lg font-medium transition-colors"
                onClick={() => setIsEditing(true)}
              >
                {roomName}
              </h1>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between px-2 border-2 border-border rounded-lg ml-auto">
          <div className="flex w-full max-w-36 gap-2 p-3 text-xs">
            {me && (
              <UserAvatar
                color={connectionIdToColor(me.connectionId)}
                name={me.info.name}
              />
            )}
            {others.map((other) => (
              <UserAvatar
                key={other.connectionId}
                color={connectionIdToColor(other.connectionId)}
                name={other.info.name}
              />
            ))}
          </div>
          <ShareMenu
            roomId={roomId}
            othersWithAccessToRoom={othersWithAccessToRoom}
          />
          <div className="">
            <VoiceChat />
          </div>
        </div>
      </header>

      <main className="fixed right-0 left-0 h-screen overflow-y-auto">
        {/* Center Button */}
        <div className="bg-background-secondary shadow-soft absolute bottom-4 left-50 z-10 flex -translate-x-1/2 items-center justify-center gap-3 rounded-lg px-2 py-1 text-white select-none">
          <p>{`x: ${camera.x.toFixed(1)}, y: ${camera.y.toFixed(1)}, zoom: ${camera.zoom.toFixed(1)}`}</p>
          <ToolButton
            label="Center"
            icon={LocateFixed}
            onClick={() => setCamera({ x: 0, y: 0, zoom: 1 })}
          />
        </div>

        <div
          className="bg-background h-full w-full touch-none"
          style={{
            backgroundColor: roomColor ? colorToCss(roomColor) : "#1e1e1e",
          }}
        >
          <SelectionTools camera={camera} canvasMode={canvasState.mode} />
          <svg
            onWheel={onWheel}
            onPointerLeave={onPointerLeave}
            onPointerUp={onPointerUp}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            className="h-full w-full"
            onContextMenu={(e) => e.preventDefault()}
          >
            <g
              style={{
                transform: `translate(${camera.x}px, ${camera.y}px) scale(${camera.zoom})`,
              }}
            >
              {layerIds?.map((layerId) => (
                <LayerComponent
                  key={layerId}
                  id={layerId}
                  onLayerPointerDown={onLayerPointerDown}
                />
              ))}
              <SelectionBox
                onResizeHandlePointerDown={onResizeHandlePointerDown}
              />
              {canvasState.mode === CanvasMode.SelectionNet &&
                canvasState.current != null && (
                  <rect
                    className="fill-lime-500/5 stroke-lime-600 stroke-1"
                    x={Math.min(canvasState.origin.x, canvasState.current.x)}
                    y={Math.min(canvasState.origin.y, canvasState.current.y)}
                    width={Math.abs(
                      canvasState.origin.x - canvasState.current.x,
                    )}
                    height={Math.abs(
                      canvasState.origin.y - canvasState.current.y,
                    )}
                  />
                )}
              <MultiplayerGuides />
              {pencilDraft !== null && pencilDraft.length > 0 && (
                <Path
                  x={0}
                  y={0}
                  // stroke={{ r: 217, g: 217, b: 217 }}
                  fill={colorToCss({ r: 255, b: 255, g: 255, a: 1 })}
                  opacity={100}
                  points={pencilDraft}
                />
              )}
            </g>
          </svg>
        </div>
      </main>

      <ToolsBar
        canvasState={canvasState}
        setCanvasState={(newState) => setCanvasState(newState)}
        canRedo={canRedo}
        canUndo={canUndo}
        undo={history.undo}
        redo={history.redo}
        zoomIn={() => {
          setCamera((camera) => ({ ...camera, zoom: camera.zoom + 0.1 }));
        }}
        zoomOut={() => {
          setCamera((camera) => ({ ...camera, zoom: camera.zoom - 0.1 }));
        }}
        canZoomIn={camera.zoom < 2}
        canZoomOut={camera.zoom > 0.5}
      />
    </div>
  );
};

export default Canvas;
