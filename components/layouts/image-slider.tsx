"use client";
import { useState, useEffect, useRef, useMemo } from "react";

import Image, { StaticImageData } from "next/image";
export default function ImageSlider({
  slides,
}: {
  slides: {
    key: number;
    img: StaticImageData;
    title: string;
  }[];
}) {
  //* ------------ variables ------------//

  const [current, setCurrent] = useState(0); //current slide index
  const slidesRef = useRef(slides); //
  const button = useMemo(() => {
    return [
      {
        id: 1,
        d: "M15 19l-7-7 7-7",
        span: "Previous",
        click: () =>
          setCurrent((prevState) => (prevState === 0 ? 0 : prevState - 1)),
      },
      {
        id: 2,
        d: "M9 5l7 7-7 7",
        span: "Next",
        click: () =>
          setCurrent((prevState) =>
            prevState === slides.length - 1 ? slides.length - 1 : prevState + 1
          ),
      },
    ];
  }, []);

  //* ------------ useEffect ------------//

  useEffect(() => {
    const interval = setTimeout(() => {
      setCurrent((prevState) => {
        console.log("prev" + prevState);
        return prevState === slides.length - 1 ? 0 : prevState + 1;
      });
      console.log("current" + current);
    }, 6000);

    return () => {
      clearInterval(interval);
    };
  }, [current, slides.length]);

  //* ------------ return ------------//
  return (
    <div
      id="default-carousel"
      className="Box h-full relative"
      data-carousel="static"
    >
      <ol className="flex overflow-hidden">
        {slidesRef.current.map((element, idx) => {
          return (
            <li
              key={element.key}
              style={{ transform: `translate(${-current * 100}%)` }}
              className={` basis-full shrink-0 h-full ease-in-out transition-all duration-1000`}
              data-carousel-item={idx}
            >
              {element.key}
              <Image
                priority
                src={element.img}
                className={`block object-contain w-full h-full `}
                alt={element.title}
              />
            </li>
          );
        })}
      </ol>

      <ol className="flex absolute bottom-5 left-1/2 z-0 space-x-3 -translate-x-1/2">
        {slidesRef.current.map((element, idx) => {
          return (
            <li key={element.key}>
              <button
                type="button"
                className={`w-3 h-3 rounded-full ${
                  current === idx ? "bg-white" : "bg-gray-600"
                }`}
                aria-current="false"
                aria-label={`Slide ${idx}`}
                data-carousel-slide-to={idx + 1}
                onClick={() => setCurrent(idx)}
              ></button>
            </li>
          );
        })}
      </ol>
      {button.map((element, idx) => (
        <button
          key={element.id}
          type="button"
          style={idx === 0 ? { left: "0" } : { right: "0" }}
          className="flex absolute top-0 z-20 justify-center items-center px-4 h-full cursor-pointer group focus:outline-none"
          data-carousel-next
          onClick={element.click}
        >
          <span className="inline-flex justify-center items-center w-8 h-8 rounded-full sm:w-10 sm:h-10 group-hover:bg-white/30  group-focus:ring-white  group-focus:outline-none">
            <svg
              className="w-5 h-5 text-white sm:w-6 sm:h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              top-0
            >
              <path
                stroke-linecap="square"
                stroke-linejoin="square"
                // stroke-width={isMobile ? "6" : "4"}
                d={element.d}
              ></path>
            </svg>
            <span className="hidden">{element.span}</span>
          </span>
        </button>
      ))}
    </div>
  );
}
