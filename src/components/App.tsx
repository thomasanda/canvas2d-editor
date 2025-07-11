import {
  useRef,
  type PointerEvent,
  useEffect,
  useState,
  useCallback,
} from "react";
import Scene from "../scene";
import "./app.css";

export const App = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const sceneRef = useRef<Scene | null>(null);

  const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 });

  const updateCanvasSize = useCallback(() => {
    if (canvasRef.current) {
      const rect = canvasRef.current.getBoundingClientRect();
      setCanvasSize({
        width: rect.width,
        height: rect.height,
      });
    }
  }, []);

  useEffect(() => {
    if (!canvasRef.current) return;
    sceneRef.current = new Scene(canvasRef.current);
    updateCanvasSize();

    window.addEventListener("resize", updateCanvasSize);
    return () => window.removeEventListener("resize", updateCanvasSize);
  }, [updateCanvasSize]);

  useEffect(() => {
    if (!canvasRef.current || !sceneRef.current) return;
    canvasRef.current.width = canvasSize.width;
    canvasRef.current.height = canvasSize.height;
    sceneRef.current.redraw();
  }, [canvasSize]);

  const onPointerDown = (evt: PointerEvent<HTMLCanvasElement>) => {
    if (!sceneRef.current) return;
    const { clientX, clientY } = evt;
    sceneRef.current.updateElement(clientX, clientY);
  };

  const onAddRectangle = (evt: PointerEvent<HTMLCanvasElement>) => {
    if (!sceneRef.current || !canvasRef.current) return;
    const { width, height } = canvasRef.current;
    const count = evt.shiftKey ? 1001 : 1;
    for (let i = 0; i < count; i++) {
      sceneRef.current.addElement(width, height);
    }
  };

  const onPointerMove = (evt: PointerEvent<HTMLCanvasElement>) => {
    if (!sceneRef.current) return;
    const { clientX, clientY } = evt;
    sceneRef.current.setHoveredElement(clientX, clientY);
  };

  return (
    <div className="main-container">
      <div className="canvas-container">
        <canvas
          id="drawing-canvas"
          ref={canvasRef}
          width={canvasSize.width}
          height={canvasSize.height}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
        ></canvas>
      </div>
      <div className="sidebar">
        <button onClick={onAddRectangle}>Add Rectangle</button>
        <div className="canvas-info">
          <small>
            Canvas: {canvasSize.width} × {canvasSize.height}
          </small>
        </div>
      </div>
    </div>
  );
};
