import { connect } from "../../../../../utils/dbconfig"
import Room from "../../../../../model/Room";

export async function GET() {
  try {
    await connect();
    const totalrooms = await Room.countDocuments();
    return Response.json({ totalrooms });
  } catch (error) {
    console.error("Error fetching resorts count:", error);
    return Response.json({ error: "Failed to fetch resorts count" }, { status: 500 });
  }
}
