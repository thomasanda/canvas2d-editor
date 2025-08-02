import { useRef, useEffect, useState, useCallback } from "react";
import "./App.css";
import { DPR } from "../../utils/constants";
import Scene from "../../scene";
import { Canvas } from "../canvas/canvas";
import { Sidebar } from "../side-bar/side-bar";

export const App = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const sceneRef = useRef<Scene | null>(null);

  const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 });

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
    if (localStorage.getItem("canvasData")) {
      sceneRef.current.loadFromLocalStorage();
    }
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

  return (
    <div className="main-container">
      <Canvas
        canvasRef={canvasRef}
        sceneRef={sceneRef}
        canvasSize={canvasSize}
      />
      <Sidebar canvasRef={canvasRef} sceneRef={sceneRef} />
    </div>
  );
};
