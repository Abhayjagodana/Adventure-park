"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FaUser, FaHotel, FaBox, FaTicketAlt, FaEnvelope } from "react-icons/fa"; // FaEnvelope for contact
import AdminHeader from "./header/page";
import { Bike } from 'lucide-react';
import Loader from "./loader";
import Link from "next/link";


export default function Dashboard() {
  const router = useRouter();
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalRides, setTotalRides] = useState(0);
  const [totalrooms, setTotalRooms] = useState(0);
  const [totalpackage, setPackages] = useState(0);
  const [totalbooking, setbooking] = useState(0);
  const [totalcontact, setcontact] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    // Verify admin session before fetching data
    const verifyAdmin = async () => {
      try {
        const res = await fetch("/api/admin/me", { credentials: "include" });
        if (!res.ok) {
          router.replace("/admin/login");
          return false;
        }
        return true;
      } catch {
        router.replace("/admin/login");
        return false;
      }
    };

    const fetchCounts = async () => {
      try {
        // Fetch total users
        const resUsers = await fetch("/api/admin/user/count", { credentials: "include" });
        const dataUsers = await resUsers.json();
        setTotalUsers(dataUsers.totalUsers || 0);

        // Fetch total Rides
        const resRides = await fetch("/api/admin/rides/count", { credentials: "include" });
        const dataRides = await resRides.json();
        setTotalRides(dataRides.totalRides || 0);

        // Fetch total Resorts
        const resRooms = await fetch("/api/admin/resorts/count", { credentials: "include" });
        const dataRooms = await resRooms.json();
        setTotalRooms(dataRooms.totalrooms || 0);

        //fetch total package
        const respackage = await fetch("/api/admin/packages/count");
        const dataCourses = await respackage.json();
        setPackages(dataCourses.totalpackage || 0);

        // Fetch total booking
        const resbooking = await fetch("/api/admin/booking/count", { credentials: "include" });
        const dataContact = await resbooking.json();
        setbooking(dataContact.totalbooking || 0);

        // Fetch total booking
        const rescontact = await fetch("/api/admin/contact/count", { credentials: "include" });
        const datacontact = await rescontact.json();
        setcontact(datacontact.totalcontact || 0);
      } catch (err) {
        console.error("Fetch error:", err);
        setError("Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };

    (async () => {
      const ok = await verifyAdmin();
      if (ok) fetchCounts();
    })();
  }, []);
  if (loading) return <Loader />;
  if (error) return <div className="text-center mt-6 text-red-600">{error}</div>;

  return (
    <div>
      <AdminHeader />
      <div className="flex justify-center items-start min-h-screen bg-gray-100 pt-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Total Users Card */}
          <Link href="/admin/user">
            <div className="bg-white shadow-lg rounded-lg p-10 text-center w-64 aspect-square flex flex-col justify-center items-center">
              <FaUser className="text-purple-800 w-12 h-12 mb-4" />
              <h2 className="text-xl font-semibold mb-2">Total Users</h2>
              <p className="text-2xl font-bold">{totalUsers}</p>
            </div>
          </Link>

          {/* Total Rides Card */}
          <Link href="/admin/rides">
            <div className="bg-white shadow-lg rounded-lg p-10 text-center w-64 aspect-square flex flex-col justify-center items-center">
              <Bike className="text-green-600 w-12 h-12 mb-4" />
              <h2 className="text-xl font-semibold mb-2">Total Rides</h2>
              <p className="text-2xl font-bold">{totalRides}</p>
            </div>
          </Link>

          {/* Total Resorts Card */}
          <Link href="/admin/resort">
            <div className="bg-white shadow-lg rounded-lg p-10 text-center w-64 aspect-square flex flex-col justify-center items-center">
              <FaHotel className="text-blue-600 w-12 h-12 mb-4" />
              <h2 className="text-xl font-semibold mb-2">Total Resorts</h2>
              <p className="text-2xl font-bold">{totalrooms}</p>
            </div>
          </Link>

          {/* Total package Card */}
          <Link href="/admin/packages">
            <div className="bg-white shadow-lg rounded-lg p-10 text-center w-64 aspect-square flex flex-col justify-center items-center">
              <FaBox className="text-red-600 w-12 h-12 mb-4" />
              <h2 className="text-xl font-semibold mb-2">Total package</h2>
              <p className="text-2xl font-bold">{totalpackage}</p>
            </div>
          </Link>

          {/* Total booking Card */}
          <Link href="/admin/booking">
            <div className="bg-white shadow-lg rounded-lg p-10 text-center w-64 aspect-square flex flex-col justify-center items-center">
              <FaTicketAlt className="text-red-600 w-12 h-12 mb-4" />
              <h2 className="text-xl font-semibold mb-2">Total booking</h2>
              <p className="text-2xl font-bold">{totalbooking}</p>
            </div>
          </Link>

          {/* Total contact Card */}

          <Link href="/admin/contact">
            <div className="bg-white shadow-lg rounded-lg p-10 text-center w-64 aspect-square flex flex-col justify-center items-center">
              <FaEnvelope className="text-red-600 w-12 h-12 mb-4" />
              <h2 className="text-xl font-semibold mb-2">Total Contact</h2>
              <p className="text-2xl font-bold">{totalcontact}</p>
            </div>
          </Link>

        </div>
      </div>
    </div>
  );
}