// app/api/admin/rides/route.js
import { connect } from "../../../utils/dbconfig";
import Ride from "../../../model/rides";

export async function GET() {
  try {
    await connect(); // ensures mongoose connection

    const rides = await Ride.find({}, "rideName , capacity , location , information , type , ageLimit , image").lean();

    return new Response(JSON.stringify({ rides }), { status: 200 });
  } catch (err) {
    console.error("Error fetching rides:", err);
    return new Response(JSON.stringify({ error: "Server error" }), { status: 500 });
  }
}
