// // app/api/admin/packages/[id]/route.js
import { connect } from "../../../../../utils/dbconfig";
import Package from "../../../../../model/package";

export async function PUT(req, { params }) {
  try {
    await connect();
    const { id } = params;
    const body = await req.json();

    const updatedPackage = await Package.findByIdAndUpdate(id, body, { new: true });
    if (!updatedPackage) {
      return Response.json({ error: "Package not found" }, { status: 404 });
    }

    return Response.json({ message: "Package updated successfully", updatedPackage });
  } catch (error) {
    return Response.json({ error: "Failed to update package" }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  try {
    await connect();
    const { id } = params;

    const deleted = await Package.findByIdAndDelete(id);
    if (!deleted) {
      return Response.json({ error: "Package not found" }, { status: 404 });
    }

    return Response.json({ message: "Package deleted successfully" }, { status: 200 });
  } catch (error) {
    return Response.json({ error: "Failed to delete package" }, { status: 500 });
  }
}
// app/api/admin/packages/[id]/route.js


// import { connect } from "../../../../../utils/dbconfig";
// import Package from "../../../../../model/package";


// export async function GET(req,{params}){
//   await connect();
//   try {
//     const Package =await Package.findById(params.id)
//     if(!Package)  return Response.json({ error: "Package not found" }, { status: 404 });
//     return  Response.json(Package,{status:200});
//   } catch (error) {
//      return Response.json({ error: "Failed to update package" }, { status: 500 }); 
//   }
// }


// export async function PUT(req, { params }) {
//   await connect();
//   try {

//     const body = await req.json();

//     const updatedPackage = await Package.findByIdAndUpdate(id, body, { new: true });
//     if (!updatedPackage) {
//       return Response.json({ error: "Package not found" }, { status: 404 });
//     }

//     return Response.json({ message: "Package updated successfully", updatedPackage });
//   } catch (error) {
//     return Response.json({ error: "Failed to update package" }, { status: 500 });
//   }
// }

// export async function DELETE(req, { params }) {
//   await connect();
//   try {
//     await Package.findByIdAndDelete(params.id);
//     return Response.json({ message: "Package deleted successfully" }, { status: 200 });
//   } catch (error) {
//     return Response.json({ error: "Failed to delete package" }, { status: 500 });
//   }
// }
