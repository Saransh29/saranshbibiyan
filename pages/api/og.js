import { ImageResponse } from "@vercel/og";
import { NextRequest } from "next/server";

export const config = {
  runtime: "edge",
};

const font = fetch(
  new URL("../../public/fonts/kaisei-tokumin-bold.ttf", import.meta.url)
).then((res) => res.arrayBuffer());

export default async function handler(req, res) {
  const { searchParams } = req.nextUrl;
  const postTitle = searchParams.get("title");
  const fontData = await font;

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          // flexDirection: "column",
          // alignItems: "flex-start",
          textAlign: "center",
          justifyContent: "center",
          alignItems: "center",

          backgroundImage:
            "linear-gradient(109.6deg, rgb(0, 0, 0) 11.2%, rgb(11, 132, 145) 91.1%)",
        }}
      >
        <div
          style={{
            display: "flex",
            padding: "0 20px",
            textAlign: "center",
            justifyContent: "center",
            alignItems: "center",
            fontSize: 160,
            fontFamily: "Kaisei Tokumin",
            // letterSpacing: "-0.05em",
            fontStyle: "normal",
            color: "white",
            // lineHeight: "120px",
            whiteSpace: "pre-wrap",
          }}
        >
          {postTitle}
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 1200,
      fonts: [
        {
          name: "Kaisei Tokumin",
          data: fontData,
          style: "normal",
        },
      ],
    }
  );
}
