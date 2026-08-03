"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function StudentNavbar() {
  const pathname = usePathname();

  
  const isActive = (path: string) => pathname === path;

  return (
    <nav className="bg-white border-b border-zinc-200 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          
          {/* Logo / Brand Name */}
          <div className="flex items-center">
            <Link href="/student/dashboard" className="text-xl font-bold text-blue-600 tracking-tight">
              EduSystem <span className="text-xs px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full font-medium ml-1">Student</span>
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-6">
            <Link
              href="/student/dashboard"
              className={`text-sm font-medium transition-colors ${
                isActive("/student/dashboard") ? "text-blue-600 font-semibold" : "text-zinc-600 hover:text-blue-600"
              }`}
            >
              Dashboard
            </Link>

            <Link
              href="/student/courses"
              className={`text-sm font-medium transition-colors ${
                isActive("/student/courses") ? "text-blue-600 font-semibold" : "text-zinc-600 hover:text-blue-600"
              }`}
            >
              My Courses
            </Link>

            <Link
              href="/student/browse"
              className={`text-sm font-medium transition-colors ${
                isActive("/student/browse") ? "text-blue-600 font-semibold" : "text-zinc-600 hover:text-blue-600"
              }`}
            >
              Browse Courses
            </Link>

            <Link
              href="/student/results"
              className={`text-sm font-medium transition-colors ${
                isActive("/student/results") ? "text-blue-600 font-semibold" : "text-zinc-600 hover:text-blue-600"
              }`}
            >
              Results
            </Link>

            <Link
              href="/student/profile"
              className={`text-sm font-medium transition-colors ${
                isActive("/student/profile") ? "text-blue-600 font-semibold" : "text-zinc-600 hover:text-blue-600"
              }`}
            >
              Profile
            </Link>
          </div>

          {/* Logout / Right Section */}
          <div className="flex items-center">
            <Link
              href="/login"
              className="text-sm font-medium text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 px-4 py-2 rounded-lg transition"
            >
              Logout
            </Link>
          </div>

        </div>
      </div>
    </nav>
  );
}