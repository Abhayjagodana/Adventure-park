import { connect } from "../../../../../utils/dbconfig";
import Room from "../../../../../model/Room";

export async function GET(req, { params }) {
  await connect();
  try {
    const room = await Room.findById(params.id);
    if (!room) return Response.json({ error: "Room not found" }, { status: 404 });
    return Response.json(room, { status: 200 });
  } catch (err) {
    return Response.json({ error: "Failed to fetch room" }, { status: 500 });
  }
}

export async function PUT(req, { params }) {
  await connect();
  try {
    const body = await req.json();
    const updated = await Room.findByIdAndUpdate(params.id, body, { new: true });
    if (!updated) return Response.json({ error: "Room not found" }, { status: 404 });
    return Response.json({ message: "Room updated successfully!" }, { status: 200 });
  } catch (err) {
    return Response.json({ error: "Failed to update room" }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  await connect();
  try {
    await Room.findByIdAndDelete(params.id);
    return Response.json({ message: "Room deleted successfully!" }, { status: 200 });
  } catch (err) {
    return Response.json({ error: "Failed to delete room" }, { status: 500 });
  }
}
