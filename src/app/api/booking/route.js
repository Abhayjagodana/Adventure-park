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
// import { connect } from "../../../utils/dbconfig";
// import Booking from "../../../models/Booking";

// export async function POST(req) {
//   await connect();
//   try {
//     const { customerName, email, phone, date, adults, teenagers, kids, totalPeople, totalAmount, itemId, itemType } = await req.json();

//     if (!customerName || !email || !phone || !date || !itemId || !itemType) {
//       return new Response(JSON.stringify({ error: "All required fields must be filled" }), { status: 400 });
//     }

//     const booking = await Booking.create({
//       customerName,
//       email,
//       phone,
//       date,
//       adults,
//       teenagers,
//       kids,
//       totalPeople,
//       totalAmount,
//       itemId,
//       itemType,
//     });

//     return new Response(JSON.stringify({ message: "Booking successful!", booking }), { status: 201 });
//   } catch (err) {
//     console.error(err);
//     return new Response(JSON.stringify({ error: "Failed to book" }), { status: 500 });
//   }
// }
import { connect } from "../../../utils/dbconfig";
import Booking from "../../../model/booking";

// export async function POST(req) {
//   try {
//     await connect();
//     const data = await req.json();
//     const booking = await Booking.create(data);
//     return Response.json({ success: true, booking });
//   } catch (error) {
//     return Response.json({ success: false, error: error.message }, { status: 500 });
//   }
// }
export async function GET() {
  try {
    await connect();

    const bookings = await Booking.find({}).sort({ createdAt: -1 });

    return new Response(JSON.stringify(bookings), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching bookings:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch bookings" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

export async function POST(req) {
  try {
    await connect();
    const body = await req.json();

    const newBooking = new Booking(body);
    await newBooking.save();

    return new Response(JSON.stringify({ success: true, booking: newBooking }), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error saving booking:", error);
    return new Response(JSON.stringify({ success: false, error: "Failed to save booking" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

export async function PUT(req) {
    try {
        await connect();
        const data = await req.json();
        const { _id, ...updateData } = data;
        const updatedBooking = await Booking.findByIdAndUpdate(_id, updateData, { new: true });
        return new Response(JSON.stringify({ success: true, booking: updatedBooking }), { status: 200 });
    } catch (err) {
        return new Response(JSON.stringify({ success: false, error: err.message }), { status: 500 });
    }
}

export async function DELETE(req) {
    try {
        await connect();
        const { searchParams } = new URL(req.url);
        const id = searchParams.get("id");
        await Booking.findByIdAndDelete(id);
        return new Response(JSON.stringify({ success: true }), { status: 200 });
    } catch (err) {
        return new Response(JSON.stringify({ success: false, error: err.message }), { status: 500 });
    }
}
