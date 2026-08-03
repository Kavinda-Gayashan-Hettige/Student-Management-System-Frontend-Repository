"use client";
import { useEffect, useState } from "react";
import { getStudents } from "@/app/services/api";
import axios from "axios";

export default function StudentsPage() {
  const [students, setStudents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Form states for adding/updating a student
  const [studentId, setStudentId] = useState<number | null>(null); 
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [course, setCourse] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // Fetch all students function
  const fetchStudents = async () => {
    try {
      const data = await getStudents();
      setStudents(data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch students. Please check if your Spring Boot backend is running!");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  // Submit Handler (Supports both Create and Update)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      if (studentId) {
        // Update Student (PUT)
        await axios.put(`http://localhost:8080/api/students/${studentId}`, {
          name,
          email,
          course,
        });
        alert("Student updated successfully!");
      } else {
        // Create Student (POST)
        await axios.post("http://localhost:8080/api/students", {
          name,
          email,
          course,
        });
        alert("Student saved successfully!");
      }

      // Reset form and states
      setName("");
      setEmail("");
      setCourse("");
      setStudentId(null);

      fetchStudents();
    } catch (err) {
      console.error(err);
      alert("Failed to save student!");
    } finally {
      setSubmitting(false);
    }
  };

  // Edit Button Click Handler (Load data to form)
  const handleEdit = (student: any) => {
    setStudentId(student.id);
    setName(student.name);
    setEmail(student.email);
    setCourse(student.course);
  };

  // Delete Student Handler (DELETE)
  const handleDelete = async (id: number) => {
    if (confirm("Are you sure you want to delete this student?")) {
      try {
        await axios.delete(`http://localhost:8080/api/students/${id}`);
        fetchStudents();
      } catch (err) {
        console.error(err);
        alert("Failed to delete student!");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 text-zinc-900 py-10 px-4 relative">
      <div className="absolute inset-0 bg-white/80 backdrop-blur-sm z-0"></div>

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-zinc-900">Students Management</h1>
            <p className="text-sm text-zinc-600 mt-1">
              View, add, update, and delete registered students from the database.
            </p>
          </div>
          <a
            href="/admin/dashboard"
            className="px-4 py-2 text-sm font-medium bg-zinc-200 text-zinc-800 rounded-lg hover:bg-zinc-300 transition shadow-sm"
          >
            Back to Dashboard
          </a>
        </div>

        {/* Add / Update Student Form */}
        <div className="bg-white/90 backdrop-blur-md p-6 rounded-xl shadow-lg border border-zinc-200 mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-zinc-900">
              {studentId ? `Edit Student (ID: #${studentId})` : "Add New Student"}
            </h2>
            {studentId && (
              <button
                type="button"
                onClick={() => {
                  setStudentId(null);
                  setName("");
                  setEmail("");
                  setCourse("");
                }}
                className="text-xs text-red-600 hover:underline font-medium"
              >
                Cancel Edit
              </button>
            )}
          </div>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-medium text-zinc-600 mb-1">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="Enter name"
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
              <label className="block text-xs font-medium text-zinc-600 mb-1">Course</label>
              <input
                type="text"
                value={course}
                onChange={(e) => setCourse(e.target.value)}
                required
                placeholder="Enter course"
                className="w-full px-3 py-2 border rounded-lg bg-white text-zinc-900 border-zinc-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="md:col-span-3 flex justify-end">
              <button
                type="submit"
                disabled={submitting}
                className={`px-6 py-2 text-white font-medium rounded-lg transition disabled:opacity-50 shadow-sm ${
                  studentId ? "bg-amber-600 hover:bg-amber-700" : "bg-blue-600 hover:bg-blue-700"
                }`}
              >
                {submitting ? "Processing..." : studentId ? "Update Student" : "Save Student"}
              </button>
            </div>
          </form>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
            <span className="ml-3 text-lg font-medium text-zinc-700">Loading students...</span>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="p-4 mb-6 bg-red-100 border border-red-300 text-red-700 rounded-lg shadow-sm">
            {error}
          </div>
        )}

        {/* Data Table */}
        {!loading && !error && (
          <div className="bg-white/90 backdrop-blur-md shadow-lg rounded-xl overflow-hidden border border-zinc-200">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-zinc-100/80 border-b border-zinc-200 text-xs uppercase tracking-wider text-zinc-600">
                    <th className="p-4">ID</th>
                    <th className="p-4">Name</th>
                    <th className="p-4">Email</th>
                    <th className="p-4">Course</th>
                    <th className="p-4 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-200">
                  {students.length > 0 ? (
                    students.map((student: any) => (
                      <tr key={student.id} className="hover:bg-zinc-50 transition">
                        <td className="p-4 font-medium text-zinc-900">#{student.id}</td>
                        <td className="p-4 text-zinc-900">{student.name}</td>
                        <td className="p-4 text-zinc-600">{student.email}</td>
                        <td className="p-4">
                          <span className="px-3 py-1 text-xs font-semibold bg-blue-100 text-blue-800 rounded-full">
                            {student.course}
                          </span>
                        </td>
                        <td className="p-4 text-center space-x-2">
                          <button
                            onClick={() => handleEdit(student)}
                            className="px-3 py-1 text-xs font-medium bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition shadow-sm"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(student.id)}
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
                        No students found in the database.
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