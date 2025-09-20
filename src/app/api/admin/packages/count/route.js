// src/app/api/admin/rides/count/route.js
import { connect } from "../../../../../utils/dbconfig";
import _package from "../../../../../model/package";
export async function GET() {
  try {
    await connect();
    const totalpackage = await _package.countDocuments();

    return new Response(JSON.stringify({ totalpackage }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    console.error("Failed to fetch total package:", error);
    return new Response(
      JSON.stringify({ error: "Failed to fetch total package" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" }
      }
    );
  }
}


    