import React from "react";

interface CourseCardProps {
  id: number | string;
  courseName: string;
  courseCode: string;
  description: string;
}

export default function CourseCard({ id, courseName, courseCode, description }: CourseCardProps) {
  return (
    <div className="bg-white/90 backdrop-blur-md p-6 rounded-xl shadow-lg border border-zinc-200 hover:shadow-xl transition flex flex-col justify-between">
      <div>
        <div className="flex justify-between items-start mb-3">
          <span className="text-xs font-bold text-zinc-400">#{id}</span>
          <span className="px-3 py-1 text-xs font-semibold bg-green-100 text-green-800 rounded-full">
            {courseCode}
          </span>
        </div>
        <h3 className="text-lg font-bold text-zinc-900 mb-2">{courseName}</h3>
        <p className="text-sm text-zinc-600 line-clamp-3">
          {description || "No description provided for this course."}
        </p>
      </div>
      <div className="mt-6 pt-4 border-t border-zinc-100 flex justify-end">
        <span className="text-xs font-medium text-blue-600 hover:underline cursor-pointer">
          View Details ➔
        </span>
      </div>
    </div>
  );
}