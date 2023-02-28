"use client";
import React from "react";
import Login from "./t";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";

export default function Test() {
  const { data: session, status } = useSession();
  if (status === "authenticated") {
    return (
      <div className="w-full h-full text-center text-lg">
        <h1 className="text-4xl font-bold">S3 dashboard</h1>
        <p>Signed in as {session.user.email}</p>
        <button onClick={() => signOut()}>Sign out</button>
      </div>
    );
  }

  return (
    <div className="w-full h-full text-center text-lg">
      <h1 className="text-4xl font-bold">S3 dashboard</h1>
      <Login />
      <button onClick={() => signOut()}>Sign out</button>
    </div>
  );
}
