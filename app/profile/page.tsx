import Link from "next/link";
// import SmallBanner_myPage from "../../components/smallbanner-mypage";
import history from "@/public/image/profile/history.png";
import myInfo from "@/public/image/profile/myInfo.png";
import mySongs from "@/public/image/profile/mySongs.png";
import UserProfile from "@/public/image/profile/userProfile.png";
import Image from "next/image";
import Logout from "@/components/profile/logout";
function ProfileCard() {
  return (
    <div className="m-auto px-4 flex w-[min(28rem,100%)] h-[4.5rem] ">
      <Link href="">
        <Image src={UserProfile} alt="userProfile" />
      </Link>
      <div className="ml-4 flex flex-col justify-between ">
        <h1 className="text-lg font-medium">가든인더하우스</h1>
        <Link href="./edit">
          <div className="Center w-20 h-8 text-xs text-normal rounded-[1.25rem] border border-magenta text-magenta hover:bg-purple-500 hover:text-white hover:border-white transition-colors duration-300">
            프로필 수정
          </div>
        </Link>
      </div>
    </div>
  );
}

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
    <div className="w-screen flex-col">
      <header className="mt-28">
        <ProfileCard />
      </header>
      <div className="mt-8 w-screen bg-neutral-100/75 h-[40rem]">
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
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
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
          {/* <SmallBanner_myPage /> */}
        </div>
      </div>
    </div>
  );
}
