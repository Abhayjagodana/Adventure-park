// "use client";

// import { useState } from "react";
// import Header from "../Header/page";

// export default function ContactPage() {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [comment, setComment] = useState("");
//   const [message, setMessage] = useState("");
//   const [error, setError] = useState("");

//   const validateForm = () => {
//     if (!name || !email || !comment) {
//       setError("All fields are required.");
//       return false;
//     }
//     if (!/^[A-Za-z\s]+$/.test(name)) {
//       setError("Name can only contain letters and spaces.");
//       return false;
//     }
//     if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
//       setError("Invalid email address.");
//       return false;
//     }
//     if (comment.length < 10) {
//       setError("Comment must be at least 10 characters long.");
//       return false;
//     }
//     return true;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     setMessage("");

//     if (!validateForm()) return;

//     try {
//       const res = await fetch("/api/contact", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ name, email, comment }),
//       });

//       const data = await res.json();

//       if (res.ok) {
//         setMessage(data.message || "Message sent successfully!");
//         setName("");
//         setEmail("");
//         setComment("");
//       } else {
//         setError(data.error || "Failed to send message");
//       }
//     } catch (err) {
//       setError("Network error. Please try again later.");
//     }
//   };

//   return (
//    <div className="min-h-screen flex flex-col">
//   <Header />

//   <div className="flex justify-center items-center flex-1 bg-gray-100">
//     <div className="w-full max-w-lg bg-white p-8 rounded-xl shadow-lg">
//       <h1 className="text-4xl font-bold text-purple-800 text-center mb-4">Contact Us</h1>
//       <hr className="w-1/4 mx-auto mb-6 border-purple-800" />
      
//       <form className="space-y-6" onSubmit={handleSubmit}>
//         <div>
//           <label htmlFor="name" className="block mb-2 font-semibold text-gray-700">Name</label>
//           <input
//             type="text"
//             id="name"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             placeholder="Enter name"
//             className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
//             required
//           />
//         </div>

//         <div>
//           <label htmlFor="email" className="block mb-2 font-semibold text-gray-700">Email</label>
//           <input
//             type="email"
//             id="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             placeholder="Enter email"
//             className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
//             required
//           />
//         </div>

//         <div>
//           <label htmlFor="comment" className="block mb-2 font-semibold text-gray-700">Comment</label>
//           <textarea
//             id="comment"
//             rows="5"
//             value={comment}
//             onChange={(e) => setComment(e.target.value)}
//             placeholder="Enter your message"
//             className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
//             required
//           ></textarea>
//         </div>

//         {message && <p className="text-center text-green-600">{message}</p>}
//         {error && <p className="text-center text-red-600">{error}</p>}

//         <div className="text-center">
//           <button
//             type="submit"
//             className="px-6 py-3 bg-purple-800 text-white rounded-lg hover:bg-purple-900 transition"
//           >
//             Send
//           </button>
//         </div>
//       </form>
//     </div>
//   </div>
// </div>

//   );
// }
// "use client";

// import { useState } from "react";

// export default function ContactPage() {
//   const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
//   const [loading, setLoading] = useState(false);
//   const [response, setResponse] = useState("");

//   const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setResponse("");

//     try {
//       const res = await fetch("/api/contact", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(form),
//       });

//       const data = await res.json();
//       setResponse(data.message);
//       if (data.success) setForm({ name: "", email: "", phone: "", message: "" });
//     } catch (err) {
//       setResponse("Something went wrong");
//     }
//     setLoading(false);
//   };

//   return (
//     <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow rounded">
//       <h1 className="text-2xl font-bold mb-4">Contact Us</h1>
//       <form onSubmit={handleSubmit} className="flex flex-col gap-4">
//         <input
//           type="text"
//           name="name"
//           placeholder="Name"
//           value={form.name}
//           onChange={handleChange}
//           className="border p-2 rounded"
//           required
//         />
//         <input
//           type="email"
//           name="email"
//           placeholder="Email"
//           value={form.email}
//           onChange={handleChange}
//           className="border p-2 rounded"
//           required
//         />
//         <input
//           type="text"
//           name="phone"
//           placeholder="Phone"
//           value={form.phone}
//           onChange={handleChange}
//           className="border p-2 rounded"
//           required
//         />
//         <textarea
//           name="message"
//           placeholder="Message"
//           value={form.message}
//           onChange={handleChange}
//           className="border p-2 rounded"
//           required
//         />
//         <button type="submit" className="bg-blue-600 text-white py-2 rounded" disabled={loading}>
//           {loading ? "Sending..." : "Send Message"}
//         </button>
//       </form>
//       {response && <p className="mt-4 text-center">{response}</p>}
//     </div>
//   );
// }
"use client";

import { useState } from "react";
import Header from "../Header/page";

 function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const validateForm = () => {
    const { name, email, phone, message } = form;
    if (!name || !email || !phone || !message) {
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
    if (message.length < 10) {
      setError("Message must be at least 10 characters long.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setResponse("");

    if (!validateForm()) return;

    setLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (data.success) {
        setResponse(data.message || "Message sent successfully!");
        setForm({ name: "", email: "", phone: "", message: "" });
      } else {
        setError(data.message || "Failed to send message");
      }
    } catch (err) {
      setError("Network error. Please try again later.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <div className="flex justify-center items-center flex-1  bg-white-100 my-12 shadow-2xl	">
        <div className="w-full max-w-lg bg-white p-8 rounded-xl shadow-lg">
          <h1 className="text-4xl font-bold text-purple-800 text-center mb-4">Contact Us</h1>
          <hr className="w-1/4 mx-auto mb-6 border-purple-800" />

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name" className="block mb-2 font-semibold text-gray-700">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Enter name"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="block mb-2 font-semibold text-gray-700">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Enter email"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                required
              />
            </div>

            <div>
              <label htmlFor="phone" className="block mb-2 font-semibold text-gray-700">Phone</label>
              <input
                type="text"
                id="phone"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="Enter phone number"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                required
              />
            </div>

            <div>
              <label htmlFor="message" className="block mb-2 font-semibold text-gray-700">Message</label>
              <textarea
                id="message"
                name="message"
                rows="5"
                value={form.message}
                onChange={handleChange}
                placeholder="Enter your message"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                required
              ></textarea>
            </div>

            {response && <p className="text-center text-green-600">{response}</p>}
            {error && <p className="text-center text-red-600">{error}</p>}

            <div className="text-center">
              <button
                type="submit"
                className="px-6 py-3 bg-purple-800 text-white rounded-lg hover:bg-purple-900 transition"
                disabled={loading}
              >
                {loading ? "Sending..." : "Send"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
export default ContactPage;