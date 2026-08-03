"use client";
import { useEffect, useState } from "react";
import { getUsers } from "@/app/services/api";
import axios from "axios";

export default function UsersPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const fetchUsers = async () => {
    try {
      const data = await getUsers();
      setUsers(data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch users. Please check if your Spring Boot backend is running!");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await axios.post("http://localhost:8080/api/users", {
        username,
        email,
        password,
        role,
      });
      setUsername("");
      setEmail("");
      setPassword("");
      setRole("");
      fetchUsers();
    } catch (err) {
      console.error(err);
      alert("Failed to save user!");
    } finally {
      setSubmitting(false);
    }
  };

  // Delete User Handler
  const handleDeleteUser = async (id: number) => {
    if (confirm("Are you sure you want to delete this user?")) {
      try {
        await axios.delete(`http://localhost:8080/api/users/${id}`);
        fetchUsers();
      } catch (err) {
        console.error(err);
        alert("Failed to delete user!");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 text-zinc-900 py-10 px-4 relative">
      <div className="absolute inset-0 bg-white/80 backdrop-blur-sm z-0"></div>

      <div className="relative z-10 max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-zinc-900">Users Management</h1>
            <p className="text-sm text-zinc-600 mt-1">
              View, add, and manage system users.
            </p>
          </div>
          <a
            href="/"
            className="px-4 py-2 text-sm font-medium bg-zinc-200 text-zinc-800 rounded-lg hover:bg-zinc-300 transition shadow-sm"
          >
            Back to Home
          </a>
        </div>

        {/* Add User Form */}
        <div className="bg-white/90 backdrop-blur-md p-6 rounded-xl shadow-lg border border-zinc-200 mb-8">
          <h2 className="text-xl font-semibold mb-4 text-zinc-900">Add New User</h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-zinc-600 mb-1">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                placeholder="Enter username"
                className="w-full px-3 py-2 border rounded-lg bg-white text-zinc-900 border-zinc-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-zinc-600 mb-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Enter email"
                className="w-full px-3 py-2 border rounded-lg bg-white text-zinc-900 border-zinc-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-zinc-600 mb-1">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Enter password"
                className="w-full px-3 py-2 border rounded-lg bg-white text-zinc-900 border-zinc-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-zinc-600 mb-1">Role</label>
              <input
                type="text"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                required
                placeholder="Enter role (e.g., ADMIN, STUDENT)"
                className="w-full px-3 py-2 border rounded-lg bg-white text-zinc-900 border-zinc-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="md:col-span-2 flex justify-end">
              <button
                type="submit"
                disabled={submitting}
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition disabled:opacity-50 shadow-sm"
              >
                {submitting ? "Saving..." : "Save User"}
              </button>
            </div>
          </form>
        </div>

        {loading && (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
            <span className="ml-3 text-lg font-medium text-zinc-700">Loading users...</span>
          </div>
        )}

        {error && (
          <div className="p-4 mb-6 bg-red-100 border border-red-300 text-red-700 rounded-lg shadow-sm">
            {error}
          </div>
        )}

        {!loading && !error && (
          <div className="bg-white/90 backdrop-blur-md shadow-lg rounded-xl overflow-hidden border border-zinc-200">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-zinc-100/80 border-b border-zinc-200 text-xs uppercase tracking-wider text-zinc-600">
                    <th className="p-4">ID</th>
                    <th className="p-4">Username</th>
                    <th className="p-4">Email</th>
                    <th className="p-4">Role</th>
                    <th className="p-4 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-200">
                  {users.length > 0 ? (
                    users.map((user: any) => (
                      <tr key={user.id} className="hover:bg-zinc-50 transition">
                        <td className="p-4 font-medium text-zinc-900">#{user.id}</td>
                        <td className="p-4 font-semibold text-zinc-900">{user.username}</td>
                        <td className="p-4 text-zinc-600">{user.email}</td>
                        <td className="p-4">
                          <span className="px-3 py-1 text-xs font-semibold bg-purple-100 text-purple-800 rounded-full">
                            {user.role}
                          </span>
                        </td>
                        <td className="p-4 text-center">
                          <button
                            onClick={() => handleDeleteUser(user.id)}
                            className="px-3 py-1 text-xs font-medium bg-red-600 text-white rounded-lg hover:bg-red-700 transition shadow-sm"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="p-8 text-center text-zinc-500">
                        No users found in the database.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}