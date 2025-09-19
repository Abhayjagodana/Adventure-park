// "use client";

// import { useEffect, useState } from "react";
// import { useParams } from "next/navigation";

// export default function BookingPage() {
//   const { type, id } = useParams(); // type = "rides" | "resorts" | "packages"
//   const [item, setItem] = useState(null);
//   const [formData, setFormData] = useState({
//     customerName: "",
//     email: "",
//     phone: "",
//     date: "",
//     adults: 0,
//     teenagers: 0,
//     kids: 0,
//     totalPeople: 0,
//     totalAmount: 0,
//   });

//   // Fetch item (ride/resort/package)
//   useEffect(() => {
//     async function fetchItem() {
//       try {
//         const res = await fetch(`/api/${type}/${id}`);
//         const data = await res.json();
//         setItem(data); // backend should return a single ride/resort/package
//       } catch (err) {
//         console.error("Failed to fetch item", err);
//       }
//     }
//     if (id && type) fetchItem();
//   }, [id, type]);

//   // Update totals whenever counts change
//   useEffect(() => {
//     if (!item) return;

//     const totalPeople =
//       Number(formData.adults) +
//       Number(formData.teenagers) +
//       Number(formData.kids);

//     const totalAmount =
//       Number(formData.adults) * (item.adultPrice || 0) +
//       Number(formData.teenagers) * (item.teenagerPrice || 0) +
//       Number(formData.kids) * (item.kidsPrice || 0);

//     setFormData((prev) => ({
//       ...prev,
//       totalPeople,
//       totalAmount,
//     }));
//   }, [formData.adults, formData.teenagers, formData.kids, item]);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await fetch("/api/bookings", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ ...formData, itemId: id, itemType: type }),
//       });
//       const data = await res.json();
//       alert(data.message || "Booking successful!");
//     } catch (error) {
//       alert("Failed to book");
//     }
//   };

//   if (!item) {
//     return (
//       <div>
//         <p className="text-center mt-10">Loading...</p>
//       </div>
//     );
//   }

//   return (
//     <div>
//       <div className="max-w-2xl mx-auto bg-white p-6 shadow-lg rounded-xl mt-10">
//         <h1 className="text-2xl font-bold text-purple-700 mb-4">
//           Booking for {item.rideName || item.roomType || item.name}
//         </h1>

//         <form onSubmit={handleSubmit} className="space-y-4">
//           {/* Customer Info */}
//           <input
//             type="text"
//             name="customerName"
//             value={formData.customerName}
//             onChange={handleChange}
//             placeholder="Your Name"
//             className="w-full border p-2 rounded"
//             required
//           />
//           <input
//             type="email"
//             name="email"
//             value={formData.email}
//             onChange={handleChange}
//             placeholder="Your Email"
//             className="w-full border p-2 rounded"
//             required
//           />
//           <input
//             type="tel"
//             name="phone"
//             value={formData.phone}
//             onChange={handleChange}
//             placeholder="Phone Number"
//             className="w-full border p-2 rounded"
//             required
//           />
//           <input
//             type="date"
//             name="date"
//             value={formData.date}
//             onChange={handleChange}
//             className="w-full border p-2 rounded"
//             required
//           />

//           {/* Booking Counts */}
//           <div className="grid grid-cols-3 gap-4">
//             <div>
//               <label className="block text-sm text-gray-600">Adults</label>
//               <input
//                 type="number"
//                 name="adults"
//                 value={formData.adults}
//                 onChange={handleChange}
//                 min="0"
//                 className="w-full border p-2 rounded"
//               />
//             </div>
//             <div>
//               <label className="block text-sm text-gray-600">Teenagers</label>
//               <input
//                 type="number"
//                 name="teenagers"
//                 value={formData.teenagers}
//                 onChange={handleChange}
//                 min="0"
//                 className="w-full border p-2 rounded"
//               />
//             </div>
//             <div>
//               <label className="block text-sm text-gray-600">Kids</label>
//               <input
//                 type="number"
//                 name="kids"
//                 value={formData.kids}
//                 onChange={handleChange}
//                 min="0"
//                 className="w-full border p-2 rounded"
//               />
//             </div>
//           </div>

//           {/* Totals (Read-only) */}
//           <div className="grid grid-cols-2 gap-4 mt-4">
//             <div>
//               <label className="block text-sm text-gray-600">Total People</label>
//               <input
//                 type="number"
//                 name="totalPeople"
//                 value={formData.totalPeople}
//                 readOnly
//                 className="w-full border p-2 rounded bg-gray-100"
//               />
//             </div>
//             <div>
//               <label className="block text-sm text-gray-600">Total Amount</label>
//               <input
//                 type="number"
//                 name="totalAmount"
//                 value={formData.totalAmount}
//                 readOnly
//                 className="w-full border p-2 rounded bg-gray-100"
//               />
//             </div>
//           </div>

//           {/* Submit */}
//           <button
//             type="submit"
//             className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700"
//           >
//             Confirm Booking
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }
"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function BookingPage() {
  const { type, id } = useParams(); // type = "rides" | "resorts" | "packages"
  const [item, setItem] = useState(null);
  const [formData, setFormData] = useState({
    customerName: "",
    email: "",
    phone: "",
    date: "",
    adults: 0,
    teenagers: 0,
    kids: 0,
    totalPeople: 0,
    totalAmount: 0,
  });

  // Fetch item (ride/resort/package)
  useEffect(() => {
    async function fetchItem() {
      try {
        const res = await fetch(`/api/${type}/${id}`);
        const data = await res.json();
        setItem(data); // backend should return a single ride/resort/package
      } catch (err) {
        console.error("Failed to fetch item", err);
      }
    }
    if (id && type) fetchItem();
  }, [id, type]);

  // Update totals whenever counts change
  useEffect(() => {
    if (!item) return;

    const totalPeople =
      Number(formData.adults) +
      Number(formData.teenagers) +
      Number(formData.kids);

    const totalAmount =
      Number(formData.adults) * (item.adultPrice || 0) +
      Number(formData.teenagers) * (item.teenagerPrice || 0) +
      Number(formData.kids) * (item.kidsPrice || 0);

    setFormData((prev) => ({
      ...prev,
      totalPeople,
      totalAmount,
    }));
  }, [formData.adults, formData.teenagers, formData.kids, item]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, itemId: id, itemType: type }),
      });
      const data = await res.json();
      alert(data.message || "Booking successful!");
    } catch (error) {
      alert("Failed to book");
    }
  };

  if (!item) {
    return (
      <div>
        <p className="text-center mt-10">Loading...</p>
      </div>
    );
  }

  return (
    <div>
      <div className="max-w-2xl mx-auto bg-white p-6 shadow-lg rounded-xl mt-10">
        <h1 className="text-2xl font-bold text-purple-700 mb-4">
          Booking for {item.rideName || item.roomType || item.name}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Customer Info */}
          <input
            type="text"
            name="customerName"
            value={formData.customerName}
            onChange={handleChange}
            placeholder="Your Name"
            className="w-full border p-2 rounded"
            required
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Your Email"
            className="w-full border p-2 rounded"
            required
          />
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Phone Number"
            className="w-full border p-2 rounded"
            required
          />
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />

          {/* Booking Counts with Prices */}
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm text-gray-600">
                Adults (₹{item.adultPrice || 0})
              </label>
              <input
                type="number"
                name="adults"
                value={formData.adults}
                onChange={handleChange}
                min="0"
                className="w-full border p-2 rounded"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600">
                Teenagers (₹{item.teenagerPrice || 0})
              </label>
              <input
                type="number"
                name="teenagers"
                value={formData.teenagers}
                onChange={handleChange}
                min="0"
                className="w-full border p-2 rounded"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600">
                Kids (₹{item.kidsPrice || 0})
              </label>
              <input
                type="number"
                name="kids"
                value={formData.kids}
                onChange={handleChange}
                min="0"
                className="w-full border p-2 rounded"
              />
            </div>
          </div>

          {/* Totals (Read-only) */}
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div>
              <label className="block text-sm text-gray-600">Total People</label>
              <input
                type="number"
                name="totalPeople"
                value={formData.totalPeople}
                readOnly
                className="w-full border p-2 rounded bg-gray-100"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600">Total Amount</label>
              <input
                type="number"
                name="totalAmount"
                value={formData.totalAmount}
                readOnly
                className="w-full border p-2 rounded bg-gray-100"
              />
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700"
          >
            Confirm Booking
          </button>
        </form>
      </div>
    </div>
  );
}
