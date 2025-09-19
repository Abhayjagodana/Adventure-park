// import { connect } from "../../../utils/dbconfig";
// import Booking from "../../../model/booking";

// export async function POST(req) {
//   try {
//     await connect();
//     const body = await req.json();

//     const booking = new Booking(body);
//     await booking.save();

//     return Response.json(
//       { success: true, message: "Booking created successfully", booking },
//       { status: 201 }
//     );
//   } catch (error) {
//     console.error("Booking Error:", error);
//     return Response.json({ success: false, error: "Failed to create booking" }, { status: 500 });
//   }
// }

// export async function GET() {
//   try {
//     await connect();
//     const bookings = await Booking.find().sort({ createdAt: -1 });
//     return Response.json({ success: true, bookings });
//   } catch (error) {
//     return Response.json({ success: false, error: "Failed to fetch bookings" }, { status: 500 });
//   }
// }
// app/api/bookings/route.js
import { connect } from "../../../utils/dbconfig";
import Booking from "../../../models/Booking";

export async function POST(req) {
  await connect();
  try {
    const { customerName, email, phone, date, adults, teenagers, kids, totalPeople, totalAmount, itemId, itemType } = await req.json();

    if (!customerName || !email || !phone || !date || !itemId || !itemType) {
      return new Response(JSON.stringify({ error: "All required fields must be filled" }), { status: 400 });
    }

    const booking = await Booking.create({
      customerName,
      email,
      phone,
      date,
      adults,
      teenagers,
      kids,
      totalPeople,
      totalAmount,
      itemId,
      itemType,
    });

    return new Response(JSON.stringify({ message: "Booking successful!", booking }), { status: 201 });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: "Failed to book" }), { status: 500 });
  }
}
