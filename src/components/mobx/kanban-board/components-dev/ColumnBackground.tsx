import { DraggableAttributes } from "@dnd-kit/core";
import { SyntheticListenerMap } from "@dnd-kit/core/dist/hooks/utilities";
import React from "react";

type Props = {
  children?: React.ReactNode;
  style: React.CSSProperties;
  attributes: DraggableAttributes;
  listeners: SyntheticListenerMap | undefined;
};

const ColumnBackground = React.forwardRef<HTMLDivElement, Props>(
  (
    { children, style, attributes, listeners }: Props,
    ref: React.Ref<HTMLDivElement>,
  ) => {
    return (
      <div
        ref={ref}
        style={style}
        {...attributes}
        {...listeners}
        className="flex h-[500px] max-h-[500px] w-[350px] flex-col rounded-md border-2 border-rose-500 bg-main opacity-40"
      >
        {children}
      </div>
    );
  },
);

export default ColumnBackground;
