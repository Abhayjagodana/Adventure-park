// app/api/admin/rides/route.js
import { connect } from "../../../utils/dbconfig";
import _package from "../../../model/package";

export async function GET() {
  try {
    await connect(); // ensures mongoose connection

    const packages = await _package.find({} , "name , adultPrice , teenagerPrice , kidsPrice , information ,image").lean();

    return new Response(JSON.stringify({ packages }), { status: 200 });
  } catch (err) {
    console.error("Error fetching packages:", err);
    return new Response(JSON.stringify({ error: "Server error" }), { status: 500 });
  }
}
