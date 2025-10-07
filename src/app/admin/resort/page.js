"use client";

import { useEffect, useState } from "react";
import AdminHeader from "../header/page";
import Image from "next/image";


export default function AddRoomForm() {
  const [roomType, setRoomType] = useState("");
  const [information, setInformation] = useState("");
  const [price, setPrice] = useState("");
  const [noOfRooms, setNoOfRooms] = useState("");
  const [image, setImage] = useState("");
  const [message, setMessage] = useState("");
  const [resorts, setResorts] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false); // loader state

  useEffect(() => {
    fetchResorts();
  }, []);

  async function fetchResorts() {
        // setLoading(true);

    try {
      const res = await fetch("/api/admin/resorts");
      const data = await res.json();
      setResorts(data.resorts || []);
    } catch (err) {
      console.error("Failed to fetch resorts", err);
       setResorts([]);
    }
    // finally {
    //   setLoading(false);
    // }
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const resortData = { roomType, information, price, noOfRooms, image };

    const url = editingId
      ? `/api/admin/resorts/${editingId}`
      : "/api/admin/resorts";
    const method = editingId ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(resortData),
    });

    const data = await res.json();

    if (price <= 0 || noOfRooms <= 0) {
      return setMessage("❌Prices cannot be negative.");
    }


    if (res.ok) {
      setMessage(editingId ? "Room updated successfully!" : "Room added successfully!");
      resetForm();
      if (editingId) {
        setResorts(resorts.map((r) => (r._id === editingId ? data.room : r)));
      } else {
        setResorts([data.room, ...resorts]);
      }
    } else {
      setMessage(data.error || "Failed to save room");
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this room?")) return;
    const res = await fetch(`/api/admin/resorts/${id}`, { method: "DELETE" });
    if (res.ok) {
      setMessage("Room deleted successfully!");
      setResorts(resorts.filter((r) => r._id !== id)); // Remove locally
    } else {
      setMessage("Failed to delete room");
    }
  };

  const handleEdit = (room) => {
    setRoomType(room.roomType);
    setInformation(room.information);
    setPrice(room.price);
    setNoOfRooms(room.noOfRooms);
    setImage(room.image);
    setEditingId(room._id);
  };

  const resetForm = () => {
    setRoomType("");
    setInformation("");
    setPrice("");
    setNoOfRooms("");
    setImage("");
    setEditingId(null);
  };

  return (
    <div>
      <AdminHeader />
      <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-6">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md"
        >
          <h2 className="text-2xl font-bold mb-6 text-center text-purple-700">
            🏨 {editingId ? "Edit Room" : "Add New Room"}
          </h2>

          {message && (
            <p className="mb-4 text-center text-green-600 font-semibold">
              {message}
            </p>
          )}

          <input
            type="text"
            value={roomType}
            onChange={(e) => setRoomType(e.target.value)}
            placeholder="Room Type"
            className="w-full border p-2 rounded mb-4"
            required
          />
          <textarea
            value={information}
            onChange={(e) => setInformation(e.target.value)}
            placeholder="Information"
            className="w-full border p-2 rounded mb-4"
            required
          />
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            min="0"
            placeholder="Price"
            className="w-full border p-2 rounded mb-4"
            required
          />
          <input
            type="number"
            value={noOfRooms}
            onChange={(e) => setNoOfRooms(e.target.value)}
            min="0"
            placeholder="Number of Rooms"
            className="w-full border p-2 rounded mb-4"
            required
          />
          {/* <input
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            placeholder="Image URL"
            className="w-full border p-2 rounded mb-6"
            required
          /> */}

          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full border p-2 rounded mb-6"
            required
          />

          <button
            type="submit"
            className="w-full bg-purple-600 text-white p-3 rounded-lg hover:bg-purple-700"
          >
            {editingId ? "✏ Update Room" : "➕ Add Room"}
          </button>
        </form>
      </div>

      {/* Table */}
      <div className="bg-white p-6 rounded-3xl shadow-xl max-w-6xl mx-auto mt-12 overflow-x-auto">
        <h3 className="text-2xl font-bold mb-6 text-purple-700 text-center">🏨 Resort Rooms</h3>

        {resorts === null ? (
          // Loader while fetching data
          <div className="flex justify-center items-center py-12">
            <svg
              className="animate-spin h-10 w-10 text-purple-600"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
              ></path>
            </svg>
          </div>
        ) : (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-purple-100">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold text-purple-800">Image</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-purple-800">Room Type</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-purple-800">Information</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-purple-800">Price</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-purple-800">No. of Rooms</th>
                <th className="px-4 py-3 text-center text-sm font-semibold text-purple-800">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {resorts.length > 0 ? (
                resorts.map((room) =>
                  room ? (
                    <tr key={room._id || Math.random()} className="hover:bg-purple-50 transition duration-200">
                      <td className="px-4 py-3">
                        {room.image ? (
                          <Image
                            src={room.image}
                            alt={room.roomType || "Room"}
                            fill
                            className="w-24 h-16 object-cover rounded-lg"
                          />
                        ) : (
                          <span className="text-gray-400">No Image</span>
                        )}
                      </td>
                      <td className="px-4 py-3">{room.roomType || "-"}</td>
                      <td className="px-4 py-3">{room.information || "-"}</td>
                      <td className="px-4 py-3">₹{room.price || "-"}</td>
                      <td className="px-4 py-3">{room.noOfRooms || "-"}</td>
                      <td className="px-4 py-3 flex gap-2 justify-center">
                        <button
                          onClick={() => handleEdit(room)}
                          className="px-4 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(room._id)}
                          className="px-4 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-200"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ) : null
                )
              ) : (
                <tr>
                  <td colSpan="6" className="px-4 py-6 text-center text-gray-500">
                    No rooms added yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
