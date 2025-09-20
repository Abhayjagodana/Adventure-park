import { connect } from "../../../utils/dbconfig";
import contact from "../../../model/contact";

export async function POST(req) {
  try {
    await connect();
    const body = await req.json();

    const { name, email, phone, message } = body;

    if (!name || !email || !phone || !message) {
      return new Response(JSON.stringify({ success: false, message: "All fields are required" }), { status: 400 });
    }

    const newContact = new contact({ name, email, phone, message });
    await newContact.save();

    return new Response(JSON.stringify({ success: true, message: "Message sent successfully!" }), { status: 201 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ success: false, message: "Something went wrong" }), { status: 500 });
  }
}
