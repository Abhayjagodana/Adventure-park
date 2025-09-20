// src/app/api/admin/rides/count/route.js
import { connect } from "../../../../../utils/dbconfig";
import contact from "../../../../../model/contact";
export async function GET() {
  try {
    await connect();
    const totalcontact = await contact.countDocuments();

    return new Response(JSON.stringify({ totalcontact }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    console.error("Failed to fetch total contact:", error);
    return new Response(
      JSON.stringify({ error: "Failed to fetch total contact" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" }
      }
    );
  }
}


    