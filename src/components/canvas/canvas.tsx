import type { PointerEvent, RefObject } from "react";
import type Scene from "../../scene";

type TCanvasProps = {
  canvasRef: RefObject<HTMLCanvasElement | null>;
  sceneRef: RefObject<Scene | null>;
  canvasSize: {
    width: number;
    height: number;
  };
};

export const Canvas = ({ canvasRef, sceneRef, canvasSize }: TCanvasProps) => {
  const onPointerMove = (evt: PointerEvent<HTMLCanvasElement>) => {
    if (!sceneRef.current) return;
    const { clientX, clientY } = evt;
    sceneRef.current.setHoveredElement(clientX, clientY);
  };

  const onPointerLeave = () => {
    if (!sceneRef.current) return;
    sceneRef.current.clearHoveredElement();
  };

  const onPointerDown = (evt: PointerEvent<HTMLCanvasElement>) => {
    if (!sceneRef.current) return;
    const { clientX, clientY } = evt;
    sceneRef.current.updateElement(clientX, clientY);
  };

  return (
    <div className="canvas-container">
      <canvas
        id="drawing-canvas"
        ref={canvasRef}
        width={canvasSize.width}
        height={canvasSize.height}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerLeave={onPointerLeave}
      ></canvas>
    </div>
  );
};
