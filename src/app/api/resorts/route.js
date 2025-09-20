import { connect } from "../../../utils/dbconfig";
import Room from "../../../model/Room";

export async function GET() {
  await connect();
  try {
    const rooms = await Room.find({}, "roomType , information , price , noOfRooms , image").lean();
    return Response.json({ resorts: rooms }, { status: 200 });
  } catch (err) {
    return Response.json({ error: "Failed to fetch rooms" }, { status: 500 });
  }
}
