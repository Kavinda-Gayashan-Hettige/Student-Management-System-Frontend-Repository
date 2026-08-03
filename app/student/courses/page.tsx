"use client";

import StudentNavbar from "@/app/components/StudentNavbar";
import { useState } from "react";

export default function MyCourses() {
  const [enrolledCourses, setEnrolledCourses] = useState([
    { id: 1, title: "Full-Stack Web Development", code: "CS101", instructor: "Dr. Silva", progress: "75%", status: "In Progress" },
    { id: 2, title: "Database Management Systems", code: "CS103", instructor: "Ms. Fernando", progress: "90%", status: "In Progress" },
    { id: 3, title: "Mobile App Development with Flutter", code: "CS102", instructor: "Mr. Perera", progress: "40%", status: "In Progress" },
    { id: 4, title: "Introduction to Computer Science", code: "CS099", instructor: "Prof. Jayawardena", progress: "100%", status: "Completed" },
  ]);

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900">
     

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">My Enrolled Courses</h1>
          <p className="text-sm text-zinc-500 mt-1">
            Track your ongoing courses, progress, and learning materials.
          </p>
        </div>

        {/* Courses List Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {enrolledCourses.map((course) => (
            <div key={course.id} className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-3">
                  <span className="px-3 py-1 text-xs font-semibold bg-blue-50 text-blue-700 rounded-full">
                    {course.code}
                  </span>
                  <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                    course.status === "Completed" ? "bg-green-50 text-green-700" : "bg-amber-50 text-amber-700"
                  }`}>
                    {course.status}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-zinc-900 mb-1">{course.title}</h3>
                <p className="text-xs font-medium text-zinc-500 mb-4">Instructor: <span className="text-zinc-800">{course.instructor}</span></p>

                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="flex justify-between text-xs font-medium text-zinc-600 mb-1">
                    <span>Course Progress</span>
                    <span>{course.progress}</span>
                  </div>
                  <div className="w-full bg-zinc-100 h-2 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full ${course.status === "Completed" ? "bg-green-600" : "bg-blue-600"}`} 
                      style={{ width: course.progress }}
                    ></div>
                  </div>
                </div>
              </div>

              <button
                onClick={() => alert(`Opening materials for ${course.title}`)}
                className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition shadow-sm text-sm"
              >
                View Materials
              </button>
            </div>
          ))}
        </div>

      </main>
    </div>
  );
}