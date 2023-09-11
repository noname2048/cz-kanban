import clsx from "clsx";
import { twMerge, ClassNameValue } from "tailwind-merge";

const cn = (...args: ClassNameValue[]) => clsx(twMerge(...args));

export { cn };
