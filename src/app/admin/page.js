"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FaUser, FaHotel ,FaPenFancy, FaEnvelope } from "react-icons/fa"; // FaEnvelope for contact
import AdminHeader from "./header/page";
import { Bike } from 'lucide-react';


export default function Dashboard() {
  const router = useRouter();
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalRides, setTotalRides] = useState(0);
  const [totalrooms, setTotalRooms] = useState(0);
  // const [totalCourses, setTotalCourses] = useState(0);
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

        //fetch total courses
        //         const resCourses = await fetch("/api/admin/course/count");
        // const dataCourses = await resCourses.json();
        // setTotalCourses(dataCourses.totalCourses || 0);

        // Fetch total contacts
        // const resContact = await fetch("/api/admin/contact/count", { credentials: "include" });
        // const dataContact = await resContact.json();
        // setTotalContact(dataContact.totalContact || 0);
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
  if (loading) return "loading...";
  if (error) return <div className="text-center mt-6 text-red-600">{error}</div>;

  return (
    <div>
      <AdminHeader/>
      <div className="flex justify-center items-start min-h-screen bg-gray-100 pt-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Total Users Card */}
          <div className="bg-white shadow-lg rounded-lg p-10 text-center w-64 aspect-square flex flex-col justify-center items-center">
            <FaUser className="text-purple-800 w-12 h-12 mb-4" />
            <h2 className="text-xl font-semibold mb-2">Total Users</h2>
            <p className="text-2xl font-bold">{totalUsers}</p>
          </div>

          {/* Total Rides Card */}
          <div className="bg-white shadow-lg rounded-lg p-10 text-center w-64 aspect-square flex flex-col justify-center items-center">
            <Bike className="text-green-600 w-12 h-12 mb-4" />
            <h2 className="text-xl font-semibold mb-2">Total Rides</h2>
            <p className="text-2xl font-bold">{totalRides}</p>
          </div>

          {/* Total Resorts Card */}
          <div className="bg-white shadow-lg rounded-lg p-10 text-center w-64 aspect-square flex flex-col justify-center items-center">
            <FaHotel className="text-blue-600 w-12 h-12 mb-4" />
            <h2 className="text-xl font-semibold mb-2">Total Resorts</h2>
            <p className="text-2xl font-bold">{totalrooms}</p>
          </div>

          {/* Total Courses Card */}
          {/* <div className="bg-white shadow-lg rounded-lg p-10 text-center w-64 aspect-square flex flex-col justify-center items-center">
  <FaPenFancy className="text-red-600 w-12 h-12 mb-4" />
  <h2 className="text-xl font-semibold mb-2">Total Courses</h2>
  <p className="text-2xl font-bold">{totalCourses}</p>
</div> */}
        </div>
      </div>
    </div>
  );
}