/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ["avatars.githubusercontent.com","lh3.googleusercontent.com"],
  },
  async redirects() {
    return [
      {
        source: "/resume",
        destination: "/resume.pdf",
        permanent: true,
      },
      {
        source:"/github",
        destination:"https://github.com/saransh29",
        permanent:true,
      },
      {
        source:"/linkedin",
        destination:"https://www.linkedin.com/in/saransh-bibiyan/",
        permanent:true,
      },
      {
        source:"/lc",
        destination:"https://leetcode.com/sky_sk/",
        permanent:true,
      },
      {
        source:"/ai",
        destination:"https://openjourney-next.vercel.app",
        permanent:true,
      }
    ];
  },
};

module.exports = nextConfig;
