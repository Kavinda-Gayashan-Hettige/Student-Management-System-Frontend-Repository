"use client";

import StudentNavbar from "@/app/components/StudentNavbar";
import { useState, useEffect } from "react";

export default function StudentProfile() {
  const [student, setStudent] = useState({
    name: "Loading...",
    email: "",
    phone: "+94 71 234 5678",
    program: "Bachelor of Information Technology (BIT)",
    studentId: "UCSC-BIT-2026-001",
    status: "Active",
  });

  const [isEditing, setIsEditing] = useState(false);

  
  useEffect(() => {
    if (typeof window !== 'undefined') {
      
      const loggedUserName = localStorage.getItem("username") || localStorage.getItem("name") || "Saman";
      
      setStudent((prev) => ({
        ...prev,
        name: loggedUserName,
        email: `${loggedUserName.toLowerCase()}@student.edu`,
      }));
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStudent({ ...student, [e.target.name]: e.target.value });
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsEditing(false);
    alert("Profile updated successfully!");
  };

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900">
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Student Profile</h1>
          <p className="text-sm text-zinc-500 mt-1">
            Manage your account details and personal information.
          </p>
        </div>

        {/* Profile Card */}
        <div className="bg-white rounded-2xl border border-zinc-200 shadow-sm overflow-hidden">
          
          {/* Top Banner / Cover */}
          <div className="h-32 bg-gradient-to-r from-blue-600 to-indigo-600 px-6 flex items-end pb-4">
            <div className="text-white">
              <h2 className="text-2xl font-bold">{student.name}</h2>
              <p className="text-xs text-blue-100">{student.program}</p>
            </div>
          </div>

          {/* Form Content */}
          <div className="p-6 sm:p-8">
            <form onSubmit={handleSave} className="space-y-6">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-semibold text-zinc-600 uppercase tracking-wider mb-2">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    disabled={!isEditing}
                    value={student.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 disabled:text-zinc-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-600 uppercase tracking-wider mb-2">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    disabled={!isEditing}
                    value={student.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 disabled:text-zinc-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-600 uppercase tracking-wider mb-2">Phone Number</label>
                  <input
                    type="text"
                    name="phone"
                    disabled={!isEditing}
                    value={student.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 disabled:text-zinc-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-600 uppercase tracking-wider mb-2">Student ID</label>
                  <input
                    type="text"
                    disabled
                    value={student.studentId}
                    className="w-full px-4 py-2.5 bg-zinc-100 border border-zinc-200 rounded-xl text-sm text-zinc-500 cursor-not-allowed"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end space-x-4 pt-4 border-t border-zinc-100">
                {!isEditing ? (
                  <button
                    type="button"
                    onClick={() => setIsEditing(true)}
                    className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition shadow-sm text-sm"
                  >
                    Edit Profile
                  </button>
                ) : (
                  <>
                    <button
                      type="button"
                      onClick={() => setIsEditing(false)}
                      className="px-6 py-2.5 bg-zinc-100 hover:bg-zinc-200 text-zinc-700 font-medium rounded-xl transition text-sm"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2.5 bg-green-600 hover:bg-green-700 text-white font-medium rounded-xl transition shadow-sm text-sm"
                    >
                      Save Changes
                    </button>
                  </>
                )}
              </div>

            </form>
          </div>

        </div>

      </main>
    </div>
  );
}