// "use client";

// import { useState, useEffect } from "react";

// export default function BookingPage() {
//     const [form, setForm] = useState({
//         name: "",
//         email: "",
//         resort: "",
//         ride: "",
//         package: "",
//         child: 0,
//         teenage: 0,
//         adult: 0,
//         date: "",
//     });

//     const [resorts, setResorts] = useState([]);
//     const [rides, setRides] = useState([]);
//     const [packages, setPackages] = useState([]);
//     const [bookings, setBookings] = useState([]); // 👈 store bookings


//     useEffect(() => {
//         // fetch("/api/resorts").then(res => res.json()).then(setResorts);
//         fetch("/api/resorts")
//             .then(res => res.json())
//             .then(data => setResorts(data.resorts || data));
//         // fetch("/api/rides").then(res => res.json()).then(setRides);
//         fetch("/api/rides")
//             .then(res => res.json())
//             .then(data => setRides(data.rides || data)); // extract rides array
//         // fetch("/api/packages").then(res => res.json()).then(setPackages);
//         fetch("/api/package")
//             .then(res => res.json())
//             .then(data => setPackages(data.packages || data));
//         fetchBookings();

//     }, []);

//     const fetchBookings = async () => {
//         try {
//             const res = await fetch("/api/booking");
//             const data = await res.json();
//             if (Array.isArray(data)) setBookings(data);
//         } catch (err) {
//             console.error("Error fetching bookings:", err);
//             setBookings([]);
//         }
//     };

//     // DELETE Booking
//     const handleDelete = async (id) => {
//         if (!confirm("Are you sure you want to delete this booking?")) return;

//         try {
//             const res = await fetch(`/api/booking?id=${id}`, { method: "DELETE" });
//             const data = await res.json();
//             if (data.success) {
//                 alert("Booking deleted successfully");
//                 fetchBookings(); // refresh table
//             }
//         } catch (err) {
//             console.error(err);
//             alert("Failed to delete booking");
//         }
//     };


//     const handleEdit = (booking) => {
//         setForm({
//             name: booking.name,
//             email: booking.email,
//             resort: booking.resort,
//             ride: booking.ride,
//             package: booking.package,
//             child: booking.child,
//             teenage: booking.teenage,
//             adult: booking.adult,
//             date: booking.date,
//             _id: booking._id, // keep track of id for update
//         });
//     };
//     // Calculate totals
//     const totalChild = form.child * 300;
//     const totalTeenage = form.teenage * 500;
//     const totalAdult = form.adult * 700;
//     const totalPeople = Number(form.child) + Number(form.teenage) + Number(form.adult);
//     const totalAmount = totalChild + totalTeenage + totalAdult;

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setForm({ ...form, [name]: value });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         const bookingData = {
//             ...form,
//             totalChild,
//             totalTeenage,
//             totalAdult,
//             totalPeople,
//             totalAmount,
//         };

//         try {
//             let res, data;
//             if (form._id) {
//                 // Update existing booking
//                 res = await fetch("/api/booking", {
//                     method: "PUT",
//                     headers: { "Content-Type": "application/json" },
//                     body: JSON.stringify(bookingData),
//                 });
//                 data = await res.json();
//                 if (data.success) {
//                     alert("Booking updated successfully!");
//                     setForm({
//                         name: "",
//                         email: "",
//                         resort: "",
//                         ride: "",
//                         package: "",
//                         child: 0,
//                         teenage: 0,
//                         adult: 0,
//                         date: "",
//                     });
//                 }
//             } else {
//                 // New booking
//                 res = await fetch("/api/booking", {
//                     method: "POST",
//                     headers: { "Content-Type": "application/json" },
//                     body: JSON.stringify(bookingData),
//                 });
//                 data = await res.json();
//                 if (data.success) {
//                     alert("Booking successful!");
//                     setForm({
//                         name: "",
//                         email: "",
//                         resort: "",
//                         ride: "",
//                         package: "",
//                         child: 0,
//                         teenage: 0,
//                         adult: 0,
//                         date: "",
//                     });
//                 }
//             }
//             fetchBookings(); // refresh table
//         } catch (err) {
//             console.error(err);
//             alert("Booking failed");
//         }
//     };

//     return (
//         <div>
//             <div className="max-w-2xl mx-auto p-6 bg-white shadow rounded">
//                 <h1 className="text-2xl font-bold mb-4">Booking Page</h1>
//                 <form onSubmit={handleSubmit} className="space-y-4">
//                     <input name="name" value={form.name} onChange={handleChange} placeholder="Name"
//                         className="w-full border p-2 rounded" required />
//                     <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="Email"
//                         className="w-full border p-2 rounded" required />

//                     {/* Resort Dropdown */}
//                     <select name="resort" value={form.resort} onChange={handleChange} className="w-full border p-2 rounded" required>
//                         <option value="">Select Resort</option>
//                         {/* {resorts.map((r) => <option key={r._id} value={r.name}>{r.name}</option>)} */}
//                         {Array.isArray(resorts) && resorts.map((r) => (
//                             <option key={r._id} value={r.roomType}>{r.roomType}</option>
//                         ))}
//                     </select>

//                     {/* Ride Dropdown */}
//                     <select name="ride" value={form.ride} onChange={handleChange} className="w-full border p-2 rounded" required>
//                         <option value="">Select Ride</option>
//                         {Array.isArray(rides) && rides.map((r) => (
//                             <option key={r._id} value={r.rideName}>{r.rideName}</option>
//                         ))}

//                         {/* {rides.map((r) => <option key={r._id} value={r.rideName}>{r.rideName}</option>)} */}
//                     </select>

//                     {/* Package Dropdown */}
//                     <select name="package" value={form.package} onChange={handleChange} className="w-full border p-2 rounded" required>
//                         <option value="">Select Package</option>
//                         {Array.isArray(packages) && packages.map((p) => (
//                             <option key={p._id} value={p.name}>{p.name}</option>
//                         ))}
//                         {/* {packages.map((p) => <option key={p._id} value={p.name}>{p.name}</option>)} */}
//                     </select>

//                     {/* People Counts */}
//                     <label className="block font-bold">Child price 300</label>
//                     <input type="number" name="child" value={form.child} onChange={handleChange} placeholder="Total Child"
//                         className="w-full border p-2 rounded" min="0" />
//                     <label className="block font-bold">Teenage price 500</label>

//                     <input type="number" name="teenage" value={form.teenage} onChange={handleChange} placeholder="Total Teenage"
//                         className="w-full border p-2 rounded" min="0" />
//                     <label className="block font-bold">Teenage price 700</label>

//                     <input type="number" name="adult" value={form.adult} onChange={handleChange} placeholder="Total Adult"
//                         className="w-full border p-2 rounded" min="0" />

//                     <input type="date" name="date" value={form.date} onChange={handleChange}
//                         className="w-full border p-2 rounded" required />

//                     {/* Display Totals */}
//                     <div className="p-3 bg-gray-100 rounded">
//                         <p>Total People: {totalPeople}</p>
//                         <p>Total Amount: ₹{totalAmount}</p>
//                     </div>


//                     <button type="submit" className="w-full bg-purple-600 text-white p-2 rounded">
//                         Book Now
//                     </button>
//                 </form>
//             </div>
//             {/* TABLE */}
//             <div className="bg-white p-6 rounded-2xl shadow-xl w-full mt-8">
//                 <h3 className="text-xl font-bold mb-4 text-purple-700 text-center">📋 All Bookings</h3>
//                 <div className="overflow-x-auto w-full">
//                     <table className="min-w-full border-collapse border border-gray-300">
//                         <thead>
//                             <tr className="bg-purple-100 text-purple-800">
//                                 <th className="border p-2">Name</th>
//                                 <th className="border p-2">Email</th>
//                                 <th className="border p-2">Resort</th>
//                                 <th className="border p-2">Ride</th>
//                                 <th className="border p-2">Package</th>
//                                 <th className="border p-2">Date</th>
//                                 <th className="border p-2">People</th>
//                                 <th className="border p-2">Amount</th>
//                                 <th className="border p-2">Action</th>

//                             </tr>
//                         </thead>
//                         <tbody>
//                             {bookings.length > 0 ? (
//                                 bookings.map((b, i) => (
//                                     <tr
//                                         key={b._id}
//                                         className={`text-center ${i % 2 === 0 ? "bg-gray-50" : "bg-white"} hover:bg-gray-100`}
//                                     >
//                                         <td className="border p-2">{b.name}</td>
//                                         <td className="border p-2">{b.email}</td>
//                                         <td className="border p-2">{b.resort}</td>
//                                         <td className="border p-2">{b.ride}</td>
//                                         <td className="border p-2">{b.package}</td>
//                                         <td className="border p-2">{b.date}</td>
//                                         <td className="border p-2">{b.totalPeople}</td>
//                                         <td className="border p-2 font-semibold text-green-700">₹{b.totalAmount}</td>

//                                         <td className="border p-2 flex justify-center gap-2">
//                                             <button
//                                                 className="bg-yellow-400 text-white px-2 py-1 rounded"
//                                                 onClick={() => handleEdit(b)}
//                                             >
//                                                 Edit
//                                             </button>
//                                             <button
//                                                 className="bg-red-600 text-white px-2 py-1 rounded"
//                                                 onClick={() => handleDelete(b._id)}
//                                             >
//                                                 Delete
//                                             </button>
//                                         </td>
//                                     </tr>
//                                 ))
//                             ) : (
//                                 <tr>
//                                     <td colSpan="8" className="p-4 text-gray-500 text-center">
//                                         No bookings found.
//                                     </td>
//                                 </tr>
//                             )}
//                         </tbody>
//                     </table>
//                 </div>

//             </div>

//         </div>
//     );
// }
"use client";

import { useState, useEffect } from "react";
import Header from "../Header/page";

function BookingPage() {
    const [form, setForm] = useState({
        name: "",
        email: "",
        resort: "",
        ride: "",
        package: "",
        child: 0,
        teenage: 0,
        adult: 0,
        date: "",
    });

    const [resorts, setResorts] = useState([]);
    const [rides, setRides] = useState([]);
    const [packages, setPackages] = useState([]);
    const [bookings, setBookings] = useState([]);
    const [editingId, setEditingId] = useState(null); // Track edit mode

    // Fetch all data
    useEffect(() => {
        fetchResorts();
        fetchRides();
        fetchPackages();
        fetchBookings();

        

    }, []);



    const fetchResorts = async () => {
        try {
            const res = await fetch("/api/resorts");
            const data = await res.json();
            setResorts(data.resorts || data);
        } catch (err) {
            console.error("Error fetching resorts:", err);
        }
    };

    const fetchRides = async () => {
        try {
            const res = await fetch("/api/rides");
            const data = await res.json();
            setRides(data.rides || data);
        } catch (err) {
            console.error("Error fetching rides:", err);
        }
    };

    const fetchPackages = async () => {
        try {
            const res = await fetch("/api/package");
            const data = await res.json();
            setPackages(data.packages || data);
        } catch (err) {
            console.error("Error fetching packages:", err);
        }
    };

    const fetchBookings = async () => {
        try {
            const res = await fetch("/api/booking");
            const data = await res.json();
            if (Array.isArray(data)) setBookings(data);
        } catch (err) {
            console.error("Error fetching bookings:", err);
            setBookings([]);
        }
    };

    

    // Handle form input change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    // Calculate totals
    const totalChild = form.child * 300;
    const totalTeenage = form.teenage * 500;
    const totalAdult = form.adult * 700;
    const totalPeople =
        Number(form.child) + Number(form.teenage) + Number(form.adult);
    const totalAmount = totalChild + totalTeenage + totalAdult;

    // Submit booking
    const handleSubmit = async (e) => {
        e.preventDefault();

        const bookingData = {
            ...form,
            totalChild,
            totalTeenage,
            totalAdult,
            totalPeople,
            totalAmount,
            status: "Pending", // New bookings start as pending

        };

        try {
            let res, data;
            if (editingId) {
                res = await fetch(`/api/booking?id=${editingId}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(bookingData),
                });
                data = await res.json();
                if (data.success) {
                    alert("Booking updated successfully!");

                    // ✅ UPDATED: Update bookings state directly to reflect table immediately
                    setBookings((prev) =>
                        prev.map((b) => (b._id === editingId ? { ...b, ...bookingData } : b))
                    );
                }
            } else {
                res = await fetch("/api/booking", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(bookingData),
                });
                data = await res.json();
                if (data.success) {
                    alert("Booking added successfully!");
                    // ✅ UPDATED: Add new booking directly to table
                    setBookings((prev) => [...prev, { ...bookingData, _id: data.bookingId }]);
                }
            }
            resetForm();
            // fetchBookings();
        } catch (err) {
            console.error(err);
            alert("Booking operation failed");
        }
    };

    // Edit booking
    const handleEdit = (booking) => {
        setForm({
            name: booking.name,
            email: booking.email,
            resort: booking.resort,
            ride: booking.ride,
            package: booking.package,
            child: booking.child,
            teenage: booking.teenage,
            adult: booking.adult,
            date: booking.date,
        });
        setEditingId(booking._id);
    };

    // Delete booking
    const handleDelete = async (id) => {
        if (!confirm("Are you sure you want to delete this booking?")) return;
        try {
            const res = await fetch(`/api/booking?id=${id}`, { method: "DELETE" });
            const data = await res.json();
            if (data.success) {
                alert("Booking deleted successfully!");
                fetchBookings();
            }
        } catch (err) {
            console.error(err);
            alert("Failed to delete booking");
        }
    };

    // Reset form
    const resetForm = () => {
        setForm({
            name: "",
            email: "",
            resort: "",
            ride: "",
            package: "",
            child: 0,
            teenage: 0,
            adult: 0,
            date: "",
        });
        setEditingId(null);
    };


    return (
        <div>
            <Header />
            <div className="max-w-3xl mx-auto p-6">
                <h1 className="text-2xl font-bold mb-4 text-center">Booking Page</h1>

                <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded shadow">
                    <input
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Name"
                        className="w-full border p-2 rounded"
                        required
                    />
                    <input
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="Email"
                        className="w-full border p-2 rounded"
                        required
                    />

                    <select
                        name="resort"
                        value={form.resort}
                        onChange={handleChange}
                        className="w-full border p-2 rounded"
                        required
                    >
                        <option value="">Select Resort</option>
                        {resorts.map((r) => (
                            <option key={r._id} value={r.name || r.roomType}>
                                {r.name || r.roomType}
                            </option>
                        ))}
                    </select>

                    <select
                        name="ride"
                        value={form.ride}
                        onChange={handleChange}
                        className="w-full border p-2 rounded"
                        required
                    >
                        <option value="">Select Ride</option>
                        {rides.map((r) => (
                            <option key={r._id} value={r.rideName}>
                                {r.rideName}
                            </option>
                        ))}
                    </select>

                    <select
                        name="package"
                        value={form.package}
                        onChange={handleChange}
                        className="w-full border p-2 rounded"
                        required
                    >
                        <option value="">Select Package</option>
                        {packages.map((p) => (
                            <option key={p._id} value={p.name}>
                                {p.name}
                            </option>
                        ))}
                    </select>

                    <input
                        type="number"
                        name="child"
                        value={form.child}
                        onChange={handleChange}
                        placeholder="Total Child (₹300 each)"
                        className="w-full border p-2 rounded"
                        min="0"
                    />
                    <input
                        type="number"
                        name="teenage"
                        value={form.teenage}
                        onChange={handleChange}
                        placeholder="Total Teenage (₹500 each)"
                        className="w-full border p-2 rounded"
                        min="0"
                    />
                    <input
                        type="number"
                        name="adult"
                        value={form.adult}
                        onChange={handleChange}
                        placeholder="Total Adult (₹700 each)"
                        className="w-full border p-2 rounded"
                        min="0"
                    />

                    <input
                        type="date"
                        name="date"
                        value={form.date}
                        onChange={handleChange}
                        className="w-full border p-2 rounded"
                        required
                    />

                    <div className="p-3 bg-gray-100 rounded">
                        <p>Total People: {totalPeople}</p>
                        <p>Total Amount: ₹{totalAmount}</p>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-purple-600 text-white p-2 rounded hover:bg-purple-700 transition"
                    >
                        {editingId ? "Update Booking" : "Book Now"}
                    </button>

                    {editingId && (
                        <button
                            type="button"
                            onClick={resetForm}
                            className="w-full mt-2 bg-gray-400 text-white p-2 rounded hover:bg-gray-500 transition"
                        >
                            Cancel Edit
                        </button>
                    )}
                </form>
            </div>
            {/* Bookings Table */}
            <div className="bg-white p-6 rounded shadow mt-8">
                <h3 className="text-xl font-bold mb-4 text-center text-purple-700">📋 All Bookings</h3>
                <div className="overflow-x-auto">
                    <table className="min-w-full border border-gray-300">
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
                                {/* <th className="border p-2">Status</th> */}

                                <th className="border p-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {bookings.length > 0 ? (
                                bookings.map((b, i) => (
                                    <tr key={b._id} className={`text-center ${i % 2 === 0 ? "bg-gray-50" : "bg-white"} hover:bg-gray-100`}>
                                        <td className="border p-2">{b.name}</td>
                                        <td className="border p-2">{b.email}</td>
                                        <td className="border p-2">{b.resort}</td>
                                        <td className="border p-2">{b.ride}</td>
                                        <td className="border p-2">{b.package}</td>
                                        <td className="border p-2">{b.date}</td>
                                        <td className="border p-2">{b.totalPeople}</td>
                                        <td className="border p-2 font-semibold text-green-700">₹{b.totalAmount}</td>
                                        {/* <td className={`border p-2 font-bold ${b.status === "Accepted" ? "text-green-600" : "text-orange-500"}`}>
                                            {b.status || "Pending"}
                                        </td> */}

                                        <td className="border p-2 flex justify-center gap-2">
                                            <button
                                                className="bg-yellow-400 text-white px-2 py-1 rounded"
                                                onClick={() => handleEdit(b)}
                                            >
                                                Edit
                                            </button>
                                            <button
                                                className="bg-red-600 text-white px-2 py-1 rounded"
                                                onClick={() => handleDelete(b._id)}
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="8" className="p-4 text-gray-500 text-center">
                                        No bookings found.
                                    </td>
                                </tr>
                            )}

                        </tbody>
                    </table>
                </div>

            </div>
        </div>
    );
}
export default BookingPage;