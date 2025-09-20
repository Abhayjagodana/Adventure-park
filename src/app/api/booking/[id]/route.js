// app/api/admin/rides/[id]/route.js
import { NextResponse } from "next/server";
import { connect } from "../../../../utils/dbconfig";
import booking from "../../../../model/booking";

export async function DELETE(req, { params }) {
  try {
    await connect();
    const { id } = params;
    await booking.findByIdAndDelete(id);
    return NextResponse.json({ message: "booking deleted successfully" });
  } catch (err) {
    return NextResponse.json({ error: "Failed to delete booking" }, { status: 500 });
  }
}

export async function PUT(req, { params }) {
  try {
    await connect();
    const { id } = params;
    const body = await req.json();

    const updatedBooking = await booking.findByIdAndUpdate(id, body, { new: true });

    return NextResponse.json({
      message: "Booking updated successfully",
      ride: updatedBooking,
    });
  } catch (err) {
    return NextResponse.json({ error: "Failed to update ride" }, { status: 500 });
  }
}
