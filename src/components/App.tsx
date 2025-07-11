import {
  useRef,
  type PointerEvent,
  useEffect,
  useState,
  useCallback,
  type MouseEvent,
  type ChangeEvent,
} from "react";
import Scene from "../scene";
import "./app.css";
import { Spacer } from "./spacer";
import { DPR } from "../utils/constants";

export const App = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const sceneRef = useRef<Scene | null>(null);

  const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 });
  const [duration, setDuration] = useState(1);

  const updateCanvasSize = useCallback(() => {
    if (canvasRef.current) {
      const rect = canvasRef.current.getBoundingClientRect();
      const ctx = canvasRef.current.getContext("2d");
      if (!ctx) return;
      ctx.scale(DPR, DPR);
      setCanvasSize({
        width: rect.width * DPR,
        height: rect.height * DPR,
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

  const onAddRectangle = () => {
    if (!sceneRef.current || !canvasRef.current) return;
    const { width, height } = canvasRef.current;
    sceneRef.current.addElement(width, height);
  };

  const onPointerMove = (evt: PointerEvent<HTMLCanvasElement>) => {
    if (!sceneRef.current) return;
    const { clientX, clientY } = evt;
    sceneRef.current.setHoveredElement(clientX, clientY);
  };

  const onAnimate = () => {
    if (!sceneRef.current) return;
    sceneRef.current.startRotationAnimation();
  };

  const onChangeDuration = (evt: ChangeEvent<HTMLInputElement>) => {
    const { value } = evt.target;
    const newDuration = value === "" ? 1 : +value;
    setDuration(newDuration);
    if (!sceneRef.current) return;
    sceneRef.current.updateDuration(newDuration * 1000);
  };

  const onDownload = () => {
    if (!sceneRef.current) return;
    sceneRef.current.downloadFile();
  };

  const onUpload = () => {
    if (!sceneRef.current) return;
    sceneRef.current.uploadFile();
  };

  const onPointerLeave = () => {
    if (!sceneRef.current) return;
    sceneRef.current.clearHoveredElement();
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
          onPointerLeave={onPointerLeave}
        ></canvas>
      </div>
      <div className="sidebar">
        <button onClick={onAddRectangle}>Add Rectangle</button>
        <Spacer />
        <div>Duration:</div>
        <Spacer />
        <input
          type="number"
          min="1"
          step="1"
          onChange={onChangeDuration}
          value={duration}
          onFocus={(e) => e.target.select()}
        />
        <Spacer />
        <button onClick={onAnimate}>Play</button>
        <Spacer />
        <Spacer />
        <button onClick={onDownload}>Download .json</button>
        <Spacer />
        <button onClick={onUpload}>Upload .json</button>
      </div>
    </div>
  );
};
