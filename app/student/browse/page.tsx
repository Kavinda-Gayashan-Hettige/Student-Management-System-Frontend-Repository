"use client";

import StudentNavbar from "@/app/components/StudentNavbar";
import { useState } from "react";

export default function BrowseCourses() {
 
  const [courses, setCourses] = useState([
    { id: 1, title: "Full-Stack Web Development", code: "CS101", instructor: "Dr. Silva", description: "Learn Spring Boot, React, and modern web architecture.", duration: "3 Months" },
    { id: 2, title: "Mobile App Development with Flutter", code: "CS102", instructor: "Mr. Perera", description: "Build cross-platform mobile apps for Android and iOS.", duration: "2 Months" },
    { id: 3, title: "Database Management Systems", code: "CS103", instructor: "Ms. Fernando", description: "Master SQL, PostgreSQL, Supabase, and database design.", duration: "3 Months" },
    { id: 4, title: "Advanced Software Engineering", code: "CS104", instructor: "Dr. Jayasinghe", description: "Design patterns, clean code, architecture principles, and testing.", duration: "4 Months" },
    { id: 5, title: "Cloud Computing & Docker", code: "CS105", instructor: "Mr. Rathnayake", description: "Learn containerization, Docker, Kubernetes, and cloud deployment basics.", duration: "2 Months" },
    { id: 6, title: "UI/UX Design Fundamentals", code: "CS106", instructor: "Ms. Wickramasinghe", description: "Master wireframing, prototyping, Figma, and modern user interface design.", duration: "2 Months" },
    { id: 7, title: "Cyber Security & Ethical Hacking", code: "CS107", instructor: "Dr. Herath", description: "Understand network security, vulnerability assessment, and secure coding practices.", duration: "3 Months" },
    { id: 8, title: "Data Structures & Algorithms", code: "CS108", instructor: "Prof. Gunawardena", description: "Master core algorithms, problem-solving techniques, and efficient data structures.", duration: "4 Months" }
  ]);

  const handleEnroll = (courseTitle: string) => {
    alert(`Successfully enrolled in ${courseTitle}!`);
  };

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900">
    

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Header Section */}
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Browse Available Courses</h1>
            <p className="text-sm text-zinc-500 mt-1">
              Explore and enroll in new courses to enhance your academic journey.
            </p>
          </div>
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {courses.map((course) => (
            <div key={course.id} className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-3">
                  <span className="px-3 py-1 text-xs font-semibold bg-blue-50 text-blue-700 rounded-full">
                    {course.code}
                  </span>
                  <span className="text-xs text-zinc-500 font-medium">Duration: {course.duration}</span>
                </div>

                <h3 className="text-xl font-bold text-zinc-900 mb-2">{course.title}</h3>
                <p className="text-sm text-zinc-600 mb-4">{course.description}</p>
                <p className="text-xs font-medium text-zinc-500 mb-6">Instructor: <span className="text-zinc-800">{course.instructor}</span></p>
              </div>

              <button
                onClick={() => handleEnroll(course.title)}
                className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition shadow-sm text-sm"
              >
                Enroll Now
              </button>
            </div>
          ))}
        </div>

      </main>
    </div>
  );
}