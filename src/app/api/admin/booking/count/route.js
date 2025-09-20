// src/app/api/admin/rides/count/route.js
import { connect } from "../../../../../utils/dbconfig";
import booking from "../../../../../model/booking";
export async function GET() {
  try {
    await connect();
    const totalbooking = await booking.countDocuments();

    return new Response(JSON.stringify({ totalbooking }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    console.error("Failed to fetch total booking:", error);
    return new Response(
      JSON.stringify({ error: "Failed to fetch total booking" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" }
      }
    );
  }
}


    