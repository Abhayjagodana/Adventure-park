"use client";

import { useEffect, useState } from "react";
import AdminHeader from "../header/page";

export default function AdminBookings() {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(false);

    // Fetch all bookings
    const fetchBookings = async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/booking");
            const data = await res.json();
            setBookings(data || []);
        } catch (err) {
            console.error("Error fetching bookings:", err);
            setBookings([]);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchBookings();
    }, []);

    // Delete booking
    const handleDelete = async (id) => {
        if (!confirm("Are you sure you want to delete this booking?")) return;

        try {
            const res = await fetch(`/api/booking?id=${id}`, { method: "DELETE" });
            const data = await res.json();
            if (data.success) {
                alert("Booking deleted successfully!");
                fetchBookings(); // refresh table
            } else {
                alert("Failed to delete booking: " + data.error);
            }
        } catch (err) {
            console.error(err);
            alert("Error deleting booking");
        }
    };

    //   // Update booking (example: update totalPeople to 5)
    //   const handleUpdate = async (b) => {
    //     const updated = { ...b, totalPeople: Number(b.totalPeople) + 1 };
    //     try {
    //       const res = await fetch("/api/booking", {
    //         method: "PUT",
    //         headers: { "Content-Type": "application/json" },
    //         body: JSON.stringify({ id: b._id, ...updated }),
    //       });
    //       const data = await res.json();
    //       if (data.success) {
    //         alert("Booking updated successfully!");
    //         fetchBookings();
    //       } else {
    //         alert("Failed to update booking: " + data.error);
    //       }
    //     } catch (err) {
    //       console.error(err);
    //       alert("Error updating booking");
    //     }
    //   };
    // Accept booking
    const handleAccept = async (b) => {
        try {
            const res = await fetch("/api/booking", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id: b._id, status: "Accepted" }),
            });
            const data = await res.json();
            if (data.success) {
                alert("Booking accepted!");
                setBookings((prev) =>
                    prev.map((booking) =>
                        booking._id === b._id ? { ...booking, status: "Accepted" } : booking
                    )
                );
            } else {
                alert("Failed to accept booking: " + data.error);
            }
        } catch (err) {
            console.error(err);
            alert("Error accepting booking");
        }
    };

    return (
        <div>
            <AdminHeader />
            <div className="max-w-7xl mx-auto p-6 bg-white shadow-xl rounded-2xl my-32">
                <h1 className="text-2xl font-bold mb-4 text-center text-purple-700">📋 All Bookings</h1>

                {loading && <p className="text-center text-gray-500">Loading bookings...</p>}

                {!loading && (
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse border border-gray-300">
                            <thead>
                                <tr className="bg-purple-100 text-purple-800">
                                    <th className="border p-2">Name</th>
                                    <th className="border p-2">Email</th>
                                    <th className="border p-2">Resort</th>
                                    <th className="border p-2">Ride</th>
                                    <th className="border p-2">Package</th>
                                    <th className="border p-2">Date</th>
                                    <th className="border p-2">People</th>
                                    <th className="border p-2">Amount</th>
                                    <th className="border p-2">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {bookings.length > 0 ? (
                                    bookings.map((b, i) => (
                                        <tr
                                            key={b._id}
                                            className={`text-center ${i % 2 === 0 ? "bg-gray-50" : "bg-white"} hover:bg-gray-100`}
                                        >
                                            <td className="border p-2">{b.name}</td>
                                            <td className="border p-2">{b.email}</td>
                                            <td className="border p-2">{b.resort}</td>
                                            <td className="border p-2">{b.ride}</td>
                                            <td className="border p-2">{b.package}</td>
                                            <td className="border p-2">{b.date}</td>
                                            <td className="border p-2">{b.totalPeople}</td>
                                            <td className="border p-2 font-semibold text-green-700">₹{b.totalAmount}</td>
                                            <td className="border p-2 flex gap-2 justify-center">
                                                {/* <button
                        onClick={() => handleUpdate(b)}
                        className="px-3 py-1 bg-blue-500 text-white rounded"
                      >
                        Update
                      </button> */}

                                                {b.status !== "Accepted" && (
                                                    <button
                                                        onClick={() => handleAccept(b)}
                                                        className="px-3 py-1 bg-blue-500 text-white rounded"
                                                    >
                                                        Accept
                                                    </button>
                                                )}
                                                <button
                                                    onClick={() => handleDelete(b._id)}
                                                    className="px-3 py-1 bg-red-500 text-white rounded"
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="9" className="text-center p-4 text-gray-500">
                                            No bookings found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}
