import Link from "next/link";
// import SmallBanner_myPage from "../../components/smallbanner-mypage";
import history from "@/public/image/mypage/history.png";
import myInfo from "@/public/image/mypage/myInfo.png";
import mySongs from "@/public/image/mypage/mySongs.png";
import UserProfile from "@/public/image/profile/userProfile.png";
import Image from "next/image";
import Logout from "@/components/mypage/logout";
import ProfileCard from "@/components/mypage/profile-card";

export default function Profile() {
  const list = [
    {
      link: "mySong",
      img: mySongs,
      title: "내 노래",
    },
    {
      link: "myInfo",
      img: myInfo,
      title: "계정정보",
    },
    {
      link: "history",
      img: history,
      title: "결제내역",
    },
  ];

  return (
    <div className="flex-col w-full">
      <header className="mt-28">
        <ProfileCard />
      </header>
      <div className="mt-8 w-full bg-neutral-100/75 h-[40rem]">
        <div className="w-[min(28rem,100%)] m-auto">
          <ol className="flex flex-col">
            {list.map((item, idx) => {
              return (
                <li className="h-16 px-4" key={idx}>
                  <Link
                    className="flex justify-between items-center h-full w-full"
                    href={item.link}
                  >
                    <h2 className="flex items-center text-base font-normal my-auto">
                      <Image className="mr-4" src={item.img} alt="" />
                      <span>{item.title}</span>
                    </h2>
                    <div>
                      <svg
                        className="w-5 h-5 text-black sm:w-6 sm:h-6 dark:text-gray-800"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M9 5l7 7-7 7"
                        ></path>
                      </svg>
                    </div>
                  </Link>
                </li>
              );
            })}
            <Logout />
          </ol>
          <Link
            href="/upload"
            className=" flex items-center justify-between bg-black text-white font-bold w-[min(28rem,100%) px-5 py-4 rounded-xl m-4"
          >
            <div>
              1분 만에 <p className="inline text-green-400"> 내 노래 </p>
              등록하기
            </div>
            <div className="rounded-full bg-neutral-700 p-2 w-10 Center">
              👉
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
