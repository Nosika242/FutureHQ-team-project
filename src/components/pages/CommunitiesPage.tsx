import React from 'react';
import { HiOutlineUsers, HiPlus, HiOutlineChatAlt2 } from 'react-icons/hi';

const CommunitiesPage: React.FC = () => {
  const communities = [
    {
      id: 1,
      name: 'FutureLabs HQ',
      description: 'Main community for FutureLabs members',
      memberCount: 156,
      isActive: true,
      badge: '+10',
      color: 'from-blue-400 to-purple-500'
    },
    {
      id: 2,
      name: 'Design 2023',
      description: 'Design community for creative professionals',
      memberCount: 89,
      isActive: false,
      color: 'from-pink-400 to-red-500'
    }
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Communities</h1>
            <p className="mt-2 text-sm text-gray-600">
              Connect with like-minded professionals and join discussions
            </p>
          </div>
          <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-500 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors">
            <HiPlus className="mr-2 h-4 w-4" />
            Create Community
          </button>
        </div>
      </div>

      {/* Featured Communities */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Featured Communities</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {communities.map((community) => (
            <div
              key={community.id}
              className="bg-white rounded-lg shadow-brand-md p-6 hover-lift transition-all duration-300"
            >
              <div className="flex items-start space-x-4">
                <div className={`h-12 w-12 rounded-full bg-gradient-to-br ${community.color} flex items-center justify-center text-white font-medium text-lg`}>
                  {community.name.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2">
                    <h3 className="text-lg font-semibold text-gray-900">{community.name}</h3>
                    {community.badge && (
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {community.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{community.description}</p>
                  <div className="flex items-center space-x-4 mt-3">
                    <span className="text-xs text-gray-500">
                      {community.memberCount} members
                    </span>
                    {community.isActive && (
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Active
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <div className="mt-4 flex space-x-2">
                <button className="flex-1 px-4 py-2 bg-primary-500 text-white text-sm font-medium rounded-md hover:bg-primary-700 transition-colors">
                  Join Community
                </button>
                <button className="px-4 py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded-md hover:bg-gray-50 transition-colors">
                  Preview
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Popular Discussions */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Popular Discussions</h2>
        <div className="bg-white rounded-lg shadow-brand-md divide-y divide-gray-200">
          <div className="p-6">
            <div className="flex items-start space-x-4">
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-medium">
                D
              </div>
              <div className="flex-1">
                <h3 className="text-base font-medium text-gray-900">
                  Best practices for remote team collaboration
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  Discussion in Design 2023 • 23 replies • 2 hours ago
                </p>
                <div className="mt-2 flex items-center space-x-4">
                  <button className="flex items-center space-x-1 text-xs text-gray-500 hover:text-primary-500">
                    <HiOutlineChatAlt2 className="h-3 w-3" />
                    <span>23 replies</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="p-6">
            <div className="flex items-start space-x-4">
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center text-white font-medium">
                F
              </div>
              <div className="flex-1">
                <h3 className="text-base font-medium text-gray-900">
                  Welcome to FutureLabs HQ - Community Guidelines
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  Discussion in FutureLabs HQ • 45 replies • 1 day ago
                </p>
                <div className="mt-2 flex items-center space-x-4">
                  <button className="flex items-center space-x-1 text-xs text-gray-500 hover:text-primary-500">
                    <HiOutlineChatAlt2 className="h-3 w-3" />
                    <span>45 replies</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-primary-50 rounded-lg p-6">
        <div className="text-center">
          <HiOutlineUsers className="mx-auto h-12 w-12 text-primary-500" />
          <h3 className="mt-4 text-lg font-medium text-gray-900">
            Join the conversation
          </h3>
          <p className="mt-2 text-sm text-gray-600">
            Connect with professionals, share ideas, and learn from the community
          </p>
          <div className="mt-6 flex justify-center space-x-4">
            <button className="px-6 py-2 bg-primary-500 text-white font-medium rounded-md hover:bg-primary-700 transition-colors">
              Explore Communities
            </button>
            <button className="px-6 py-2 border border-primary-500 text-primary-500 font-medium rounded-md hover:bg-primary-50 transition-colors">
              Create Community
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunitiesPage;