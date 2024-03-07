import React from "react";
import Box from "@/components/song/box";
export default function Page({ params }: { params: { songId: string } }) {
  return (
    <div>
      <div>
        <h1 className="H1">Bid on an Auction</h1>
        <div></div>
      </div>
      <div className="my-8">
        <div></div>
        <div>
          <div className="text-sm text-neutral-500">가든인더하우스</div>
          <div className="font-extrabold text-lg">그림자</div>
        </div>
      </div>
      <Box>
        <div className="flex gap-4">
          <div className="flex flex-col gap-8 mt-1">
            <fieldset>
              <legend className="text-neutral-500"></legend>
              <input type="radio" name="option" value="buy-now" />
              <input type="radio" name="option" value="suggestion" />
            </fieldset>
          </div>
          <ol className="w-full">
            <li>
              <div className="flex justify-between">
                <div className="flex gap-4">바로구매</div>
                <div className="font-bold">$2,000</div>
              </div>
              <div className="text-sm text-neutral-500">
                바로 구매가의 10%을 지불하면 즉시 낙찰됩니다.
              </div>
            </li>
            <li>
              <div className="flex justify-between">
                <div className="flex gap-4">가격제안</div>
                <div className="font-bold">$2,000</div>
              </div>
              <div className="text-sm text-neutral-500">
                $ 10 단위로 입력해주세요.
              </div>
            </li>
            <li>
              <input
                type="number"
                className="p-4  w-full H1 border-solid border rounded-xl text-right  "
                name="price"
                defaultValue={200}
                min={200}
                max={2000}
              />
            </li>
          </ol>
        </div>
      </Box>
      <Box>
        <div className="flex items-start gap-4">
          <input type="checkbox" />
          <div className="w-full">
            <div className="flex justify-between">
              <div className="flex gap-4">저작권 양도</div>
              <div className="font-bold">$2,000</div>
            </div>
            <div className="text-sm text-neutral-500">
              추가금을 지불하면 저작권까지 양도받을 수 있어요,
            </div>
          </div>
        </div>
      </Box>
      <button className="w-full p-4 mt-12 bg-black text-white font-bold rounded-xl">
        입찰하기
      </button>
    </div>
  );
}
