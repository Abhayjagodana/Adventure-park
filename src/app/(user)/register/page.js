// // app/user/register/page.js
// "use client";

// import Link from "next/link";
// import { useState } from "react";

// export default function UserRegisterPage() {
//     const [name, setname] = useState("");
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//     const [phone, setPhone] = useState("");         
//     const [error, setError] = useState("");
//     const [success, setSuccess] = useState("");

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setError("");
//         setSuccess("");

//         if (!name || !email || !password || !phone) {
//             setError("Please fill in all fields.");
//             return;
//         }

//         try {
//             // Replace with your API endpoint
//             const res = await fetch("/api/register", {
//                 method: "POST",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify({ name, email, password, phone }),
//             });

//             const data = await res.json();

//             if (res.ok) {
//                 setSuccess("Registration successful!");
//                 setname("");
//                 setEmail("");
//                 setPassword("");
//                 setPhone("");
//             } else {
//                 setError(data.error || "Registration failed");
//             }
//         } catch (err) {
//             setError("Something went wrong.");
//         }
//     };

//     return (
//         <div className="flex justify-center items-center min-h-screen bg-gray-100">
//             <form
//                 onSubmit={handleSubmit}
//                 className="bg-white p-8 rounded shadow-md w-full max-w-md"
//             >
//                 <h2 className="text-2xl font-bold mb-6 text-center text-purple-700">
//                     User Register
//                 </h2>

//                 {error && <p className="text-red-500 mb-4">{error}</p>}
//                 {success && <p className="text-green-500 mb-4">{success}</p>}

//                 <div className="mb-4">
//                     <label className="block mb-2 font-medium">Username</label>
//                     <input
//                         type="text"
//                         className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-700"
//                         value={name}
//                         onChange={(e) => setname(e.target.value)}
//                         placeholder="Enter your name"
//                         required
//                     />
//                 </div>

//                 <div className="mb-4">
//                     <label className="block mb-2 font-medium">Email</label>
//                     <input
//                         type="email"
//                         className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-700"
//                         value={email}
//                         onChange={(e) => setEmail(e.target.value)}
//                         placeholder="Enter your email"
//                         required
//                     />
//                 </div>

//                 <div className="mb-4">
//                     <label className="block mb-2 font-medium">Password</label>
//                     <input
//                         type="password"
//                         className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-700"
//                         value={password}
//                         onChange={(e) => setPassword(e.target.value)}
//                         placeholder="Enter your password"
//                         required
//                     />
//                 </div>

//                 <div className="mb-6">
//                     <label className="block mb-2 font-medium">Phone Number</label>
//                     <input
//                         type="tel"
//                         className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-700"
//                         value={phone}
//                         onChange={(e) => setPhone(e.target.value)}
//                         placeholder="Enter your phone number"
//                         required
//                     />
//                 </div>

//                 <button
//                     type="submit"
//                     className="w-full bg-purple-700 text-white py-2 rounded hover:bg-purple-800 transition"
//                 >
//                     Register
//                 </button>

//                 {/* Link to login */}
//                 <p className="mt-4 text-center text-sm text-gray-600">
//                     Already registered?{" "}
//                     <Link href="/login" className="text-purple-700 hover:underline">
//                         Login here
//                     </Link>
//                 </p>
//             </form>
//         </div>
//     );
// }

"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation"; // Import useRouter

 function UserRegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
const router = useRouter();

const validateForm = () => {
    if (!name || !email || !password || !phone) {
      setError("All fields are required.");
      return false;
    }
    if (!/^[A-Za-z\s]+$/.test(name)) {
      setError("Name can only contain letters and spaces.");
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Invalid email address.");
      return false;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return false;
    }
    if (!/^\d{10}$/.test(phone)) {
      setError("Contact must be a 10-digit number.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!validateForm()) return;
    if (!name || !email || !password || !phone) {
      setError("All fields are required.");
      return;
    }

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, phone }),
      });

      const data = await res.json();

      if (res.ok) {
        setSuccess("Registration successful!");
        setName("");
        setEmail("");
        setPassword("");
        setPhone("");
         router.push("/login");
      } else {
        setError(data.error || "Registration failed");
      }
    } catch (err) {
      setError("Something went wrong.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-purple-700">
          User Registration
        </h2>

        {error && <p className="text-red-500 mb-4">{error}</p>}
        {success && <p className="text-green-500 mb-4">{success}</p>}

        <div className="mb-4">
          <label className="block mb-2 font-medium">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-700"
            placeholder="Enter your name"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2 font-medium">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-700"
            placeholder="Enter your email"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2 font-medium">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-700"
            placeholder="Enter your password"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block mb-2 font-medium">Phone</label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-700"
            placeholder="Enter your phone number"
            required
          />
        </div>

       
        <button
          type="submit"
          className="w-full bg-purple-700 text-white py-2 rounded hover:bg-purple-800 transition"
        >
          Register
        </button>
        

        <p className="mt-4 text-center text-sm text-gray-600">
          Already registered?{" "}
          <Link href="/login" className="text-purple-700 hover:underline">
            Login here
          </Link>
        </p>
      </form>
    </div>
  );
}
export default UserRegisterPage;
