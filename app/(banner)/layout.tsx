import React from "react";
import ImageSlider from "@/components/layouts/image-slider";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <div className="bg-black ">
        <ImageSlider />
      </div>
      <div className="Box">{children}</div>
    </div>
  );
}
