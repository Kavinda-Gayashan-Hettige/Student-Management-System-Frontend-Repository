"use client";
import { useEffect, useState } from "react";
import { getCourses } from "@/app/services/api";
import axios from "axios";
import CourseCard from "@/app/components/CourseCard";

export default function CoursesPage() {
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [courseName, setCourseName] = useState("");
  const [courseCode, setCourseCode] = useState("");
  const [description, setDescription] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const fetchCourses = async () => {
    try {
      const data = await getCourses();
      setCourses(data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch courses. Please check if your Spring Boot backend is running!");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await axios.post("http://localhost:8080/api/courses", {
        courseName,
        courseCode,
        description,
      });
      setCourseName("");
      setCourseCode("");
      setDescription("");
      fetchCourses();
    } catch (err) {
      console.error(err);
      alert("Failed to save course!");
    } finally {
      setSubmitting(false);
    }
  };

  // Delete Course Handler
  const handleDeleteCourse = async (id: number) => {
    if (confirm("Are you sure you want to delete this course?")) {
      try {
        await axios.delete(`http://localhost:8080/api/courses/${id}`);
        fetchCourses();
      } catch (err) {
        console.error(err);
        alert("Failed to delete course!");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 text-zinc-900 py-10 px-4 relative">
      <div className="absolute inset-0 bg-white/80 backdrop-blur-sm z-0"></div>

      <div className="relative z-10 max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-zinc-900">Courses Management</h1>
            <p className="text-sm text-zinc-600 mt-1">
              View, add, and manage available courses.
            </p>
          </div>
          <a
            href="/"
            className="px-4 py-2 text-sm font-medium bg-zinc-200 text-zinc-800 rounded-lg hover:bg-zinc-300 transition shadow-sm"
          >
            Back to Home
          </a>
        </div>

        {/* Add Course Form */}
        <div className="bg-white/90 backdrop-blur-md p-6 rounded-xl shadow-lg border border-zinc-200 mb-8">
          <h2 className="text-xl font-semibold mb-4 text-zinc-900">Add New Course</h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-zinc-600 mb-1">Course Name</label>
              <input
                type="text"
                value={courseName}
                onChange={(e) => setCourseName(e.target.value)}
                required
                placeholder="Enter course name"
                className="w-full px-3 py-2 border rounded-lg bg-white text-zinc-900 border-zinc-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-zinc-600 mb-1">Course Code</label>
              <input
                type="text"
                value={courseCode}
                onChange={(e) => setCourseCode(e.target.value)}
                required
                placeholder="Enter course code (e.g., CS101)"
                className="w-full px-3 py-2 border rounded-lg bg-white text-zinc-900 border-zinc-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs font-medium text-zinc-600 mb-1">Description</label>
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter course description"
                className="w-full px-3 py-2 border rounded-lg bg-white text-zinc-900 border-zinc-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="md:col-span-2 flex justify-end">
              <button
                type="submit"
                disabled={submitting}
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition disabled:opacity-50 shadow-sm"
              >
                {submitting ? "Saving..." : "Save Course"}
              </button>
            </div>
          </form>
        </div>

        {loading && (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
            <span className="ml-3 text-lg font-medium text-zinc-700">Loading courses...</span>
          </div>
        )}

        {error && (
          <div className="p-4 mb-6 bg-red-100 border border-red-300 text-red-700 rounded-lg shadow-sm">
            {error}
          </div>
        )}

        {/* Courses Cards Grid */}
        {!loading && !error && (
          <div>
            {courses.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {courses.map((course: any) => (
                  <div key={course.id} className="flex flex-col justify-between bg-white rounded-xl border border-zinc-200 shadow-md p-5">
                    <CourseCard
                      id={course.id}
                      courseName={course.courseName}
                      courseCode={course.courseCode}
                      description={course.description}
                    />
                    <div className="mt-4 pt-3 border-t border-zinc-100 flex justify-end">
                      <button
                        onClick={() => handleDeleteCourse(course.id)}
                        className="px-3 py-1.5 text-xs font-medium bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition shadow-sm"
                      >
                        Delete Course
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white/90 backdrop-blur-md p-12 text-center rounded-xl border border-zinc-200 shadow-lg text-zinc-500">
                No courses found in the database.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}