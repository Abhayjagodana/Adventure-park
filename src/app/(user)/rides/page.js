"use client";
import { useEffect, useState } from "react";
import Header from "../Header/page";
import Link from "next/link";
import Image from "next/image";

export default function RidesPage() {
  const [rides, setRides] = useState([]);
  const [loading, setLoading] = useState(true); // track loading state

  useEffect(() => {
    async function fetchRides() {
      try {
        const res = await fetch("/api/rides");
        const data = await res.json();
        setRides(data.rides || []);
      } catch (err) {
        console.error("Failed to fetch rides", err);
        setRides([]);
      } finally {
        setLoading(false);
      }
    }
    fetchRides();
  }, []);

  // Skeleton loader component
  const SkeletonCard = () => (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden animate-pulse">
      <div className="w-full h-48 bg-gray-300"></div>
      <div className="p-4 space-y-3">
        <div className="h-6 bg-gray-300 rounded w-2/3"></div>
        <div className="h-4 bg-gray-200 rounded w-full"></div>
        <div className="h-4 bg-gray-200 rounded w-5/6"></div>
        <div className="h-10 bg-gray-300 rounded mt-4"></div>
      </div>
    </div>
  );

  return (
    <div>
      <Header />
      <div className="min-h-screen bg-gray-100 py-12 px-6">
        <h1 className="text-3xl font-bold text-purple-700 text-center mb-8">
          🎢 Available Rides
        </h1>

        {/* Loader */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[...Array(3)].map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : rides.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {rides.map((ride) => (
              <div
                key={ride._id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition"
              >
                {ride.image ? (
                  <Image
                    src={
                      ride.image && ride.image.trim() !== ""
                        ? ride.image
                        : "/placeholder.jpg"
                    }
                    alt={ride.rideName || "Ride Image"}
                    width={500}             // required by Next.js Image
                    height={200}            // required by Next.js Image
                    className="w-full h-48 object-cover"
                  />
                ) : (
                  <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                    No Image
                  </div>
                )}

                <div className="p-4">
                  <h2 className="text-xl font-semibold text-purple-800">
                    {ride.rideName || "-"}
                  </h2>
                  <p className="text-gray-600 text-sm mb-3">
                    {ride.information || "-"}
                  </p>

                  <div className="space-y-1 text-gray-700 mb-3">
                    <p>
                      <span className="font-semibold">Capacity:</span>{" "}
                      {ride.capacity || "-"}
                    </p>
                    <p>
                      <span className="font-semibold">Location:</span>{" "}
                      {ride.location || "-"}
                    </p>
                    <p>
                      <span className="font-semibold">Type:</span>{" "}
                      {ride.type || "-"}
                    </p>
                    <p>
                      <span className="font-semibold">Age Limit:</span>{" "}
                      {ride.ageLimit || "-"}
                    </p>
                  </div>

                  <Link
                    href="/booking"
                    className="mt-2 block w-full text-center bg-purple-600 text-white p-2 rounded-lg hover:bg-purple-700"
                  >
                    Book Now
                  </Link>
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
