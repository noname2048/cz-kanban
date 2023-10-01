import StarSolid from "@/components/mobx/movie-rate/icons/StarSolid.tsx";
import StartOutline from "@/components/mobx/movie-rate/icons/StarOutline.tsx";
import TrashOutline from "@/components/mobx/movie-rate/icons/TrashOutline.tsx";
import { cn } from "@/libs/cn.ts";
import { ClassValue } from "clsx";
import { useState } from "react";

type Props = {
  className?: ClassValue;
  title: string;
  rate: number;
  onChange: (value: number) => void;
  onDelete: () => void;
};

export default function Card({
  className,
  title,
  rate,
  onChange,
  onDelete,
}: Props) {
  const [isHover, setIsHover] = useState(false);
  const [starRate, setStarRate] = useState(rate);

  return (
    <div
      className={cn("flex flex-row items-center items-center gap-4", className)}
    >
      <div className="font-bold ">{title}</div>
      <div className="flex flex-row items-center gap-1 bg-yellow-200 p-2">
        {Array.from({ length: 5 }).map((_, index) => {
          const _rate = isHover ? starRate : rate;
          return (
            <div
              key={index}
              className="fill-pink-50 stroke-blue-600"
              onMouseOver={() => {
                setIsHover(true);
                setStarRate(index + 1);
              }}
              onMouseLeave={() => {
                setIsHover(false);
                setStarRate(0);
              }}
              onClick={() => onChange(index + 1)}
            >
              {index + 1 <= _rate ? (
                <StarSolid className="fill-emerald-500" />
              ) : (
                <StartOutline className="" />
              )}
            </div>
          );
        })}
      </div>
      <div>{rate}</div>
      <div
        className="group flex items-center justify-center p-3"
        onClick={() => onDelete()}
      >
        <TrashOutline className="stroke-black group-hover:stroke-white" />
      </div>
    </div>
  );
}
