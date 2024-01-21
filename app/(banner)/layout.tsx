import React from "react";
import ImageSlider from "@/components/layouts/image-slider";
import BannerImg from "@/public/image/banner1.jpg";

export default function Layout({ children }: { children: React.ReactNode }) {
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

  return (
    <div className="">
      <div className="bg-black">
        <ImageSlider slides={slides} />
      </div>
      <div className="Box">{children}</div>
    </div>
  );
}
