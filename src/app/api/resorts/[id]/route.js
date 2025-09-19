import { connect } from "../../../../utils/dbconfig";
import Room from "../../../../model/Room";

export async function GET(req, { params }) {
  await connect();
  const room = await Room.findById(params.id);
  if (!room) {
    return Response.json({ error: "Room not found" }, { status: 404 });
  }
  return Response.json(room);
}
