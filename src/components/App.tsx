import { useRef, type PointerEvent, useEffect } from "react";
import Scene from "../scene";
import { createNewElement } from "../utils/create-new-element";
import "./app.css";
import { getClickedRectangle } from "../utils/clicked-rectangle";

export const App = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const sceneRef = useRef<Scene | null>(null);

  const onPointerDown = (evt: PointerEvent<HTMLCanvasElement>) => {
    if (!sceneRef.current || !canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const scaleX = canvasRef.current.width / rect.width;
    const scaleY = canvasRef.current.height / rect.height;
    const x = (evt.clientX - rect.left) * scaleX;
    const y = (evt.clientY - rect.top) * scaleY;
    const elements = sceneRef.current.getAllElements();
    const clickedRectangle = getClickedRectangle(elements, x, y);
    if (clickedRectangle) {
      sceneRef.current.updateElement(clickedRectangle.id);
      sceneRef.current.redraw();
    }
  };

  const onAddRectangle = () => {
    if (!sceneRef.current || !canvasRef.current) return;
    const { width, height } = canvasRef.current;
    const newRectangle = createNewElement(width, height);
    sceneRef.current.addElement(newRectangle);
    sceneRef.current.redraw();
  };

  useEffect(() => {
    if (!canvasRef.current) return;
    sceneRef.current = new Scene(canvasRef.current);
  }, []);

  return (
    <div className="main-container">
      <div className="canvas-container">
        <canvas
          id="drawing-canvas"
          ref={canvasRef}
          width={window.innerWidth}
          height={window.innerHeight}
          onPointerDown={onPointerDown}
        ></canvas>
      </div>
      <div className="sidebar">
        <button onClick={onAddRectangle}>Add Rectangle</button>
      </div>
    </div>
  );
};
