import React from "react";
import Image from "next/image";
import Link from "next/link";
import { BsGithub, BsArrowUpRightSquare } from "react-icons/bs";

const projects = [
  {
    name: "Ai Builder",
    description:
      "Develop full websites and web apps using Ai Builder. Ai Builder is a low code platform that allows you to build websites and web apps without writing a single line of code.",
    image: "/landing.png",
    tech: "React, Nextjs, OpenAI, MongoDB, Nodejs, Expressjs",
    github: "https://github.com/Saransh29/ai-builder",
    link: "https://ai-builder-gules.vercel.app/",
  },
  {
    name: "OpenJourney",
    description:
      "Developed a web app to Generate an imaginative image through Stable Diffusion AI midjourney v4 Model hosted on a GCP VM instance. Images and prompts stored on MongoDB database.",
    image: "/openjourney1.png",
    tech: "React, Nextjs, MongoDB, GCP, Nodejs, Expressjs",
    github: "https://github.com/Saransh29/next-stable-diff",
    link: "https://openjourney-next.vercel.app/",
  },
  {
    name: "AgriMan",
    description:
      "AgriMan is an Agriculture companion app that shows Real-time crop stats, weather info., market prices and answers your queries using ChatGPT.",
    image: "/agriman.png",
    tech: "Flutter , Firebase",
    github: "https://github.com/Saransh29/AgriMan",
    link: "https://agriman-web.pages.dev/##/",
  },
  {
    name: "Saransh.me",
    description:
      "Developed this Website using Nextjs,Tailwindcss most components are Rendered Server-Side to improve loading times .",
    image: "/saranshme.png",
    tech: "React, Nextjs, Tailwindcss",
    github: "https://github.com/Saransh29/saranshbibiyan",
    link: "https://www.saransh.me/",
  },
  {
    name: "Fire-Chat",
    description:
      "Developed a messaging application using Flutter & using Firebase Cloud Firestore for storing messages and Firebase Authentication for user authentication.",
    image: "/firechat.png",
    tech: "Flutter , Firebase",
    github: "https://github.com/Saransh29/fire_chat",
    link: "http://www.fire-chat.tech/",
  },
];

const ProjectsSection = () => {
  return (
    <section id="projects">
      <h1 className="my-10 text-center font-bold text-4xl">
        Projects
        <hr className="w-6 h-1 mx-auto my-4 bg-teal-500 border-0 rounded"></hr>
      </h1>

      <div className="flex flex-col space-y-28">
        {projects.map((project, idx) => {
          return (
            <div key={idx}>
              <div className="flex flex-col  animate-slideUpCubiBezier animation-delay-2 md:flex-row md:space-x-12">
                <div className=" md:w-1/2">
                  <Link href={project.link}>
                    <Image
                      src={project.image}
                      alt=""
                      width={1000}
                      height={1000}
                      className="rounded-xl shadow-xl hover:opacity-70"
                    />
                  </Link>
                </div>
                <div className="mt-8 md:w-1/2">
                  <h1 className="text-4xl font-bold mb-4">{project.name}</h1>
                  <p className="text-xl mb-2">{project.tech} </p>
                  <p className="text-xl leading-7 mb-4 text-neutral-600 dark:text-neutral-400">
                    {project.description}
                  </p>
                  <div className="flex flex-row align-bottom space-x-4">
                    <Link href={project.github} target="_blank">
                      <BsGithub
                        size={30}
                        className="hover:-translate-y-1 transition-transform cursor-pointer"
                      />
                    </Link>
                    <Link href={project.link} target="_blank">
                      <BsArrowUpRightSquare
                        size={30}
                        className="hover:-translate-y-1 transition-transform cursor-pointer"
                      />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default ProjectsSection;
