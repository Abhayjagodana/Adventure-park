// src/app/api/admin/rides/count/route.js
import { connect } from "../../../../../utils/dbconfig";
import Ride from "../../../../../model/rides";

export async function GET() {
  try {
    await connect();
    const totalRides = await Ride.countDocuments();

    return new Response(JSON.stringify({ totalRides }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    console.error("Failed to fetch total rides:", error);
    return new Response(
      JSON.stringify({ error: "Failed to fetch total rides" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" }
      }
    );
  }
}


    