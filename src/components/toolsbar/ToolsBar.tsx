import { CanvasMode, LayerType, type CanvasState } from "@/types";
import React from "react";
import ToolButton from "./tool-Button";
import {
  Circle,
  Hand,
  MousePointer2,
  Pencil,
  Redo2,
  Square,
  StickyNote,
  Type,
  Undo2,
  ZoomIn,
  ZoomOut,
} from "lucide-react";

interface ToolbarProps {
  canvasState: CanvasState;
  setCanvasState: (newState: CanvasState) => void;
  undo: () => void;
  redo: () => void;
  canUndo: boolean;
  canRedo: boolean;
  zoomIn: () => void;
  zoomOut: () => void;
  canZoomIn: boolean;
  canZoomOut: boolean;
}

const ToolsBar = ({
  canvasState,
  setCanvasState,
  undo,
  redo,
  canRedo,
  canUndo,
  zoomIn,
  zoomOut,
  canZoomIn,
  canZoomOut,
}: ToolbarProps) => {
  return (
    <>
      <div className="fixed bottom-4 left-1/2 z-10 flex -translate-x-1/2 items-center justify-center gap-3 p-1">
        <div className="shadow-[0_0_3px_rgba(0,0,0,0.18) flex gap-3 rounded-lg bg-white p-1">
          <ToolButton
            label="Zoom In"
            icon={ZoomIn}
            onClick={zoomIn}
            isDisabled={!canZoomIn}
          />
          <ToolButton
            label="Zoom Out"
            icon={ZoomOut}
            onClick={zoomOut}
            isDisabled={!canZoomOut}
          />
        </div>
        <div className="flex items-center justify-center gap-3 rounded-lg bg-white p-1 shadow-[0_0_3px_rgba(0,0,0,0.18)]">
          <ToolButton
            label="Select"
            icon={MousePointer2}
            onClick={() => setCanvasState({ mode: CanvasMode.None })}
            isActive={
              canvasState.mode === CanvasMode.None ||
              canvasState.mode === CanvasMode.Translating ||
              canvasState.mode === CanvasMode.Pressing ||
              canvasState.mode === CanvasMode.Resizing ||
              canvasState.mode === CanvasMode.SelectionNet
            }
          />
          <ToolButton
            label="Drag"
            icon={Hand}
            onClick={() =>
              setCanvasState({
                mode: CanvasMode.Dragging,
                origin: null,
              })
            }
            isActive={canvasState.mode === CanvasMode.Dragging}
          />
          <ToolButton
            label="Text"
            icon={Type}
            onClick={() =>
              setCanvasState({
                mode: CanvasMode.Inserting,
                layerType: LayerType.Text,
              })
            }
            isActive={
              canvasState.mode === CanvasMode.Inserting &&
              canvasState.layerType === LayerType.Text
            }
          />
          <ToolButton
            label="Sticky Note"
            icon={StickyNote}
            onClick={() =>
              setCanvasState({
                mode: CanvasMode.Inserting,
                layerType: LayerType.Note,
              })
            }
            isActive={
              canvasState.mode === CanvasMode.Inserting &&
              canvasState.layerType === LayerType.Note
            }
          />
          <ToolButton
            label="Rectangle"
            icon={Square}
            onClick={() =>
              setCanvasState({
                mode: CanvasMode.Inserting,
                layerType: LayerType.Rectangle,
              })
            }
            isActive={
              canvasState.mode === CanvasMode.Inserting &&
              canvasState.layerType === LayerType.Rectangle
            }
          />
          <ToolButton
            label="Ellipse"
            icon={Circle}
            onClick={() =>
              setCanvasState({
                mode: CanvasMode.Inserting,
                layerType: LayerType.Ellipse,
              })
            }
            isActive={
              canvasState.mode === CanvasMode.Inserting &&
              canvasState.layerType === LayerType.Ellipse
            }
          />
          <ToolButton
            label="Pen"
            icon={Pencil}
            onClick={() =>
              setCanvasState({
                mode: CanvasMode.Pencil,
              })
            }
            isActive={canvasState.mode === CanvasMode.Pencil}
          />
        </div>

        <div className="ml-3 flex items-center justify-center gap-3 rounded-lg bg-white p-1 shadow-[0_0_3px_rgba(0,0,0,0.18)]">
          <ToolButton
            label="Undo"
            icon={Undo2}
            onClick={undo}
            isDisabled={!canUndo}
          />
          <ToolButton
            label="Redo"
            icon={Redo2}
            onClick={redo}
            isDisabled={!canRedo}
          />
        </div>
      </div>
    </>
  );
};

export default ToolsBar;
