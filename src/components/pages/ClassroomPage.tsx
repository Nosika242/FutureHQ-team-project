import React from 'react';
import { HiOutlineAcademicCap } from 'react-icons/hi';

const ClassroomPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Classroom</h1>
        <p className="mt-2 text-sm text-gray-600">
          Access your courses, assignments, and grades
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Course Outlines */}
        <div className="bg-white rounded-lg shadow-brand-md p-6 hover-lift transition-all duration-300">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-primary-50 rounded-lg">
              <HiOutlineAcademicCap className="h-6 w-6 text-primary-500" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Course Outlines</h3>
          </div>
          <p className="text-gray-600 mb-4">View and download course syllabi and outlines</p>
          <button className="w-full px-4 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-700 transition-colors">
            View Courses
          </button>
        </div>

        {/* Class Schedule */}
        <div className="bg-white rounded-lg shadow-brand-md p-6 hover-lift transition-all duration-300">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-primary-50 rounded-lg">
              <HiOutlineAcademicCap className="h-6 w-6 text-primary-500" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Class Schedule</h3>
          </div>
          <p className="text-gray-600 mb-4">Your current class timetable and schedule</p>
          <button className="w-full px-4 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-700 transition-colors">
            View Schedule
          </button>
        </div>

        {/* Assignments */}
        <div className="bg-white rounded-lg shadow-brand-md p-6 hover-lift transition-all duration-300">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-primary-50 rounded-lg">
              <HiOutlineAcademicCap className="h-6 w-6 text-primary-500" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Assignments</h3>
          </div>
          <p className="text-gray-600 mb-4">Submit and track your homework assignments</p>
          <button className="w-full px-4 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-700 transition-colors">
            View Assignments
          </button>
        </div>

        {/* My Grades */}
        <div className="bg-white rounded-lg shadow-brand-md p-6 hover-lift transition-all duration-300">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-primary-50 rounded-lg">
              <HiOutlineAcademicCap className="h-6 w-6 text-primary-500" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">My Grades</h3>
          </div>
          <p className="text-gray-600 mb-4">Check your academic performance and grades</p>
          <button className="w-full px-4 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-700 transition-colors">
            View Grades
          </button>
        </div>

        {/* Class Resources */}
        <div className="bg-white rounded-lg shadow-brand-md p-6 hover-lift transition-all duration-300">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-primary-50 rounded-lg">
              <HiOutlineAcademicCap className="h-6 w-6 text-primary-500" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Class Resources</h3>
          </div>
          <p className="text-gray-600 mb-4">Access study materials and learning resources</p>
          <button className="w-full px-4 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-700 transition-colors">
            Browse Resources
          </button>
        </div>
      </div>
    </div>
  );
};

export default ClassroomPage;