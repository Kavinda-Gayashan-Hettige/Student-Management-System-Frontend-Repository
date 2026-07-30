"use client";
import { useEffect, useState } from "react";
import { getStudents, getCourses, getUsers } from "@/app/services/api";

export default function DashboardPage() {
  const [stats, setStats] = useState({
    studentsCount: 0,
    coursesCount: 0,
    usersCount: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const [students, courses, users] = await Promise.all([
          getStudents(),
          getCourses(),
          getUsers(),
        ]);
        setStats({
          studentsCount: students.length,
          coursesCount: courses.length,
          usersCount: users.length,
        });
      } catch (err) {
        console.error("Failed to load dashboard stats", err);
      } finally {
        setLoading(false);
      }
    }
    fetchStats();
  }, []);

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black p-8 text-zinc-900 dark:text-zinc-50">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
              Welcome back! Here is an overview of the system.
            </p>
          </div>
          <div className="flex gap-3">
            <a
              href="/"
              className="px-4 py-2 text-sm font-medium bg-zinc-200 dark:bg-zinc-800 rounded-lg hover:bg-zinc-300 dark:hover:bg-zinc-700 transition"
            >
              Home
            </a>
            <a
              href="/login"
              className="px-4 py-2 text-sm font-medium bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
            >
              Logout
            </a>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white dark:bg-zinc-900 p-6 rounded-xl shadow-md border border-zinc-200 dark:border-zinc-800">
            <h3 className="text-sm font-medium text-zinc-500 dark:text-zinc-400">Total Students</h3>
            <p className="text-3xl font-bold mt-2 text-blue-600 dark:text-blue-400">
              {loading ? "..." : stats.studentsCount}
            </p>
          </div>
          <div className="bg-white dark:bg-zinc-900 p-6 rounded-xl shadow-md border border-zinc-200 dark:border-zinc-800">
            <h3 className="text-sm font-medium text-zinc-500 dark:text-zinc-400">Total Courses</h3>
            <p className="text-3xl font-bold mt-2 text-green-600 dark:text-green-400">
              {loading ? "..." : stats.coursesCount}
            </p>
          </div>
          <div className="bg-white dark:bg-zinc-900 p-6 rounded-xl shadow-md border border-zinc-200 dark:border-zinc-800">
            <h3 className="text-sm font-medium text-zinc-500 dark:text-zinc-400">System Users</h3>
            <p className="text-3xl font-bold mt-2 text-purple-600 dark:text-purple-400">
              {loading ? "..." : stats.usersCount}
            </p>
          </div>
        </div>

        {/* Quick Links Section */}
        <div className="bg-white dark:bg-zinc-900 p-6 rounded-xl shadow-md border border-zinc-200 dark:border-zinc-800">
          <h2 className="text-xl font-semibold mb-4">Quick Navigation</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <a
              href="/students"
              className="p-4 rounded-lg bg-zinc-100 dark:bg-zinc-800 hover:bg-blue-50 dark:hover:bg-zinc-700 transition font-medium text-center"
            >
              Manage Students ➔
            </a>
            <a
              href="/courses"
              className="p-4 rounded-lg bg-zinc-100 dark:bg-zinc-800 hover:bg-green-50 dark:hover:bg-zinc-700 transition font-medium text-center"
            >
              Manage Courses ➔
            </a>
            <a
              href="/users"
              className="p-4 rounded-lg bg-zinc-100 dark:bg-zinc-800 hover:bg-purple-50 dark:hover:bg-zinc-700 transition font-medium text-center"
            >
              Manage Users ➔
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}