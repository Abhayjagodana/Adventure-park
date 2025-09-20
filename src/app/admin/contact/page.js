"use client"
import { useEffect, useState } from "react";
import AdminHeader from "../header/page";

export default function AdminContacts() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchContacts() {
      const res = await fetch("/api/admin/contact");
      const data = await res.json();
      if (data.success) setContacts(data.contacts);
      setLoading(false);
    }
    fetchContacts();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
      <div>
      <AdminHeader />

      <div className="max-w-7xl mx-auto p-6 bg-white shadow-xl rounded-2xl my-32">
        <h1 className="text-2xl font-bold mb-4 text-center text-purple-700">📬 User Messages</h1>

        {loading ? (
          <p className="text-center text-gray-500">Loading messages...</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-purple-100 text-purple-800">
                  <th className="border p-2">Name</th>
                  <th className="border p-2">Email</th>
                  <th className="border p-2">Phone</th>
                  <th className="border p-2">Message</th>
                  <th className="border p-2">Date</th>
                </tr>
              </thead>
              <tbody>
                {contacts.length > 0 ? (
                  contacts.map((c, i) => (
                    <tr
                      key={c._id}
                      className={`text-center ${
                        i % 2 === 0 ? "bg-gray-50" : "bg-white"
                      } hover:bg-gray-100`}
                    >
                      <td className="border p-2">{c.name}</td>
                      <td className="border p-2">{c.email}</td>
                      <td className="border p-2">{c.phone}</td>
                      <td className="border p-2">{c.message}</td>
                      <td className="border p-2">{new Date(c.createdAt).toLocaleString()}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center p-4 text-gray-500">
                      No messages found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
