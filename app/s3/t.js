"use client";
import { AiOutlineGithub, AiOutlineLinkedin } from "react-icons/ai";
import React from "react";

import { signIn } from "next-auth/react";

const Login = () => {
  return (
    <div className="mt-5 flex justify-center">
      <div className="col-10 col-lg-5 ">
        <h1 className="mb-4">Login</h1>
        <div className="text-center">
          {/* <button
            type="button"
            className="rounded-xl"
            onClick={() => signIn("google")}
          >
            <AiOutlineGithub
              className="hover:-translate-y-1 transition-transform cursor-pointer text-neutral-500 dark:text-neutral-400"
              size={30}
            />
          </button> */}

          <button type="button" onClick={() => signIn("github")}>
            <AiOutlineGithub
              className="hover:-translate-y-1 transition-transform cursor-pointer text-neutral-500 dark:text-neutral-400"
              size={30}
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
