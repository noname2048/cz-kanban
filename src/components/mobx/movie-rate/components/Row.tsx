import { ClassValue } from "clsx";
import { ReactNode } from "react";
import { cn } from "@/libs/cn.ts";

type Props = {
  className?: ClassValue;
  children?: ReactNode;
};

export default ({ className, children }: Props) => {
  return <div className={cn(className)}>{children}</div>;
};
