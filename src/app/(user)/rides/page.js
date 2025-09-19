"use client"
import Image from "next/image";
import { useEffect, useState } from "react";

export default function RidesPage() {
  const [rides, setRides] = useState([]);

  useEffect(() => {
    async function fetchRides() {
      const res = await fetch("/api/rides");
      const data = await res.json();
      setRides(data.rides || []);
    }
    fetchRides();
  }, []);

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-extrabold mb-6 text-purple-700 text-center">
        🎢 Available Rides
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {rides.map((ride) => (
          <div
            key={ride._id}
            className="bg-white border border-gray-200 rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow"
          >
            {/* <Image
              width={400}
              height={300}
              src={ride.image}
              alt={ride.rideName}
              className="w-full h-48 object-cover rounded-lg mb-4"
            /> */}
            {ride.image ? (
              <img
              src={ride.image && ride.image.trim() !== "" ? ride.image : "/placeholder.jpg"}
              alt={ride.rideName}
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            ) : (
              <div className="w-40 h-40 bg-gray-200 flex items-center justify-center rounded mb-4">
                No Image
              </div>
            )}

            <h2 className="font-bold text-xl text-purple-600 mb-2">
              {ride.rideName}
            </h2>

            <div className="space-y-1 text-gray-700">
              <p>
                <span className="font-semibold">Capacity:</span> {ride.capacity}
              </p>
              <p>
                <span className="font-semibold">Location:</span> {ride.location}
              </p>
              <p>
                <span className="font-semibold">Type:</span> {ride.type}
              </p>
              <p>
                <span className="font-semibold">Age Limit:</span>{" "}
                {ride.ageLimit}
              </p>
              {ride.information && (
                <p className="text-sm text-gray-600 italic">
                  {ride.information}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
