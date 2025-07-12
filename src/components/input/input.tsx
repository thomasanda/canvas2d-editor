import { useEffect, type ChangeEvent, type RefObject } from "react";
import type Scene from "../../scene";
import { useForceUpdate } from "../../hooks/use-force";

type TInputProps = {
  sceneRef: RefObject<Scene | null>;
};

export const Input = ({ sceneRef }: TInputProps) => {
  const forceUpdate = useForceUpdate();

  useEffect(() => {
    if (!sceneRef.current) return;

    const unsubscribe = sceneRef.current.addListener(() => {
      forceUpdate();
    });

    return () => {
      unsubscribe();
    };
  }, [forceUpdate, sceneRef]);

  const duration =
    typeof sceneRef.current?.duration === "number"
      ? sceneRef.current.duration / 1000
      : 1;

  const onChangeDuration = (evt: ChangeEvent<HTMLInputElement>) => {
    const { value } = evt.target;
    const newDuration = value === "" || +value < 1 ? 1 : +value;
    if (!sceneRef.current) return;
    sceneRef.current.updateDuration(newDuration * 1000);
  };

  return (
    <>
      <div>Duration:</div>
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
    </>
  );
};
