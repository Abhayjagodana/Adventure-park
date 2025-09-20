import { connect } from "../../../../utils/dbconfig";
import contact from "../../../../model/contact";

export async function GET() {
  try {
    await connect();
    const contacts = await contact.find({}).sort({ createdAt: -1 });
    return new Response(JSON.stringify({ success: true, contacts }), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ success: false, message: "Failed to fetch contacts" }), { status: 500 });
  }
}
