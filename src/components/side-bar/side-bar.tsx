import { useState, type ChangeEvent, type RefObject } from "react";
import { Button } from "../button/button";
import { Spacer } from "../spacer/spacer";
import type Scene from "../../scene";

type TSidebarProps = {
  sceneRef: RefObject<Scene | null>;
  canvasRef: RefObject<HTMLCanvasElement | null>;
};

export const Sidebar = ({ sceneRef, canvasRef }: TSidebarProps) => {
  const [duration, setDuration] = useState(1);

  const onAnimate = () => {
    if (!sceneRef.current) return;
    sceneRef.current.startRotationAnimation();
  };

  const onAddRectangle = () => {
    if (!sceneRef.current || !canvasRef.current) return;
    const { width, height } = canvasRef.current;
    sceneRef.current.addElement(width, height);
  };

  const onChangeDuration = (evt: ChangeEvent<HTMLInputElement>) => {
    const { value } = evt.target;
    const newDuration = value === "" || +value < 1 ? 1 : +value;
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

  return (
    <div className="sidebar">
      <Button onClick={onAddRectangle} content="Add Rectangle" />
      <Spacer />
      <div>Duration:</div>
      <Spacer />
      <div className="duration-input-container">
        <input
          type="number"
          min="1"
          step="1"
          onChange={onChangeDuration}
          value={duration}
          onFocus={(e) => e.target.select()}
        />
      </div>
      <Spacer />
      <Button onClick={onAnimate} content="Play" />
      <Spacer />
      <Spacer />
      <Button onClick={onDownload} content="Download .json" />
      <Spacer />
      <Button onClick={onUpload} content="Upload .json" />
    </div>
  );
};
