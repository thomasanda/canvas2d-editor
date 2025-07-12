import type { RefObject } from "react";
import { Button } from "../button/button";
import { Spacer } from "../spacer/spacer";
import type Scene from "../../scene";
import { Input } from "../input/input";
import { SideBarStrings } from "../../utils/constants";

type TSidebarProps = {
  sceneRef: RefObject<Scene | null>;
  canvasRef: RefObject<HTMLCanvasElement | null>;
};

export const Sidebar = ({ sceneRef, canvasRef }: TSidebarProps) => {
  const onAnimate = () => {
    if (!sceneRef.current) return;
    sceneRef.current.startRotationAnimation();
  };

  const onAddRectangle = () => {
    if (!sceneRef.current || !canvasRef.current) return;
    const { width, height } = canvasRef.current;
    sceneRef.current.addElement(width, height);
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
      <Button onClick={onAddRectangle} content={SideBarStrings.AddRectangle} />
      <Spacer />
      <Input sceneRef={sceneRef} />
      <Spacer />
      <Button onClick={onAnimate} content={SideBarStrings.Play} />
      <Spacer />
      <Spacer />
      <Button onClick={onDownload} content={SideBarStrings.DownloadJSON} />
      <Spacer />
      <Button onClick={onUpload} content={SideBarStrings.UploadJSON} />
    </div>
  );
};
