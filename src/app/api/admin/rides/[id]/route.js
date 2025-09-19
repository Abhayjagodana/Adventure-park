// app/api/admin/rides/[id]/route.js
import { NextResponse } from "next/server";
import { connect } from "../../../../../utils/dbconfig";
import Ride from "../../../../../model/rides";

export async function DELETE(req, { params }) {
  try {
    await connect();
    const { id } = params;
    await Ride.findByIdAndDelete(id);
    return NextResponse.json({ message: "Ride deleted successfully" });
  } catch (err) {
    return NextResponse.json({ error: "Failed to delete ride" }, { status: 500 });
  }
}

export async function PUT(req, { params }) {
  try {
    await connect();
    const { id } = params;
    const body = await req.json();

    const updatedRide = await Ride.findByIdAndUpdate(id, body, { new: true });

    return NextResponse.json({
      message: "Ride updated successfully",
      ride: updatedRide,
    });
  } catch (err) {
    return NextResponse.json({ error: "Failed to update ride" }, { status: 500 });
  }
}
