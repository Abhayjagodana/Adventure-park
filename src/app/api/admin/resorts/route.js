import { connect } from "../../../../utils/dbconfig";
import Room from "../../../../model/Room";

export async function GET() {
  await connect();
  try {
    const rooms = await Room.find();
    return Response.json({ resorts: rooms }, { status: 200 });
  } catch (err) {
    return Response.json({ error: "Failed to fetch rooms" }, { status: 500 });
  }
}

export async function POST(req) {
  await connect();
  try {
    const body = await req.json();
    const newRoom = new Room(body);
    await newRoom.save();
    return Response.json({ message: "Room added successfully!" }, { status: 201 });
  } catch (err) {
    return Response.json({ error: "Failed to add room" }, { status: 500 });
  }
}
