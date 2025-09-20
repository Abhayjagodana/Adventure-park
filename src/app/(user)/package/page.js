// "use client";

// import { useEffect, useState } from "react";
// import Header from "../Header/page";
// import Link from "next/link";

// export default function UserPackages() {
//   const [packages, setPackages] = useState([]);

//   useEffect(() => {
//     async function fetchPackages() {
//       const res = await fetch("/api/package");
//       const data = await res.json();
//       setPackages(data.packages || []);
//     }
//     fetchPackages();
//   }, []);


//   return (
//     <div>
//       <Header />
//       <div className="min-h-screen bg-gray-100 p-8">
//         <h1 className="text-3xl font-bold text-purple-700 text-center mb-8">
//           🎟️ Available Packages
//         </h1>

//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//           {packages.length > 0 ? (
//             packages.map((pkg) => (
//               <div
//                 key={pkg._id}
//                 className="bg-white shadow-lg rounded-xl overflow-hidden border border-gray-200 hover:shadow-xl transition"
//               >
//                 {pkg.image ? (
//                   <img
//                     src={pkg.image.trim() !== "" ? pkg.image : "/placeholder.jpg"}
//                     alt={pkg.name}
//                     className="w-full h-48 object-cover"
//                   />
//                 ) : (
//                   <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
//                     No Image
//                   </div>
//                 )}
//                 {/* Content */}
//                 <div className="p-4">
//                   <h2 className="text-xl font-semibold text-purple-800">
//                     {pkg.name}
//                   </h2>
//                   <p className="text-sm text-gray-600 mt-1">{pkg.information}</p>

//                   {/* Prices */}
//                   <div className="mt-4 space-y-1 text-sm">
//                     <p>
//                       <span className="font-medium text-gray-700">Adult:</span>{" "}
//                       ₹{pkg.adultPrice}
//                     </p>
//                     <p>
//                       <span className="font-medium text-gray-700">Teenager:</span>{" "}
//                       ₹{pkg.teenagerPrice}
//                     </p>
//                     <p>
//                       <span className="font-medium text-gray-700">Kids:</span>{" "}
//                       ₹{pkg.kidsPrice}
//                     </p>
//                   </div>

//                   <button className="mt-4 w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition">
//                     <Link href={`/booking/packages/${pkg._id}`}>Book Now</Link>
//                   </button>
//                 </div>
//               </div>
//             ))
//           ) : (
//             <p className="col-span-full text-center text-gray-500">
//               No packages available yet.
//             </p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }
"use client";

import { useEffect, useState } from "react";
import Header from "../Header/page";
import Link from "next/link";

function UserPackages() {
  const [packages, setPackages] = useState([]);

  useEffect(() => {
    async function fetchPackages() {
      const res = await fetch("/api/package");
      const data = await res.json();
      setPackages(data.packages || []);
    }
    fetchPackages();
  }, []);

  return (
    <div>
      <Header />
      <div className="min-h-screen bg-gray-100 p-8">
        <h1 className="text-3xl font-bold text-purple-700 text-center mb-8">
          🎟️ Available Packages
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {packages.length > 0 ? (
            packages.map((pkg) => (
              <div
                key={pkg._id}
                className="bg-white shadow-lg rounded-xl overflow-hidden border border-gray-200 hover:shadow-xl transition flex flex-col"
              >
                {/* Image at the top */}
                <div className="h-48 w-full overflow-hidden">
                  {pkg.image ? (
                    <img
                      src={pkg.image.trim() !== "" ? pkg.image : "/placeholder.jpg"}
                      alt={pkg.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                      No Image
                    </div>
                  )}
                </div>

                {/* Content below */}
                <div className="p-4 flex-1 flex flex-col">
                  <h2 className="text-xl font-semibold text-purple-800">{pkg.name}</h2>
                  <p className="text-sm text-gray-600 mt-1">{pkg.information}</p>

                  {/* Prices */}
                  <div className="mt-4 space-y-1 text-sm">
                    <p>
                      <span className="font-medium text-gray-700">Adult:</span> ₹{pkg.adultPrice}
                    </p>
                    <p>
                      <span className="font-medium text-gray-700">Teenager:</span> ₹{pkg.teenagerPrice}
                    </p>
                    <p>
                      <span className="font-medium text-gray-700">Kids:</span> ₹{pkg.kidsPrice}
                    </p>
                  </div>

                  <button className="mt-auto w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition">
                    <Link href={`/booking/packages/${pkg._id}`}>Book Now</Link>
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="col-span-full text-center text-gray-500">
              No packages available yet.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
export default UserPackages;