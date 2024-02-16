"use client";
import { Positions } from "@/lib/utils/const";
import { Position } from "@/lib/utils/types";
import { Dispatch, SetStateAction, useState } from "react";
import { twMerge } from "tailwind-merge";
import { Up, Down } from "@/components/svg/arrows";
export default function SortButton({
  selected,
  setSelected,
}: {
  selected: Position | null;
  setSelected: Dispatch<SetStateAction<Position | null>>;
}) {
  const [isOpen, setIsOpen] = useState(false);

  //   const partRef = useRef<HTMLSelectElement>(null);

  const onToggle: React.MouseEventHandler = (e) => {
    setIsOpen(!isOpen);
  };
  return (
    <div className="flex w-full justify-between px-4">
      <div className="flex gap-4">
        <div
          draggable={false}
          className={twMerge(
            "px-4 py-2 bg-gray-200 font-medium rounded-lg transition cursor-pointer selection:bg-transparent",
            isOpen && "bg-black text-white"
          )}
          onClick={onToggle}
        >
          <div className="flex items-center gap-3">
            {selected ? selected : "Part"}

            {isOpen ? <Up /> : <Down />}
          </div>

          {isOpen && (
            <div className="absolute bg-white text-black shadow-lg rounded-lg z-10">
              {Positions.map((element, idx) => (
                <div
                  key={idx}
                  className="px-4 py-2 hover:bg-gray-300 transition"
                  onClick={(e) => {
                    setSelected(element);
                    setIsOpen(false);
                  }}
                >
                  {element}
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="px-4  py-2 bg-gray-200 font-medium rounded-lg hover:bg-gray-300 transition">
          Team
        </div>
      </div>
      <div className="px-4 py-2 bg-gray-200 font-medium rounded-lg hover:bg-gray-300 transition">
        등록곡 많은 순
      </div>
    </div>
  );
}
