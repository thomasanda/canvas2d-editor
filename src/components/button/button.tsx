import type { MouseEventHandler } from "react";

type TButtonProps = {
  onClick: MouseEventHandler<HTMLButtonElement>;
  content: string;
  color?: string;
};

export const Button = ({ onClick, content, color }: TButtonProps) => {
  return (
    <button onClick={onClick} style={color ? { background: color } : undefined}>
      {content}
    </button>
  );
};
