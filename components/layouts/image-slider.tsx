"use client";
import { useState, useEffect, useRef } from "react";
import BannerImg from "@/public/image/banner1.jpg";
import Image from "next/image";
export default function ImageSlider() {
  const slides = [
    {
      key: 0,
      img: BannerImg,
      title: "banner1",
    },
    {
      key: 1,
      img: BannerImg,
      title: "banner2",
    },
    {
      key: 2,
      img: BannerImg,
      title: "banner3",
    },
    {
      key: 3,
      img: BannerImg,
      title: "banner4",
    },
  ];
  //* ------------ variables ------------//
  const [current, setCurrent] = useState(0); //current slide index
  const slidesRef = useRef(slides); //slides

  //* ------------ useEffect ------------//
  const prevSlider = () => {
    setCurrent((prevState) => (prevState === 0 ? 0 : prevState - 1));
  };
  const nextSlider = () => {
    setCurrent((prevState) =>
      prevState === slides.length - 1 ? slides.length - 1 : prevState + 1
    );
  };
  const prevButton = {
    id: "⬅️",
    d: "M15 19l-7-7 7-7",
    span: "Previous",
    click: prevSlider,
  };
  const nextButton = {
    id: "➡️",
    d: "M9 5l7 7-7 7",
    span: "Next",
    click: nextSlider,
  };
  const button = [prevButton, nextButton];

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
  }, [current]);

  //* ------------ return ------------//
  return (
    <div
      id="default-carousel"
      className="Box h-full relative z-0"
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
                src={element.img}
                className={`block object-contain w-full h-full `}
                alt={element.title}
              />
            </li>
          );
        })}
      </ol>

      <div className="flex absolute bottom-5 left-1/2 z-30 space-x-3 -translate-x-1/2">
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
              ></button>
            </li>
          );
        })}
      </div>
      {button.map((element, idx) => (
        <button
          key={element.id}
          type="button"
          id={element.id}
          style={idx === 0 ? { left: "0" } : { right: "0" }}
          className="flex absolute top-0 z-30 justify-center items-center px-4 h-full cursor-pointer group focus:outline-none"
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
