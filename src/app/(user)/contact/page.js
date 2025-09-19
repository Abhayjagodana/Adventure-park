"use client";

import { useState } from "react";
import Header from "../Header/page";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [comment, setComment] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const validateForm = () => {
    if (!name || !email || !comment) {
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
    if (comment.length < 10) {
      setError("Comment must be at least 10 characters long.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (!validateForm()) return;

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, comment }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage(data.message || "Message sent successfully!");
        setName("");
        setEmail("");
        setComment("");
      } else {
        setError(data.error || "Failed to send message");
      }
    } catch (err) {
      setError("Network error. Please try again later.");
    }
  };

  return (
   <div className="min-h-screen flex flex-col">
  <Header />

  <div className="flex justify-center items-center flex-1 bg-gray-100">
    <div className="w-full max-w-lg bg-white p-8 rounded-xl shadow-lg">
      <h1 className="text-4xl font-bold text-purple-800 text-center mb-4">Contact Us</h1>
      <hr className="w-1/4 mx-auto mb-6 border-purple-800" />
      
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name" className="block mb-2 font-semibold text-gray-700">Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
            required
          />
        </div>

        <div>
          <label htmlFor="comment" className="block mb-2 font-semibold text-gray-700">Comment</label>
          <textarea
            id="comment"
            rows="5"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Enter your message"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
            required
          ></textarea>
        </div>

        {message && <p className="text-center text-green-600">{message}</p>}
        {error && <p className="text-center text-red-600">{error}</p>}

        <div className="text-center">
          <button
            type="submit"
            className="px-6 py-3 bg-purple-800 text-white rounded-lg hover:bg-purple-900 transition"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  </div>
</div>

  );
}