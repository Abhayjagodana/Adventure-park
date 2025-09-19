"use client";

import { useEffect, useState } from "react";
import AdminHeader from "../header/page";
import { Trash, SquarePen } from "lucide-react";

export default function AddPackageForm() {
  const [name, setName] = useState("");
  const [adultPrice, setAdultPrice] = useState("");
  const [teenagerPrice, setTeenagerPrice] = useState("");
  const [kidsPrice, setKidsPrice] = useState("");
  const [information, setInformation] = useState("");
  const [image, setImage] = useState("");
  const [message, setMessage] = useState("");
  const [packages, setPackages] = useState([]);
  const [editingId, setEditingId] = useState(null); // track edit mode

  // Fetch packages from backend
  const fetchPackages = async () => {
    try {
      const res = await fetch("/api/admin/packages");
      const data = await res.json();
      setPackages(data.packages || []);
    } catch (err) {
      console.error("Failed to fetch packages", err);
    }
  };

  useEffect(() => {
    fetchPackages();
  }, []);

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

  // Submit form (Add or Update)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const url = editingId
        ? `/api/admin/packages/${editingId}`
        : "/api/admin/packages";

      const res = await fetch(url, {
        method: editingId ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          adultPrice,
          teenagerPrice,
          kidsPrice,
          information,
          image,
        }),
      });

      const data = await res.json();
      if (!res.ok) return setMessage(data.error || "❌ Failed");

      setMessage(editingId ? "✅ Package updated!" : "✅ Package added!");
      
      // reset form
      setName("");
      setAdultPrice("");
      setTeenagerPrice("");
      setKidsPrice("");
      setInformation("");
      setImage("");
      setEditingId(null);

      fetchPackages();
    } catch (error) {
      setMessage("❌ Something went wrong");
    }
  };

  // Fill form for editing
  const handleEdit = (pkg) => {
    setEditingId(pkg._id);
    setName(pkg.name);
    setAdultPrice(pkg.adultPrice);
    setTeenagerPrice(pkg.teenagerPrice);
    setKidsPrice(pkg.kidsPrice);
    setInformation(pkg.information);
    setImage(pkg.image || "");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Delete package
  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this package?")) return;

    try {
      const res = await fetch(`/api/admin/packages/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (!res.ok) return alert(data.error || "Failed to delete");
      alert("✅ Deleted successfully");
      fetchPackages();
    } catch (error) {
      alert("❌ Something went wrong");
    }
  };

  return (
    <div>
      <AdminHeader />
      <div className="flex justify-center items-center min-h-screen bg-gray-100 my-20">
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-lg rounded-lg p-8 w-full max-w-lg"
        >
          <h2 className="text-2xl font-bold text-center mb-6 text-purple-800">
            {editingId ? "Edit Package" : "Add New Package"}
          </h2>

          {message && (
            <p
              className={`mb-4 text-center font-semibold ${
                message.includes("✅") ? "text-green-600" : "text-red-600"
              }`}
            >
              {message}
            </p>
          )}

          <div className="mb-4">
            <label className="block font-medium">Package Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block font-medium">Adult Price</label>
            <input
              type="number"
              value={adultPrice}
              onChange={(e) => setAdultPrice(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block font-medium">Teenager Price</label>
            <input
              type="number"
              value={teenagerPrice}
              onChange={(e) => setTeenagerPrice(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block font-medium">Kids Price</label>
            <input
              type="number"
              value={kidsPrice}
              onChange={(e) => setKidsPrice(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block font-medium">Information</label>
            <textarea
              value={information}
              onChange={(e) => setInformation(e.target.value)}
              className="w-full p-2 border rounded"
              rows="3"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block font-medium">Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full border p-2 rounded mb-6"
              required={!editingId} // image required only when adding
            />
            {image && (
              <img
                src={image}
                alt="Preview"
                className="w-32 h-20 object-cover rounded mt-2"
              />
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-purple-800 text-white p-2 rounded hover:bg-purple-900 transition"
          >
            {editingId ? "Update Package" : "Add Package"}
          </button>
        </form>
      </div>

      {/* Packages Table */}
      <div className="bg-white p-6 rounded-2xl shadow-lg overflow-x-auto mx-6 my-10">
        <h3 className="text-xl font-bold mb-4 text-purple-700 text-center">
          📦 All Packages
        </h3>
        <table className="w-full border border-gray-200 rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-purple-50 text-purple-800">
              <th className="p-2 border">#</th>
              <th className="p-2 border">Package Name</th>
              <th className="p-2 border">Adult Price</th>
              <th className="p-2 border">Teenager Price</th>
              <th className="p-2 border">Kids Price</th>
              <th className="p-2 border">Information</th>
              <th className="p-2 border">Image</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {packages.length > 0 ? (
              packages.map((pkg, index) => (
                <tr key={pkg._id} className="hover:bg-gray-50 transition-colors">
                  <td className="p-2 border text-center">{index + 1}</td>
                  <td className="p-2 border">{pkg.name}</td>
                  <td className="p-2 border">₹{pkg.adultPrice}</td>
                  <td className="p-2 border">₹{pkg.teenagerPrice}</td>
                  <td className="p-2 border">₹{pkg.kidsPrice}</td>
                  <td className="p-2 border text-sm text-gray-600">
                    {pkg.information}
                  </td>
                  <td className="p-2 border">
                    {pkg.image ? (
                      <img
                        src={pkg.image}
                        alt={pkg.name}
                        className="w-24 h-16 object-cover rounded"
                      />
                    ) : (
                      <span className="text-gray-400">No Image</span>
                    )}
                  </td>
                  <td className="p-2 border flex gap-2 justify-center">
                    <button
                      onClick={() => handleEdit(pkg)}
                      className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 flex items-center gap-1"
                    >
                      <SquarePen size={16} /> Edit
                    </button>
                    <button
                      onClick={() => handleDelete(pkg._id)}
                      className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 flex items-center gap-1"
                    >
                      <Trash size={16} /> Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={8} className="text-center py-4 text-gray-500">
                  No packages available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
