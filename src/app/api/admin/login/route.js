import bcrypt from "bcryptjs"; 
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import createAdmin from "../../../../utils/insertadmin";

export async function POST(req) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return new Response(JSON.stringify({ error: "Missing fields" }), { status: 400 });
    }

    const client = await createAdmin();
    const db = client.db("adventure");

    const admin = await db.collection("admins").findOne({ email });
    if (!admin) {
      client.close();
      return new Response(JSON.stringify({ error: "Admin not found" }), { status: 401 });
    }

    const match = await bcrypt.compare(password, admin.password);
    if (!match) {
      client.close();
      return new Response(JSON.stringify({ error: "Incorrect password" }), { status: 401 });
    }

    // Create JWT token with admin role
    const token = jwt.sign({ email: admin.email, role: "admin" }, process.env.JWT_SECRET, { expiresIn: "1d" });

    client.close();

    const res = NextResponse.json({ message: "Login success" });
    res.cookies.set("admin-token", token, {
      httpOnly: true,
      path: "/",
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24,
    });
    return res;
  } catch (err) {
    console.error("Login error:", err);
    return new Response(JSON.stringify({ error: "Server error" }), { status: 500 });
  }
}