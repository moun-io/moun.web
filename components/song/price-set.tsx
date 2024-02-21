"use client";
import React, { useState } from "react";
import { Slider } from "@nextui-org/react";

export default function PriceSet() {
  const [price, setPrice] = useState(0) as any;
  return (
    <>
      <h3 className="text-[2.5rem] font-bold">$ {price}</h3>
      <div>
        <Slider
          key="success"
          color="success"
          step={1}
          minValue={20}
          maxValue={2000}
          value={price}
          aria-label="Temperature"
          onChange={setPrice}
        ></Slider>
        <div className="flex justify-between">
          <div>
            <div>20$</div>
            <div>시작가</div>
          </div>
          <div className="text-end">
            <div>2000$</div>
            <div>바로구매가</div>
          </div>
        </div>
      </div>
      <div className="flex w-full gap-4">
        <button className="bg-green-400 rounded-xl p-4 w-full">바로구매</button>
        <button className="bg-neutral-200 rounded-xl p-4 w-full">
          가격제안
        </button>
      </div>
    </>
  );
}
