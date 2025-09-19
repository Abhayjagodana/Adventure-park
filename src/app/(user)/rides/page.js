"use client"
import Image from "next/image";
import { useEffect, useState } from "react";
import Header from "../Header/page";

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
    <div>
      <Header/>
    <div className="min-h-screen bg-gray-100 py-12 px-6">
        <h1 className="text-3xl font-bold text-purple-700 text-center mb-8">
          🎢 Available Rides
        </h1>

        {rides.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {rides.map((ride) => (
              <div
                key={ride._id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition"
              >
                {ride.image ? (
                  <img
                    src={ride.image && ride.image.trim() !== "" ? ride.image : "/placeholder.jpg"}
                    alt={ride.rideName}
                    className="w-full h-48 object-cover"
                  />
                ) : (
                  <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                    No Image
                  </div>
                )}

                <div className="p-4">
                  <h2 className="text-xl font-semibold text-purple-800">
                    {ride.rideName}
                  </h2>
                  <p className="text-gray-600 text-sm mb-3">{ride.information}</p>

                  <div className="space-y-1 text-gray-700 mb-3">
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
                      <span className="font-semibold">Age Limit:</span> {ride.ageLimit}
                    </p>
                  </div>

                  <button className="mt-2 w-full bg-purple-600 text-white p-2 rounded-lg hover:bg-purple-700">
                    Book Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">No rides available.</p>
        )}
      </div>
    </div>
  );
}
