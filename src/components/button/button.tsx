import type { MouseEventHandler } from "react";

type TButtonProps = {
  onClick: MouseEventHandler<HTMLButtonElement>;
  content: string;
};

export const Button = ({ onClick, content }: TButtonProps) => {
  return <button onClick={onClick}>{content}</button>;
};
