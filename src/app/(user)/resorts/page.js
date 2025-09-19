"use client";

import { useEffect, useState } from "react";
import Header from "../Header/page";
import Link from "next/link";

export default function UserResorts() {
  const [resorts, setResorts] = useState([]);

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
    }
  }

  return (
    <div>
      <Header/>
      <div className="min-h-screen bg-gray-100 py-12 px-6">
        <h1 className="text-3xl font-bold text-purple-700 text-center mb-8">
          🏨 Available Resort Rooms
        </h1>

        {resorts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {resorts.map((room) => (
              <div
                key={room._id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition"
              >
                <img
                  src={room.image}
                  alt={room.roomType}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h2 className="text-xl font-semibold text-purple-800">
                    {room.roomType}
                  </h2>
                  <p className="text-gray-600 text-sm mb-3">{room.information}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-purple-700 font-bold text-lg">
                      ₹{room.price}
                    </span>
                    <span className="text-gray-500 text-sm">
                      {room.noOfRooms} rooms available
                    </span>
                  </div>
                  <button className="mt-4 w-full bg-purple-600 text-white p-2 rounded-lg hover:bg-purple-700">
                    <Link href={`/booking/resorts/${room._id}`}>Book Now</Link>

                  </button>
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
