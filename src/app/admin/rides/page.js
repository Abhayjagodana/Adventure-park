// // app/admin/rides/add/page.js
// "use client";

// import { useEffect, useState } from "react";
// import AdminHeader from "../header/page";

// export default function AddRideForm() {
//   const [rideName, setRideName] = useState("");
//   const [capacity, setCapacity] = useState("");
//   const [location, setLocation] = useState("");
//   const [information, setInformation] = useState("");
//   const [type, setType] = useState("Thriller");
//   const [ageLimit, setAgeLimit] = useState("5-10");
//   const [image, setImage] = useState("");
//   const [message, setMessage] = useState("");
//   const [rides, setRides] = useState([]); // ✅ FIX: added rides state

//   useEffect(() => {
//     async function fetchRides() {
//       try {
//         const res = await fetch("/api/rides");
//         const data = await res.json();
//         setRides(data.rides || []);
//       } catch (err) {
//         console.error("Failed to fetch rides", err);
//       }
//     }
//     fetchRides();
//   }, []);
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const rideData = {
//       rideName,
//       capacity,
//       location,
//       information,
//       type,
//       ageLimit,
//       image,
//     };

//     console.log("Submitting ride:", rideData);

//     // Example POST request to your API route
//     const res = await fetch("/api/admin/rides", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(rideData),
//     });

//     const data = await res.json();
//     if (res.ok) {
//       setMessage("Ride added successfully!");
//       // Reset form
//       setRideName("");
//       setCapacity("");
//       setLocation("");
//       setInformation("");
//       setType("Thriller");
//       setAgeLimit("5-10");
//       setImage("");
//     } else {
//       setMessage(data.error || "Failed to add ride");
//     }
//   };

//   return (

//     <div>
//       <AdminHeader />
//      <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-6 my-20 ">
//   <div className="w-full max-w-2xl">
//     {/* Ride Form */}
//     <form
//       onSubmit={handleSubmit}
//       className="bg-white p-8 rounded-2xl shadow-lg"
//     >
//       <h2 className="text-2xl font-bold mb-6 text-center text-purple-700">
//         🎢 Add New Ride
//       </h2>

//       {message && (
//         <p className="mb-4 text-center font-semibold text-green-600">
//           {message}
//         </p>
//       )}

//       {/* Ride Name */}
//       <div className="mb-4">
//         <label className="block mb-1 font-semibold">Ride Name</label>
//         <input
//           type="text"
//           value={rideName}
//           onChange={(e) => setRideName(e.target.value)}
//           className="w-full border p-2 rounded focus:ring-2 focus:ring-purple-400"
//           required
//         />
//       </div>

//       {/* Capacity */}
//       <div className="mb-4">
//         <label className="block mb-1 font-semibold">Capacity</label>
//         <input
//           type="number"
//           value={capacity}
//           onChange={(e) => setCapacity(e.target.value)}
//           className="w-full border p-2 rounded focus:ring-2 focus:ring-purple-400"
//           required
//         />
//       </div>

//       {/* Location */}
//       <div className="mb-4">
//         <label className="block mb-1 font-semibold">Location</label>
//         <input
//           type="text"
//           value={location}
//           onChange={(e) => setLocation(e.target.value)}
//           className="w-full border p-2 rounded focus:ring-2 focus:ring-purple-400"
//           required
//         />
//       </div>

//       {/* Information */}
//       <div className="mb-4">
//         <label className="block mb-1 font-semibold">Information</label>
//         <textarea
//           value={information}
//           onChange={(e) => setInformation(e.target.value)}
//           className="w-full border p-2 rounded focus:ring-2 focus:ring-purple-400"
//           rows={3}
//           required
//         />
//       </div>

//       {/* Ride Type */}
//       <div className="mb-4">
//         <label className="block mb-2 font-semibold">Type of Ride</label>
//         <div className="flex gap-4 flex-wrap">
//           {["Thriller", "Kiddi", "High Thriller"].map((option) => (
//             <label key={option} className="flex items-center gap-1">
//               <input
//                 type="radio"
//                 name="type"
//                 value={option}
//                 checked={type === option}
//                 onChange={(e) => setType(e.target.value)}
//                 className="form-radio text-purple-600"
//               />
//               {option}
//             </label>
//           ))}
//         </div>
//       </div>

//       {/* Age Limit */}
//       <div className="mb-6">
//         <label className="block mb-2 font-semibold">Age Limit</label>
//         <div className="flex flex-wrap gap-4">
//           {["5-10", "10-18", "18-50", "5-18", "5-50", "10-50"].map((option) => (
//             <label key={option} className="flex items-center gap-1">
//               <input
//                 type="radio"
//                 name="age"
//                 value={option}
//                 checked={ageLimit === option}
//                 onChange={(e) => setAgeLimit(e.target.value)}
//                 className="form-radio text-purple-600"
//               />
//               {option}
//             </label>
//           ))}
//         </div>
//       </div>

//       {/* File Upload */}
//       <div className="mb-6">
//         <label className="block mb-1 font-semibold">Upload Ride Image</label>
//         <input
//           type="file"
//           accept="image/*"
//           onChange={(e) => setImage(e.target.files[0])}
//           className="w-full border p-2 rounded focus:ring-2 focus:ring-purple-400"
//           required
//         />
//       </div>

//       <button
//         type="submit"
//         className="w-full bg-purple-600 text-white p-3 rounded-lg hover:bg-purple-700 transition"
//       >
//         ➕ Add Ride
//       </button>
//     </form>
//   </div>
// </div>

//       {/* Rides Table */}
//       <div className="bg-white p-6 rounded-2xl shadow-lg overflow-x-auto ">
//         <h3 className="text-xl font-bold mb-4 text-purple-700 text-center">
//           📋 All Rides
//         </h3>
//         <table className="w-full border border-gray-200 rounded-lg overflow-hidden">
//           <thead>
//             <tr className="bg-purple-50 text-purple-800">
//               <th className="p-2 border">Ride Name</th>
//               <th className="p-2 border">Capacity</th>
//               <th className="p-2 border">Location</th>
//               <th className="p-2 border">Type</th>
//               <th className="p-2 border">Age Limit</th>
//               <th className="p-2 border">Info</th>
//               <th className="p-2 border">Image</th>
//             </tr>
//           </thead>
//           <tbody>
//             {rides.length > 0 ? (
//               rides.map((ride) => (
//                 <tr
//                   key={ride._id}
//                   className="hover:bg-gray-50 transition-colors"
//                 >
//                   <td className="p-2 border">{ride.rideName}</td>
//                   <td className="p-2 border">{ride.capacity}</td>
//                   <td className="p-2 border">{ride.location}</td>
//                   <td className="p-2 border">{ride.type}</td>
//                   <td className="p-2 border">{ride.ageLimit}</td>
//                   <td className="p-2 border text-sm text-gray-600">
//                     {ride.information}
//                   </td>
//                   <td className="p-2 border">
//                     {ride.image ? (
//                       <img
//                         src={ride.image}
//                         alt={ride.rideName}
//                         className="w-16 h-16 object-cover rounded"
//                       />
//                     ) : (
//                       <span className="text-gray-400">No Image</span>
//                     )}
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="7" className="text-center p-4 text-gray-500">
//                   No rides available.
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>

//   );
// }
"use client";

import { useEffect, useState } from "react";
import AdminHeader from "../header/page";
import { Trash } from 'lucide-react';
import { SquarePen } from 'lucide-react';
import { Plus } from 'lucide-react';
import { useRouter } from "next/navigation";

function AddRideForm() {
      const router = useRouter(); // ✅ Router instance
  
  const [rideName, setRideName] = useState("");
  const [capacity, setCapacity] = useState("");
  const [location, setLocation] = useState("");
  const [information, setInformation] = useState("");
  const [type, setType] = useState("");
  const [ageLimit, setAgeLimit] = useState("");
  const [image, setImage] = useState("");
  const [message, setMessage] = useState("");
  const [rides, setRides] = useState([]);
  const [editingId, setEditingId] = useState(null); // ✅ Track edit mode

  // Fetch rides
  useEffect(() => {
    fetchRides();
  }, []);


  

  async function fetchRides() {
    try {
      const res = await fetch("/api/rides");
      const data = await res.json();
      setRides(data.rides || []);
    } catch (err) {
      console.error("Failed to fetch rides", err);
    }
  }

   // convert image to base64
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result); // base64 string
    };
    reader.readAsDataURL(file);
  };

  // Add / Update Ride
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (capacity === "" || Number (capacity) < 0) {
      setMessage("❌ Capacity must be a positive number.");
      return;
    }

    const rideData = {
      rideName,
      capacity,
      location,
      information,
      type,
      ageLimit,
      image,
    };

    const url = editingId ? `/api/admin/rides/${editingId}` : "/api/admin/rides";
    const method = editingId ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(rideData),
    });

    const data = await res.json();

    if (res.ok) {
      setMessage(editingId ? "Ride updated successfully!" : "Ride added successfully!");
      resetForm();
      fetchRides();
    } else {
      setMessage(data.error || "Failed to save ride");
    }
  };

  // Delete Ride
  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this ride?")) return;

    const res = await fetch(`/api/admin/rides/${id}`, { method: "DELETE" });
    if (res.ok) {
      setMessage("Ride deleted successfully!");
                          router.refresh(); // ✅ Refresh after mutation

        setRides(rides.filter((r) => r._id !== id)); // Remove locally
    } else {
      setMessage("Failed to delete ride");
    }
  };

  // Load ride into form for editing
  const handleEdit = (ride) => {
    setRideName(ride.rideName);
    setCapacity(ride.capacity);
    setLocation(ride.location);
    setInformation(ride.information);
    setType(ride.type);
    setAgeLimit(ride.ageLimit);
    setImage(ride.image);
    setEditingId(ride._id);
  };

  // Reset form
  const resetForm = () => {
    setRideName("");
    setCapacity("");
    setLocation("");
    setInformation("");
    setType("Thriller");
    setAgeLimit("5-10");
    setImage("");
    setEditingId(null);
  };

  return (
    <div>
      <AdminHeader />

      {/* Ride Form */}
      <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-6 my-20">
        <div className="w-full max-w-2xl">
          <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-lg">
            <h2 className="text-2xl font-bold mb-6 text-center text-purple-700">
              {editingId ? "✏️ Edit Ride" : "🎢 Add New Ride"}
            </h2>

            {message && (
              <p className="mb-4 text-center font-semibold text-green-600">{message}</p>
            )}

            {/* Ride Name */}
            <div className="mb-4">
              {/* <label className="block mb-1 font-semibold">Ride Name</label> */}
              <input
                type="text"
                placeholder="Ride Name"
                value={rideName}
                onChange={(e) => setRideName(e.target.value)}
                className="w-full border p-2 rounded focus:ring-2 focus:ring-purple-400"
                required
              />
            </div>

            {/* Capacity */}
            <div className="mb-4">
              {/* <label className="block mb-1 font-semibold">Capacity</label> */}
              <input
                type="number"
                placeholder="Capacity"
                value={capacity}
                min="0"
                onChange={(e) => setCapacity(e.target.value)}
                className="w-full border p-2 rounded focus:ring-2 focus:ring-purple-400"
                required
              />
            </div>

            {/* Location */}
            <div className="mb-4">
              {/* <label className="block mb-1 font-semibold">Location</label> */}
              <input
                type="text"
                placeholder="Location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full border p-2 rounded focus:ring-2 focus:ring-purple-400"
                required
              />
            </div>

            {/* Information */}
            <div className="mb-4">
              {/* <label className="block mb-1 font-semibold">Information</label> */}
              <textarea
                value={information}
                onChange={(e) => setInformation(e.target.value)}
                className="w-full border p-2 rounded focus:ring-2 focus:ring-purple-400"
                rows={3}
                placeholder="Information"
                required
              />
            </div>

            {/* Ride Type */}
            <div className="mb-4">
              <label className="block mb-2 font-semibold">Type of Ride</label>
              <div className="flex gap-4 flex-wrap">
                {["Thriller", "Kiddi", "High Thriller"].map((option) => (
                  <label key={option} className="flex items-center gap-1">
                    <input
                      type="radio"
                      name="type"
                      value={option}
                      checked={type === option}
                      onChange={(e) => setType(e.target.value)}
                      className="form-radio text-purple-600"
                      required
                    />
                    {option}
                  </label>
                ))}
              </div>
            </div>

            {/* Age Limit */}
            <div className="mb-6">
              <label className="block mb-2 font-semibold">Age Limit</label>
              <div className="flex flex-wrap gap-4">
                {["5-10", "10-18", "18-50", "5-18", "5-50", "10-50"].map(
                  (option) => (
                    <label key={option} className="flex items-center gap-1">
                      <input
                        type="radio"
                        name="age"
                        value={option}
                        checked={ageLimit === option}
                        onChange={(e) => setAgeLimit(e.target.value)}
                        className="form-radio text-purple-600"
                        required
                      />
                      {option}
                    </label>
                  )
                )}
              </div>
            </div>

            {/* File Upload */}
            <div className="mb-6">
              <label className="block mb-1 font-semibold">Upload Ride Image</label>
              <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full border p-2 rounded mb-6"
            required
          />
            </div>

            <button
              type="submit"
              className="w-full bg-purple-600 text-white p-3 rounded-lg hover:bg-purple-700 transition"
            >
              {editingId ? <SquarePen /> : <Plus />} {editingId ? "Update Ride" : "Add Ride"}
            </button>

            {editingId && (
              <button
                type="button"
                onClick={resetForm}
                className="w-full mt-3 bg-gray-400 text-white p-3 rounded-lg hover:bg-gray-500 transition"
              >
                <Trash /> Cancel Edit
              </button>
            )}
          </form>
        </div>
      </div>

      {/* Rides Table */}
      <div className="bg-white p-6 rounded-2xl shadow-lg overflow-x-auto mx-6 my-10">
        <h3 className="text-xl font-bold mb-4 text-purple-700 text-center">
          📋 All Rides
        </h3>
        <table className="w-full border border-gray-200 rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-purple-50 text-purple-800">
              <th className="p-2 border">Ride Name</th>
              <th className="p-2 border">Capacity</th>
              <th className="p-2 border">Location</th>
              <th className="p-2 border">Type</th>
              <th className="p-2 border">Age Limit</th>
              <th className="p-2 border">Info</th>
              <th className="p-2 border">Image</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {rides.length > 0 ? (
              rides.map((ride) => (
                <tr key={ride._id} className="hover:bg-gray-50 transition-colors">
                  <td className="p-2 border">{ride.rideName}</td>
                  <td className="p-2 border">{ride.capacity}</td>
                  <td className="p-2 border">{ride.location}</td>
                  <td className="p-2 border">{ride.type}</td>
                  <td className="p-2 border">{ride.ageLimit}</td>
                  <td className="p-2 border text-sm text-gray-600">
                    {ride.information}
                  </td>
                  <td className="p-2 border">
                    {ride.image ? (
                      <img
                        src={ride.image}
                        alt={ride.rideName}
                        className="w-16 h-16 object-cover rounded"
                      />
                    ) : (
                      <span className="text-gray-400">No Image</span>
                    )}
                  </td>
                  <td className="p-2 border flex gap-2 justify-center">
                    <button
                      onClick={() => handleEdit(ride)}
                      className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                      <SquarePen /> Edit
                    </button>
                    <button
                      onClick={() => handleDelete(ride._id)}
                      className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                      <Trash /> Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center p-4 text-gray-500">
                  No rides available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AddRideForm;