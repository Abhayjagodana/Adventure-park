import { connect } from "../../../../utils/dbconfig";
import Ride from "../../../../model/rides";

export async function POST(req) {
  try {
    const { rideName, capacity, location, information, type, ageLimit , image } =
      await req.json();

    if (!rideName || !capacity || !location || !type || !ageLimit || !image) {
      return new Response(
        JSON.stringify({ error: "Please fill all required fields" }),
        { status: 400 }
      );
    }

    await connect();


    if (!rideName || !capacity || !location || !type || !ageLimit || !image) {
      return new Response(
        JSON.stringify({ error: "Please fill all required fields" }),
        { status: 400 }
      );
    }

    await connect();

    const ride = new Ride({
      rideName,
      capacity: Number(capacity),
      location,
      information,
      type,
      ageLimit,
      image,
    });

    await ride.save();

    return new Response(
      JSON.stringify({ message: "Ride added successfully" }),
      { status: 201 }
    );
  } catch (err) {
    console.error("Error adding ride:", err);
    return new Response(JSON.stringify({ error: "Server error" }), {
      status: 500,
    });
  }
}
