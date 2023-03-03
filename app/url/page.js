"use client";
import React from "react";
import { useSession ,signIn ,signOut} from "next-auth/react";
import Image from "next/image";
import { AiOutlineGithub } from "react-icons/ai";

const Url = () => {
  const { data: session, status } = useSession();

  if (status !== "authenticated") {
    return (
      <div className="w-full h-full text-center text-lg">
        <h1 className="text-4xl font-bold">URL dashboard</h1>
        <div className="flex justify-center p-5 m-5">
          <p>Sign In with Github</p>
          <button type="button" onClick={() => signIn("github")}>
            <AiOutlineGithub
              className="hover:-translate-y-1 transition-transform cursor-pointer text-neutral-500 dark:text-neutral-400"
              size={30}
            />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full text-center justify-center items-center flex flex-col text-lg">
      <h1 className="text-4xl font-bold pb-10">URL dashboard</h1>
      <div className="flex flex-row">
        <Image
          className="rounded-full"
          src={session.user.image}
          alt="user profile image"
          width={100}
          height={100}
        ></Image>
        <div className="flex flex-col px-4 text-center justify-center ">
          {/* <p className="text-ellipsis font-bold "> User</p> */}
          <p>{session.user.email}</p>
          <p>{session.user.name}</p>
        </div>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded-full my-4"
          onClick={() => signOut()}
        >
          Sign out
        </button>
      </div>
    </div>
  );
};

export default Url;
