/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ["avatars.githubusercontent.com", "lh3.googleusercontent.com"],
  },
  async redirects() {
    return [
      {
        source: "/resume",
        destination: "/resume.pdf",
        permanent: true,
      },
      {
        source: "/github",
        destination: "https://github.com/saransh29",
        permanent: true,
      },
      {
        source: "/linkedin",
        destination: "https://www.linkedin.com/in/saransh-bibiyan/",
        permanent: true,
      },
      {
        source: "/lc",
        destination: "https://leetcode.com/sky_sk/",
        permanent: true,
      },
      {
        source: "/ai",
        destination: "https://openjourney-next.vercel.app",
        permanent: true,
      },
      {
        source: "/build",
        destination: "https://builder.yime.in",
        permanent: true,
      },
      {
        source: "/docx",
        destination:
          "https://docs.google.com/document/d/1EbWfXX-Pjbv63EZLTPhIJj-pvRWSc2qPvS76PoL5yV8/edit",
        permanent: true,
      },
      {
        source: "/ai-builder-present",
        destination:
          "https://drive.google.com/file/d/127C5bsk7WvSdN2yCBD6EgkVHfLf6CyvS/view?usp=share_link",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
