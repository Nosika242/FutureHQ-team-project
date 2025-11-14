import React from 'react';
import { HiOutlineBriefcase, HiPlus, HiCalendar, HiUserGroup } from 'react-icons/hi';

const ProjectsPage: React.FC = () => {
  const projects = [
    {
      id: 1,
      name: 'FutureLabs Dashboard Redesign',
      description: 'Redesigning the main dashboard for better user experience',
      status: 'In Progress',
      progress: 75,
      dueDate: '2024-01-15',
      teamMembers: 5,
      color: 'bg-blue-500'
    },
    {
      id: 2,
      name: 'Mobile App Development',
      description: 'Native mobile application for iOS and Android',
      status: 'Planning',
      progress: 25,
      dueDate: '2024-03-01',
      teamMembers: 8,
      color: 'bg-yellow-500'
    },
    {
      id: 3,
      name: 'API Integration',
      description: 'Integrating third-party APIs for enhanced functionality',
      status: 'Review',
      progress: 90,
      dueDate: '2024-01-10',
      teamMembers: 3,
      color: 'bg-green-500'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'In Progress':
        return 'bg-blue-100 text-blue-800';
      case 'Planning':
        return 'bg-yellow-100 text-yellow-800';
      case 'Review':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Projects</h1>
            <p className="mt-2 text-sm text-gray-600">
              Manage and track your projects and collaborations
            </p>
          </div>
          <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-500 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors">
            <HiPlus className="mr-2 h-4 w-4" />
            New Project
          </button>
        </div>
      </div>

      {/* Project Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-brand-md p-6">
          <div className="flex items-center">
            <div className="p-2 bg-blue-50 rounded-lg">
              <HiBriefcase className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-900">Total Projects</h3>
              <p className="text-2xl font-bold text-blue-600">12</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-brand-md p-6">
          <div className="flex items-center">
            <div className="p-2 bg-green-50 rounded-lg">
              <HiBriefcase className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-900">Active</h3>
              <p className="text-2xl font-bold text-green-600">8</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-brand-md p-6">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-50 rounded-lg">
              <HiBriefcase className="h-6 w-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-900">In Review</h3>
              <p className="text-2xl font-bold text-yellow-600">3</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-brand-md p-6">
          <div className="flex items-center">
            <div className="p-2 bg-purple-50 rounded-lg">
              <HiBriefcase className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-900">Completed</h3>
              <p className="text-2xl font-bold text-purple-600">23</p>
            </div>
          </div>
        </div>
      </div>

      {/* Projects List */}
      <div className="bg-white rounded-lg shadow-brand-md overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Your Projects</h2>
        </div>
        
        <div className="divide-y divide-gray-200">
          {projects.map((project) => (
            <div key={project.id} className="p-6 hover:bg-gray-50 transition-colors">
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {project.name}
                    </h3>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                      {project.status}
                    </span>
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-4">{project.description}</p>
                  
                  {/* Progress Bar */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between text-sm text-gray-600 mb-1">
                      <span>Progress</span>
                      <span>{project.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${project.color}`}
                        style={{ width: `${project.progress}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  {/* Project Meta */}
                  <div className="flex items-center space-x-6 text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <HiCalendar className="h-4 w-4" />
                      <span>Due {new Date(project.dueDate).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <HiUserGroup className="h-4 w-4" />
                      <span>{project.teamMembers} members</span>
                    </div>
                  </div>
                </div>
                
                <div className="ml-6 flex flex-col space-y-2">
                  <button className="px-4 py-2 bg-primary-500 text-white text-sm font-medium rounded-md hover:bg-primary-700 transition-colors">
                    View Project
                  </button>
                  <button className="px-4 py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded-md hover:bg-gray-50 transition-colors">
                    Edit
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Empty State */}
      {projects.length === 0 && (
        <div className="text-center py-12">
          <HiOutlineBriefcase className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-4 text-lg font-medium text-gray-900">No projects yet</h3>
          <p className="mt-2 text-sm text-gray-600">
            Get started by creating your first project
          </p>
          <div className="mt-6">
            <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-500 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors">
              <HiPlus className="mr-2 h-4 w-4" />
              Create Project
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectsPage;