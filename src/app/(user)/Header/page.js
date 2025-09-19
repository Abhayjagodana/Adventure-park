// // // app/user/page.js

// // import Link from "next/link";

// // export default function UserHeader() {
// //     return (
// //         <header className="flex justify-between items-center p-4 bg-gray-100 shadow-md">
// //             {/* Left side */}
// //             <div className="text-2xl font-bold text-purple-700">
// //                 Adventure
// //             </div>

// //             {/* Right side */}
// //             <div className="hidden sm:block">
// //                 <Link href="/login">
// //                     <button className="px-4 py-2 bg-purple-700 text-white rounded hover:bg-purple-800 transition">
// //                         Login
// //                     </button>
// //                 </Link>
// //             </div>


// //         </header>

// //     );
// // }

// "use client";

// import { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import Link from "next/link";

// export default function Header() {
//     const [email, setEmail] = useState(null);
//     const [loading, setLoading] = useState(false);
//     const router = useRouter();

//     // Fetch user info when the component mounts
//     useEffect(() => {
//         async function fetchUser() {
//             try {
//                 const res = await fetch("/api/me", {
//                     credentials: "include",
//                 });
//                 if (res.ok) {
//                     const data = await res.json();
//                     setEmail(data.email);
//                 } else {
//                     setEmail(null);
//                 }
//             } catch (error) {
//                 console.error("Error fetching user:", error);
//                 setEmail(null);
//             }
//         }
//         fetchUser();
//     }, []);

//     // Logout handler
//     const handleLogout = async () => {
//         setLoading(true);
//         try {
//             const res = await fetch("/api/logout", {
//                 method: "POST",
//                 credentials: "include",
//             });

//             if (res.ok) {
//                 setEmail(null);
//                 router.push("/login");
//             } else {
//                 console.error("Logout failed");
//             }
//         } catch (error) {
//             console.error("Logout error:", error);
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <header className="flex justify-between items-center p-4 bg-gray-100 shadow-md">
//             <div className="text-2xl font-bold text-purple-700">
//                 <Link href="/">
//                 Sneaker Land
//                 </Link>
//             </div>

//             {email ? (
//                 <div className="flex items-center gap-4">
//                     <span className="text-black font-bold">{email}</span>
//                     <button
//                         onClick={handleLogout}
//                         disabled={loading}
//                         className={`text-white px-3 py-1 rounded ${loading
//                                 ? "bg-gray-400 cursor-not-allowed"
//                                 : "bg-red-600 hover:bg-red-700"
//                             }`}
//                     >
//                         {loading ? "Logging out..." : "Logout"}
//                     </button>
//                 </div>
//             ) : (
//                 <Link
//                     href="/login"
//                     className="text-white bg-blue-600 px-3 py-1 rounded hover:bg-blue-700"
//                 >
//                     Login
//                 </Link>
//             )}
//         </header>
//     );
// }
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

// Custom font from Tailwind config (e.g., Poppins/Inter/Roboto)
export default function Header() {
  const [email, setEmail] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Fetch user info
  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await fetch("/api/me", { credentials: "include" });
        if (res.ok) {
          const data = await res.json();
          setEmail(data.email);
        } else {
          setEmail(null);
        }
      } catch (error) {
        console.error("Error fetching user:", error);
        setEmail(null);
      }
    }
    fetchUser();
  }, []);

  // Logout handler
  const handleLogout = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/logout", {
        method: "POST",
        credentials: "include",
      });

      if (res.ok) {
        setEmail(null);
        router.push("/login");
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <header className="flex flex-wrap justify-between items-center px-8 py-4 bg-gray-50 shadow-md font-sans">
      {/* Brand */}
      <div className="text-3xl font-extrabold text-purple-700 tracking-wide">
        <Link href="/">Sneaker Land</Link>
      </div>

      {/* Navigation */}
      <nav className="hidden md:flex gap-8 text-lg font-medium text-gray-700">
        <Link href="/rides" className="hover:text-purple-700 transition">
          Rider
        </Link>
        <Link href="/resorts" className="hover:text-purple-700 transition">
          Resort
        </Link>
        <Link href="/about" className="hover:text-purple-700 transition">
          About
        </Link>
        <Link href="/contact" className="hover:text-purple-700 transition">
          Contact
        </Link>
        <Link href="/package" className="hover:text-purple-700 transition">
          Package
        </Link>
        <Link href="/booking" className="hover:text-purple-700 transition">
          Booking
        </Link>
        <Link href="/admin/login" className="hover:text-purple-700 transition">
         Admin
        </Link>
      </nav>

      {/* Auth Buttons */}
      <div className="flex items-center gap-4 mt-3 md:mt-0 text-sm">
        {email ? (
          <>
            <span className="text-gray-800 font-semibold">{email}</span>
            <button
              onClick={handleLogout}
              disabled={loading}
              className={`px-4 py-2 rounded-md text-sm font-semibold transition ${
                loading
                  ? "bg-gray-400 cursor-not-allowed text-white"
                  : "bg-red-600 hover:bg-red-700 text-white"
              }`}
            >
              {loading ? "Logging out..." : "Logout"}
            </button>
          </>
        ) : (
          <Link
            href="/login"
            className="px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold transition"
          >
            Login
          </Link>
        )}
      </div>
    </header>
  );
}
