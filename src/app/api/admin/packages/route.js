import { connect } from "../../../../utils/dbconfig";
import Package from "../../../../model/package";

export async function POST(req) {
  try {
    await connect();
    const { name, adultPrice, teenagerPrice, kidsPrice, information, image } = await req.json();

    if (!name || !adultPrice || !teenagerPrice || !kidsPrice || !information || !image) {
      return Response.json({ error: "All fields are required" }, { status: 400 });
    }

    const newPackage = new Package({
      name,
      adultPrice,
      teenagerPrice,
      kidsPrice,
      information,
      image,
    });

    await newPackage.save();

    return Response.json(
      { message: "Package created successfully", package: newPackage },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating package:", error);
    return Response.json({ error: "Failed to create package" }, { status: 500 });
  }
}

export async function GET() {
  try {
    await connect();
    const packages = await Package.find({});
    return Response.json({ packages }, { status: 200 });
  } catch (error) {
    console.error("Error fetching packages:", error);
    return Response.json({ error: "Failed to fetch packages" }, { status: 500 });
  }
}
