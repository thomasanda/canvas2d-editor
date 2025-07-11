export interface ISpacerProps {
  height?: string | number;
  width?: string | number | null;
  flex?: boolean;
}
export const Spacer = ({
  height = "10px",
  width = null,
  flex = false,
}: ISpacerProps) => (
  <div
    style={{
      height,
      width: width || "auto",
      flexGrow: flex ? 1 : 0,
      flexShrink: 0,
      display: width ? "inline-block" : "block",
    }}
  />
);
