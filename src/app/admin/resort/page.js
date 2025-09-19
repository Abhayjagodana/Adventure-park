"use client";

import { useEffect, useState } from "react";
import AdminHeader from "../header/page";

export default function AddRoomForm() {
  const [roomType, setRoomType] = useState("");
  const [information, setInformation] = useState("");
  const [price, setPrice] = useState("");
  const [noOfRooms, setNoOfRooms] = useState("");
  const [image, setImage] = useState("");
  const [message, setMessage] = useState("");
  const [resorts, setResorts] = useState([]);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchResorts();
  }, []);

  async function fetchResorts() {
    try {
      const res = await fetch("/api/admin/resorts");
      const data = await res.json();
      setResorts(data.resorts || []);
    } catch (err) {
      console.error("Failed to fetch resorts", err);
    }
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

    if (res.ok) {
      setMessage(editingId ? "Room updated successfully!" : "Room added successfully!");
      resetForm();
      fetchResorts();
    } else {
      setMessage(data.error || "Failed to save room");
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this room?")) return;
    const res = await fetch(`/api/admin/resorts/${id}`, { method: "DELETE" });
    if (res.ok) {
      setMessage("Room deleted successfully!");
      fetchResorts();
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
            placeholder="Price"
            className="w-full border p-2 rounded mb-4"
            required
          />
          <input
            type="number"
            value={noOfRooms}
            onChange={(e) => setNoOfRooms(e.target.value)}
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

      <div className="bg-white p-6 rounded-2xl shadow-xl max-w-5xl mx-auto mt-8">
        <h3 className="text-xl font-bold mb-4 text-purple-700 text-center">🏨 Resort Rooms</h3>
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-purple-100 text-purple-800">
              <th className="border p-2">Image</th>
              <th className="border p-2">Room Type</th>
              <th className="border p-2">Information</th>
              <th className="border p-2">Price</th>
              <th className="border p-2">No. of Rooms</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {resorts.length > 0 ? (
              resorts.map((room) => (
                <tr key={room._id} className="text-center">
                  <td className="border p-2">
                    <img src={room.image} alt={room.roomType} className="w-20 h-16 object-cover" />
                  </td>
                  <td className="border p-2">{room.roomType}</td>
                  <td className="border p-2">{room.information}</td>
                  <td className="border p-2">₹{room.price}</td>
                  <td className="border p-2">{room.noOfRooms}</td>
                  <td className="p-2 border flex gap-2 justify-center">
                    <button
                      onClick={() => handleEdit(room)}
                      className="px-3 py-1 bg-blue-500 text-white rounded"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(room._id)}
                      className="px-3 py-1 bg-red-500 text-white rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="p-4 text-gray-500">
                  No rooms added yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
