"use client";

import { useEffect, useState } from "react";
import AdminHeader from "../header/page";
import { Trash, SquarePen } from "lucide-react";
import Image from "next/image";

export default function AddPackageForm() {
  const [name, setName] = useState("");
  const [adultPrice, setAdultPrice] = useState("");
  const [teenagerPrice, setTeenagerPrice] = useState("");
  const [kidsPrice, setKidsPrice] = useState("");
  const [information, setInformation] = useState("");
  const [image, setImage] = useState("");
  const [message, setMessage] = useState("");
  const [packages, setPackages] = useState(null);
  const [editingId, setEditingId] = useState(null); // track edit mode

  // Fetch packages from backend
  const fetchPackages = async () => {
    try {
      const res = await fetch("/api/admin/packages");
      const data = await res.json();
      setPackages(data.packages || []);
    } catch (err) {
      console.error("Failed to fetch packages", err);
      setPackages([]);
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

    if (!name.trim()) {
      return setMessage("❌ Package name is required.");
    }
    if (!/^[A-Za-z\s]+$/.test(name.trim())) {
      return setMessage("❌ Package name must contain only letters.");
    }

    // ✅ Price validation (must be positive numbers)
    if (!adultPrice || !teenagerPrice || !kidsPrice) {
      return setMessage("❌ All price fields are required.");
    }
    if (isNaN(adultPrice) || isNaN(teenagerPrice) || isNaN(kidsPrice)) {
      return setMessage("❌ Prices must be valid numbers.");
    }
    if (adultPrice <= 0 || teenagerPrice <= 0 || kidsPrice <= 0) {
      return setMessage("❌Prices cannot be negative.");
    }

    // ✅ Information validation
    if (!information.trim()) {
      return setMessage("❌ Information is required.");
    }
    // if (information.trim().split(/\s+/).length < 5) {
    //   return setMessage("❌ Information must contain at least 5 words.");
    // }

    // ✅ Image validation (only required on Add)
    if (!editingId && !image) {
      return setMessage("❌ Please upload an image.");
    }
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
    if (!confirm('Are you sure you want to delete this package?')) return;

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
              className={`mb-4 text-center font-semibold ${message.includes("✅") ? "text-green-600" : "text-red-600"
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
              min="0"
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block font-medium">Teenager Price</label>
            <input
              type="number"
              value={teenagerPrice}
              min="0"
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
              min="0"
              onChange={(e) => setKidsPrice(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block font-medium">Information</label>
            <textarea
              value={information}
              min="0"
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
              <div className="relative w-32 h-20 mt-2 rounded overflow-hidden">
                <Image
                  src={image}
                  alt="Preview"
                  height={100}
                  width={100}      // ✅ makes the image responsive inside parent div
                  className="object-cover rounded"
                />
              </div>
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

        {packages === null ? (
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
                    <td className="p-2 border text-sm text-gray-600">{pkg.information}</td>
                    <td className="p-2 border">
                      {pkg.image ? (
                        <Image
                          src={pkg.image}
                          alt={pkg.name}
                          height={100}
                          width={100}
                          className="object-cover rounded"
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
        )}
      </div>
    </div>
  );
}
