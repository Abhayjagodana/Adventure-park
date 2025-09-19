import { NextResponse } from "next/server";

function clearAllUserCookies() {
  const res = NextResponse.json({ message: "Logged out" });
  // Clear current and legacy cookie names
  const clear = (name) => res.cookies.set(name, "", {
    httpOnly: true,
    path: "/",
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 0,
  });
  clear("user-token");
  clear("auth-token");
  return res;
}

export async function GET() {
  return clearAllUserCookies();
}

export async function POST() {
  return clearAllUserCookies();
}