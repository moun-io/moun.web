"use client";

import { Dispatch, SetStateAction, useState } from "react";
import { twMerge } from "tailwind-merge";
import { Up, Down } from "@/components/svg/arrows";
export default function SortButton({
  selected,
  setSelected,
  data,
  defaultName,
}: {
  selected: string | null;
  setSelected: Dispatch<SetStateAction<string | null>>;
  data: readonly string[];
  defaultName: string;
}) {
  const [isOpen, setIsOpen] = useState(false);

  //   const partRef = useRef<HTMLSelectElement>(null);

  const onToggle: React.MouseEventHandler = (e) => {
    setIsOpen(!isOpen);
  };
  return (
    <div
      className={twMerge(
        "px-4 py-2 bg-gray-200 font-medium rounded-lg transition cursor-pointer selection:bg-transparent",
        isOpen && "bg-black text-white"
      )}
      onClick={onToggle}
    >
      <div className="flex items-center gap-3">
        {selected ? selected : defaultName}

        {isOpen ? <Up /> : <Down />}
      </div>

      {isOpen && (
        <div className="absolute bg-white text-black shadow-lg rounded-lg z-10">
          {data.map((element, idx) => (
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
  );
}
