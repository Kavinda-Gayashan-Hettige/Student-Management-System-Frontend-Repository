"use client";
import { useEffect, useState } from "react";
import { getStudents, getCourses, getUsers } from "@/app/services/api";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

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

  const chartData = {
    labels: ["Students", "Courses", "Users"],
    datasets: [
      {
        label: "Total Count",
        data: [stats.studentsCount, stats.coursesCount, stats.usersCount],
        backgroundColor: [
          "rgba(37, 99, 235, 0.8)",   // Blue
          "rgba(22, 163, 74, 0.8)",    // Green
          "rgba(147, 51, 234, 0.8)",   // Purple
        ],
        borderColor: [
          "rgb(37, 99, 235)",
          "rgb(22, 163, 74)",
          "rgb(147, 51, 234)",
        ],
        borderWidth: 2,
        borderRadius: 8,
      },
    ],
  };

  const chartOptions: any = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: "System Overview Statistics",
        font: {
          size: 16,
        },
        color: "#27272a",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
          color: "#71717a",
        },
        grid: {
          color: "rgba(228, 228, 231, 0.5)",
        },
      },
      x: {
        ticks: {
          color: "#71717a",
        },
        grid: {
          display: false,
        },
      },
    },
  };

  return (
    <div 
      className="min-h-screen bg-cover bg-center bg-no-repeat relative text-zinc-900 py-10 px-4"
      style={{ backgroundImage: "url('/dashboard-bg.jpg')" }}
    >
      <div className="absolute inset-0 bg-white/80 backdrop-blur-sm z-0"></div>

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-zinc-900">Admin Dashboard</h1>
            <p className="text-sm text-zinc-600 mt-1">
              Welcome back! Here is an overview of the system.
            </p>
          </div>
          <div>
            <a
              href="/"
              className="px-4 py-2 text-sm font-medium bg-zinc-200 text-zinc-800 rounded-lg hover:bg-zinc-300 transition shadow-sm"
            >
              Home
            </a>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white/90 backdrop-blur-md p-6 rounded-xl shadow-lg border border-zinc-200">
            <h3 className="text-sm font-medium text-zinc-500">Total Students</h3>
            <p className="text-3xl font-bold mt-2 text-blue-600">
              {loading ? "..." : stats.studentsCount}
            </p>
          </div>
          <div className="bg-white/90 backdrop-blur-md p-6 rounded-xl shadow-lg border border-zinc-200">
            <h3 className="text-sm font-medium text-zinc-500">Total Courses</h3>
            <p className="text-3xl font-bold mt-2 text-green-600">
              {loading ? "..." : stats.coursesCount}
            </p>
          </div>
          <div className="bg-white/90 backdrop-blur-md p-6 rounded-xl shadow-lg border border-zinc-200">
            <h3 className="text-sm font-medium text-zinc-500">System Users</h3>
            <p className="text-3xl font-bold mt-2 text-purple-600">
              {loading ? "..." : stats.usersCount}
            </p>
          </div>
        </div>

        {/* Chart Section */}
        <div className="bg-white/90 backdrop-blur-md p-6 rounded-xl shadow-lg border border-zinc-200 mb-10">
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <span className="ml-3 text-sm text-zinc-600">Loading chart data...</span>
            </div>
          ) : (
            <div className="w-full h-[320px] flex justify-center items-center">
              <Bar data={chartData} options={chartOptions} />
            </div>
          )}
        </div>

        {/* Quick Links Section */}
        <div className="bg-white/90 backdrop-blur-md p-6 rounded-xl shadow-lg border border-zinc-200">
          <h2 className="text-xl font-semibold mb-4 text-zinc-900">Quick Navigation</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <a
              href="/students"
              className="p-4 rounded-lg bg-zinc-100 text-zinc-800 hover:bg-blue-50 hover:text-blue-600 transition font-medium text-center border border-zinc-200 shadow-sm"
            >
              Manage Students ➔
            </a>
            <a
              href="/courses"
              className="p-4 rounded-lg bg-zinc-100 text-zinc-800 hover:bg-green-50 hover:text-green-600 transition font-medium text-center border border-zinc-200 shadow-sm"
            >
              Manage Courses ➔
            </a>
            <a
              href="/users"
              className="p-4 rounded-lg bg-zinc-100 text-zinc-800 hover:bg-purple-50 hover:text-purple-600 transition font-medium text-center border border-zinc-200 shadow-sm"
            >
              Manage Users ➔
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}