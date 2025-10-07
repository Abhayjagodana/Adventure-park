// "use client";

// import { useEffect, useState } from "react";
// import Header from "../Header/page";
// import Link from "next/link";

// export default function UserResorts() {
//   const [resorts, setResorts] = useState([]);

//   useEffect(() => {
//     fetchResorts();
//   }, []);

//   async function fetchResorts() {
//     try {
//       const res = await fetch("/api/resorts");
//       const data = await res.json();
//       setResorts(data.resorts || []);
//     } catch (err) {
//       console.error("Failed to fetch resorts", err);
//     }
//   }

//   return (
//     <div>
//       <Header/>
//       <div className="min-h-screen bg-gray-100 py-12 px-6">
//         <h1 className="text-3xl font-bold text-purple-700 text-center mb-8">
//           🏨 Available Resort Rooms
//         </h1>

//         {resorts.length > 0 ? (
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
//             {resorts.map((room) => (
//               <div
//                 key={room._id}
//                 className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition"
//               >
//                 <img
//                   src={room.image}
//                   alt={room.roomType}
//                   className="w-full h-48 object-cover"
//                 />
//                 <div className="p-4">
//                   <h2 className="text-xl font-semibold text-purple-800">
//                     {room.roomType}
//                   </h2>
//                   <p className="text-gray-600 text-sm mb-3">{room.information}</p>
//                   <div className="flex justify-between items-center">
//                     <span className="text-purple-700 font-bold text-lg">
//                       ₹{room.price}
//                     </span>
//                     <span className="text-gray-500 text-sm">
//                       {room.noOfRooms} rooms available
//                     </span>
//                   </div>
//                   <button className="mt-4 w-full bg-purple-600 text-white p-2 rounded-lg hover:bg-purple-700">
//                     <Link href='/booking'>Book Now</Link>

//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         ) : (
//           <p className="text-center text-gray-500">No rooms available.</p>
//         )}
//       </div>
//     </div>
//   );
// }
"use client";

import { useEffect, useState } from "react";
import Header from "../Header/page";
import Link from "next/link";
import Image from "next/image";

export default function UserResorts() {
  const [resorts, setResorts] = useState([]);
  const [loading, setLoading] = useState(true); // track loading

  useEffect(() => {
    fetchResorts();
  }, []);

  async function fetchResorts() {
    try {
      const res = await fetch("/api/resorts");
      const data = await res.json();
      setResorts(data.resorts || []);
    } catch (err) {
      console.error("Failed to fetch resorts", err);
      setResorts([]);
    } finally {
      setLoading(false);
    }
  }

  // Skeleton card for shimmer effect
  const SkeletonCard = () => (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden animate-pulse">
      <div className="w-full h-48 bg-gray-300"></div>
      <div className="p-4 space-y-3">
        <div className="h-6 bg-gray-300 rounded w-2/3"></div>
        <div className="h-4 bg-gray-200 rounded w-full"></div>
        <div className="flex justify-between items-center">
          <div className="h-6 bg-gray-300 rounded w-1/4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/3"></div>
        </div>
        <div className="h-10 bg-gray-300 rounded mt-4"></div>
      </div>
    </div>
  );

  return (
    <div>
      <Header />
      <div className="min-h-screen bg-gray-100 py-12 px-6">
        <h1 className="text-3xl font-bold text-purple-700 text-center mb-8">
          🏨 Available Resort Rooms
        </h1>

        {/* Loader */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[...Array(3)].map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : resorts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {resorts.map((room) => (
              <div
                key={room._id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition"
              >

                {/* <Image
                  src={
                    room.image && room.image.trim() !== ""
                      ? room.image
                      : "/placeholder.jpg"
                  }
                  alt={room.roomType || "Room"}
                  width={500}          // required for Image
                  height={200}         // required for Image
                  className="w-full h-48 object-cover"
                /> */}
                 <Image
                  src={room.image?.trim() ? room.image : "/placeholder.jpg"}
                  alt={room.roomType || "Room"}
                  width={500}
                  height={200}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h2 className="text-xl font-semibold text-purple-800">
                    {room.roomType || "-"}
                  </h2>
                  <p className="text-gray-600 text-sm mb-3">
                    {room.information || "-"}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-purple-700 font-bold text-lg">
                      ₹{room.price || "-"}
                    </span>
                    <span className="text-gray-500 text-sm">
                      {room.noOfRooms || 0} rooms available
                    </span>
                  </div>
                  <Link
                    href="/booking"
                    className="mt-4 block w-full text-center bg-purple-600 text-white p-2 rounded-lg hover:bg-purple-700"
                  >
                    Book Now
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">No rooms available.</p>
        )}
      </div>
    </div>
  );
}
