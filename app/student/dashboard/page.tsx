"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import StudentNavbar from "@/app/components/StudentNavbar";
import Link from "next/link";

export default function StudentDashboard() {
  const router = useRouter();

  useEffect(() => {
    
    const role = localStorage.getItem("role");
    if (role && role !== "STUDENT" && role !== "ADMIN") {
      router.push("/login");
    }
  }, [router]);

  const stats = {
    enrolledCourses: 4,
    completedCourses: 1,
    pendingAssignments: 2,
    gpa: "3.75",
  };

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900">
      

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Student Dashboard</h1>
          <p className="text-sm text-zinc-500 mt-1">
            Welcome back! Here is an overview of your academic progress.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          
          <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm">
            <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">Enrolled Courses</p>
            <h3 className="text-3xl font-extrabold text-blue-600 mt-2">{stats.enrolledCourses}</h3>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm">
            <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">Completed Courses</p>
            <h3 className="text-3xl font-extrabold text-green-600 mt-2">{stats.completedCourses}</h3>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm">
            <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">Pending Assignments</p>
            <h3 className="text-3xl font-extrabold text-amber-600 mt-2">{stats.pendingAssignments}</h3>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm">
            <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">Current GPA</p>
            <h3 className="text-3xl font-extrabold text-indigo-600 mt-2">{stats.gpa}</h3>
          </div>

        </div>

        {/* Quick Actions / Recent Activity Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Quick Links Card */}
          <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm lg:col-span-1">
            <h2 className="text-lg font-bold mb-4">Quick Actions</h2>
            <div className="flex flex-col space-y-3">
              <Link 
                href="/student/browse" 
                className="p-3 bg-blue-50 hover:bg-blue-100 text-blue-700 font-medium rounded-xl transition text-sm flex items-center justify-between"
              >
                <span>Browse New Courses</span>
                <span>→</span>
              </Link>
              <Link 
                href="/student/courses" 
                className="p-3 bg-zinc-50 hover:bg-zinc-100 text-zinc-700 font-medium rounded-xl transition text-sm flex items-center justify-between"
              >
                <span>View My Courses</span>
                <span>→</span>
              </Link>
              <Link 
                href="/student/results" 
                className="p-3 bg-zinc-50 hover:bg-zinc-100 text-zinc-700 font-medium rounded-xl transition text-sm flex items-center justify-between"
              >
                <span>Check Results</span>
                <span>→</span>
              </Link>
            </div>
          </div>

          {/* Announcements / Notice Board */}
          <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm lg:col-span-2">
            <h2 className="text-lg font-bold mb-4">Notice Board</h2>
            <div className="space-y-4">
              <div className="p-4 bg-amber-50 border-l-4 border-amber-500 rounded-r-xl">
                <h4 className="text-sm font-semibold text-amber-800">Semester Exam Schedules Released</h4>
                <p className="text-xs text-amber-700 mt-1">Please check the results page or notice board for your respective exam hall details.</p>
              </div>
              <div className="p-4 bg-blue-50 border-l-4 border-blue-500 rounded-r-xl">
                <h4 className="text-sm font-semibold text-blue-800">New Course Material Added</h4>
                <p className="text-xs text-blue-700 mt-1">Lecture slides for Software Engineering module have been uploaded.</p>
              </div>
            </div>
          </div>

        </div>

      </main>
    </div>
  );
}