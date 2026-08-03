"use client";

import StudentNavbar from "@/app/components/StudentNavbar";
import { useState } from "react";

export default function StudentResults() {
  
  const [results, setResults] = useState([
    { id: 1, courseCode: "CS101", courseName: "Full-Stack Web Development", semester: "Semester 1", marks: "88%", grade: "A", status: "Pass" },
    { id: 2, courseCode: "CS103", courseName: "Database Management Systems", semester: "Semester 1", marks: "75%", grade: "B+", status: "Pass" },
    { id: 3, courseCode: "CS102", courseName: "Mobile App Development with Flutter", semester: "Semester 2", marks: "82%", grade: "A-", status: "Pass" },
    { id: 4, courseCode: "CS099", courseName: "Introduction to Computer Science", semester: "Semester 1", marks: "90%", grade: "A+", status: "Pass" },
  ]);

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900">
    

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Header Section */}
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Exam Results & Grades</h1>
            <p className="text-sm text-zinc-500 mt-1">
              View your academic performance, semester grades, and marks.
            </p>
          </div>
          <div className="bg-white px-4 py-2 rounded-xl border border-zinc-200 shadow-sm text-sm font-medium">
            Cumulative GPA: <span className="text-blue-600 font-bold ml-1">3.75</span>
          </div>
        </div>

        {/* Results Table / Card Grid */}
        <div className="bg-white rounded-2xl border border-zinc-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-zinc-50 border-b border-zinc-200 text-xs font-semibold text-zinc-500 uppercase tracking-wider">
                  <th className="py-4 px-6">Course Code</th>
                  <th className="py-4 px-6">Course Name</th>
                  <th className="py-4 px-6">Semester</th>
                  <th className="py-4 px-6">Marks</th>
                  <th className="py-4 px-6">Grade</th>
                  <th className="py-4 px-6">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 text-sm">
                {results.map((res) => (
                  <tr key={res.id} className="hover:bg-zinc-50/50 transition">
                    <td className="py-4 px-6 font-semibold text-blue-600">{res.courseCode}</td>
                    <td className="py-4 px-6 font-medium text-zinc-800">{res.courseName}</td>
                    <td className="py-4 px-6 text-zinc-600">{res.semester}</td>
                    <td className="py-4 px-6 text-zinc-800 font-semibold">{res.marks}</td>
                    <td className="py-4 px-6">
                      <span className="px-2.5 py-1 text-xs font-bold bg-blue-50 text-blue-700 rounded-lg">
                        {res.grade}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <span className="px-2.5 py-1 text-xs font-semibold bg-green-50 text-green-700 rounded-full">
                        {res.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </main>
    </div>
  );
}