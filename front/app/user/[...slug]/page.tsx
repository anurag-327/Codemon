"use client";
import { useState, useEffect } from "react";
import { API_URL } from "@/credentials";
import { useStore } from "@/zustand/useStore";
import {
  CheckSquare,
  CodeBlock,
  Envelope,
  GithubLogo,
  Globe,
  LinkedinLogo,
  MapPin,
  TwitterLogo,
} from "@phosphor-icons/react/dist/ssr";
import Navbar from "@/components/Navbar";
interface params {
  slug: string[];
}
interface SolvedQuestion {
  _id: string;
  question: string;
  name: string;
}

interface SocialMedia {
  github: string;
  linkedin: string;
  twitter: string;
  website: string;
}

interface PersonalDetails {
  gender: string;
  location: string;
  skills: string;
  summary: string;
}

interface UserProfile {
  _id: string;
  name: string;
  username: string;
  email: string;
  questionsSolved: SolvedQuestion[];
  createdAt: string;
  updatedAt: string;
  __v: number;
  points: number;
  profile: string;
  role: string;
  socialMedia: SocialMedia;
  personalDetails: PersonalDetails;
}
const page = ({ params }: { params: params }) => {
  const username = params.slug[0];
  const [section, setSection] = useState<string>("profile");
  const [error, setError] = useState<any>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [user, setUser] = useState<UserProfile>();
  useEffect(() => {
    (async function () {
      setError("");
      setLoading(true);
      try {
        const res = await fetch(API_URL + `/api/user/get-user/${username}`);
        const userData = await res.json();
        if (userData.status == 200) {
          setUser(userData.user);
          setLoading(false);
        } else {
          setLoading(false);
          setError(userData.message);
          console.log("data fetch failed");
        }
      } catch (err: any) {
        setError(err);
        console.log(err);
      }
    })();
  }, []);
  if (error) return <div>{error}</div>;
  if (loading) return <div>Loading</div>;
  return (
    <>
      <Navbar />
      {user && (
        <main className="w-full min-h-screen bg-gray-100 ">
          <div className="flex flex-col justify-center w-full gap-2 px-2 md:flex-row">
            <div className="w-full mt-16 md:w-[350px] p-2 min-h-fit md:min-h-[85vh] rounded-md bg-white">
              <div className="flex gap-2">
                <div>
                  <img
                    className="w-20 h-20"
                    src="https://assets.leetcode.com/users/avatars/avatar_1674243248.png"
                    alt="logo"
                  />
                </div>
                <div className="flex flex-col gap-1 mt-4">
                  <span className="text-sm text-gray-600 font-[500]">
                    {user.name}
                  </span>
                  <span className="text-xs text-gray-500">{user.username}</span>
                </div>
              </div>
              <div className="mt-2">
                <span className="text-xs text-gray-500">
                  {user.personalDetails.summary}
                </span>
              </div>
              <div className="w-full mt-4">
                <button className="w-full p-2 text-sm rounded-md text-green-600 font-[500] bg-orange-50">
                  Edit Profile
                </button>
              </div>
              <div className="flex flex-col gap-4 mt-8">
                <div className="flex items-center gap-4 text-sm text-gray-500 cursor-pointer hover:text-gray-700">
                  <span>
                    <MapPin size={16} />
                  </span>
                  <span>{user.personalDetails.location}</span>
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-500 cursor-pointer hover:text-gray-700">
                  <span>
                    <Envelope size={16} />
                  </span>
                  <span>{user.email}</span>
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-500 cursor-pointer hover:text-gray-700">
                  <span>
                    <Globe size={16} />
                  </span>
                  <span>{user.socialMedia.website}</span>
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-500 cursor-pointer hover:text-gray-700">
                  <span>
                    <GithubLogo size={16} />
                  </span>
                  <span>{user.socialMedia.github}</span>
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-500 cursor-pointer hover:text-gray-700">
                  <span>
                    <TwitterLogo size={16} />
                  </span>
                  <span>{user.socialMedia.twitter}</span>
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-500 cursor-pointer hover:text-gray-700">
                  <span>
                    <LinkedinLogo size={16} />
                  </span>
                  <span>{user.socialMedia.linkedin}</span>
                </div>
              </div>
            </div>
            <div className="w-full mt-16 bg-white rounded-md p-2 md:w-[50%] min-h-fit md:min-h-[85vh]">
              <div className="flex items-center w-full gap-2 p-2 border-b rounded-md">
                <CheckSquare size={22} color="#60e176" />
                <h2 className="text-gray-600 font-[500]">Solved Questions</h2>
              </div>
              <div className="flex flex-col gap-2 mt-4">
                {user.questionsSolved.map((data, index) => (
                  <a
                    key={index}
                    className={`px-3 py-3 ${
                      index % 2 == 0 ? "bg-gray-100" : "bg-white"
                    } rounded-md `}
                    href={`/solve/${data.question}`}
                  >
                    {data.name}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </main>
      )}
    </>
  );
};

export default page;
