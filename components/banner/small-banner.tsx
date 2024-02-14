import Link from "next/link";

export default function SmallBanner() {
  return (
    <div className="my-20">
      <div className="">
        <div className="px-4 text-white w-full flex-row justify-between items-center h-24 bg-black rounded-2xl">
          <div className="lgH1">🍆 💦 첫 이용자 프로모션</div>
          <Link
            href="/"
            className="⚪️ bg-white text-sm font-medium w-10 h-10 rounded-full"
          >
            <span className="inline-flex justify-center items-center w-6 h-10 rounded-full">
              <svg
                className=" text-black dark:text-gray-800"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="3"
                  d="M9 5l7 7-7 7"
                ></path>
              </svg>
              <span className="hidden">More</span>
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
