"use client";

import { useEffect, useState } from "react";

import AdminHeader from "../header/page";
import Loader from "../loader";

export default function UserListPage() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const fetchUsers = async () => {
        try {
            const res = await fetch("/api/admin/user/list");
            const data = await res.json();

            if (res.ok) {
                setUsers(data);
            } else {
                setError(data.error || "Failed to fetch users");
            }
        } catch (err) {
            setError("Network error");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    if (loading) {
        return <div className="text-center mt-10"><Loader/></div>;
    }

    if (error) {
        return <div className="text-center mt-10 text-red-600">{error}</div>;
    }

    const handleDelete = async (id) => {
        if (!confirm("Are you sure you want to delete this user?")) return;

        try {
            const res = await fetch(`/api/admin/user/${id}`, {
                method: "DELETE",
            });

            const data = await res.json();

            if (res.ok) {
                // Remove user from state to update UI
                setUsers(users.filter(user => user._id !== id));
            } else {
                alert(data.error || "Failed to delete user");
            }
        } catch (err) {
            alert("Network error");
        }
    };

    return (
       <div>
  <AdminHeader />
  <div className="min-h-screen bg-gray-100 p-4 sm:p-6 md:p-8 flex justify-center">
    <div className="w-full max-w-6xl bg-white rounded-2xl shadow-lg p-6 md:p-8 my-24">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-center text-purple-800 mb-10">
        User List
      </h2>

      {users.length > 0 ? (
        <div className="flex flex-col gap-6">
          {/* Desktop Table */}
          <div className="hidden md:block">
            <table className="min-w-full border border-gray-300 text-sm md:text-base">
              <thead className="bg-purple-100 text-purple-800">
                <tr>
                  <th className="border px-6 py-3 text-left">Name</th>
                  <th className="border px-6 py-3 text-left">Email</th>
                  <th className="border px-6 py-3 text-left">Contact</th>
                  <th className="border px-6 py-3 text-left">Profile</th>
                  <th className="border px-6 py-3 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr
                    key={user._id}
                    className="hover:bg-purple-50 transition-colors duration-200"
                  >
                    <td className="border px-6 py-3">{user.name}</td>
                    <td className="border px-6 py-3">{user.email}</td>
                    <td className="border px-6 py-3">{user.contact}</td>
                    <td className="border px-6 py-3">
                      {user.profile_picture ? (
                        <img
                          src={`/uploads/${user.profile_picture}`}
                          alt={user.name}
                          className="h-12 w-12 rounded-full object-cover border border-gray-300"
                        />
                      ) : (
                        <span className="text-gray-400">N/A</span>
                      )}
                    </td>
                    <td className="border px-6 py-3">
                      <button
                        onClick={() => handleDelete(user._id)}
                        className="bg-red-500 text-white px-5 py-2 rounded-lg hover:bg-red-600 transition"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden flex flex-col gap-5">
            {users.map((user) => (
              <div
                key={user._id}
                className="bg-white rounded-2xl shadow-md p-5 flex flex-col gap-4 border border-gray-200 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between">
                    <span className="font-semibold text-purple-700">Name:</span>
                    <span className="text-gray-800">{user.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold text-purple-700">Email:</span>
                    <span className="text-gray-800 break-all">{user.email}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold text-purple-700">Contact:</span>
                    <span className="text-gray-800">{user.contact}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-purple-700">Profile:</span>
                    {user.profile_picture ? (
                      <img
                        src={`/uploads/${user.profile_picture}`}
                        alt={user.name}
                        className="h-14 w-14 rounded-full object-cover border border-gray-300"
                      />
                    ) : (
                      <span className="text-gray-400">N/A</span>
                    )}
                  </div>
                </div>

                <button
                  onClick={() => handleDelete(user._id)}
                  className="bg-red-500 text-white px-5 py-2 rounded-lg hover:bg-red-600 mt-3 transition-all duration-300"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p className="text-center mt-6 text-gray-600">No users found.</p>
      )}
    </div>
  </div>
</div>



    );
}