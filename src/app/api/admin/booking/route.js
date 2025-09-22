import { connect } from "../../../../utils/dbconfig";
import { ObjectId } from "mongodb";

export async function GET() {
  try {
    const client = await connect();
    const db = client.db("adventure"); // replace with your DB name
    const bookings = await db.collection("booking").find({}).toArray();
    return new Response(JSON.stringify(bookings), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}

export async function POST(req) {
  try {
    const client = await connect();
    const db = client.db("adventure");
    const data = await req.json();

    const result = await db.collection("booking").insertOne(data);
    return new Response(JSON.stringify({ success: true, bookingId: result.insertedId }), { status: 201 });
  } catch (err) {
    return new Response(JSON.stringify({ success: false, error: err.message }), { status: 500 });
  }
}

export async function PUT(req) {
  try {
    const client = await connect();
    const db = client.db("adventure");
    const { id, ...data } = await req.json();

    // const bookingId = id || _id; // ✅ accept either id or _id

    // if (!bookingId)
    //   return new Response(
    //     JSON.stringify({ success: false, error: "Booking ID missing" }),
    //     { status: 400 }
    //   );
    if (!id) return new Response(JSON.stringify({ success: false, error: "Booking ID missing" }), { status: 400 });

    await db.collection("booking").updateOne({ _id: new ObjectId(id) }, { $set: data });
    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ success: false, error: err.message }), { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    const client = await connect();
    const db = client.db("adventure");
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) return new Response(JSON.stringify({ success: false, error: "Booking ID missing" }), { status: 400 });

    await db.collection("booking").deleteOne({ _id: new ObjectId(id) });
    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ success: false, error: err.message }), { status: 500 });
  }
}


