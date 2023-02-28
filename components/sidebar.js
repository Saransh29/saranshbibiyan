import React from "react";
import { AiOutlineGithub, AiOutlineLinkedin } from "react-icons/ai";
import { SiLeetcode } from "react-icons/si";

const Sidebar = () => {
  return (
    <div className="p-4 m-2">
      <div className="fixed bottom-0 right-0 md:visible invisible backdrop-blur rounded-xl">
        <div className=" m-2 p-5 rounded-xl flex flex-row items-center justify-center space-x-2 mb-1">
          <a
            href="https://github.com/Saransh29"
            rel="noreferrer"
            target="_blank"
          >
            <AiOutlineGithub
              className="hover:-translate-y-1 transition-transform cursor-pointer text-black dark:text-neutral-300"
              size={30}
            />
          </a>

          <a
            href="https://www.linkedin.com/in/saransh-bibiyan/"
            rel="noreferrer"
            target="_blank"
          >
            <AiOutlineLinkedin
              className="hover:-translate-y-1 transition-transform cursor-pointer text-red dark:text-neutral-300"
              size={30}
            />
          </a>
          <a
            href="https://leetcode.com/sky_sk/"
            rel="noreferrer"
            target="_blank"
          >
            <SiLeetcode
              className="hover:-translate-y-1 transition-transform cursor-pointer text-neutral-500 dark:text-neutral-300 "
              size={30}
            />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
