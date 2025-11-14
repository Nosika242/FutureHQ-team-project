import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  HiOutlineMegaphone, 
  HiOutlineAcademicCap, 
  HiOutlineUsers, 
  HiOutlineBriefcase, 
  HiOutlineMail,
  HiChevronDown,
  HiChevronRight,
  HiPlus
} from 'react-icons/hi';

interface SidebarProps {
  onArticleSelect?: (article: any) => void;
  onClose?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onArticleSelect, onClose }) => {
  const location = useLocation();
  const [expandedSections, setExpandedSections] = useState({
    classroom: true,
    communities: true,
    projects: false,
    messages: true
  });

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const navigationItems = [
    {
      title: 'Announcements',
      items: [
        {
          name: 'General Announcements',
          path: '/announcements',
          icon: HiOutlineMegaphone,
          isActive: location.pathname === '/announcements'
        },
        {
          name: 'Class Room Announcements',
          path: '/classroom/announcements',
          icon: HiOutlineMegaphone
        }
      ]
    }
  ];

  const mainSections = [
    {
      title: 'Classroom',
      icon: HiOutlineAcademicCap,
      isExpanded: expandedSections.classroom,
      onToggle: () => toggleSection('classroom'),
      items: [
        { name: 'Course Outlines', path: '/classroom/courses' },
        { name: 'Class Schedule', path: '/classroom/schedule' },
        { name: 'Assignments', path: '/classroom/assignments' },
        { name: 'My Grades', path: '/classroom/grades' },
        { name: 'Class Resources', path: '/classroom/resources' }
      ]
    },
    {
      title: 'Communities',
      icon: HiOutlineUsers,
      isExpanded: expandedSections.communities,
      onToggle: () => toggleSection('communities'),
      badge: '+10',
      items: [
        { name: 'FutureLabs HQ', path: '/communities/futurelabs-hq', hasBadge: true },
        { name: 'Design 2023', path: '/communities/design-2023' },
        { name: '+ Create a Community', path: '/communities/create', isAction: true }
      ]
    },
    {
      title: 'Projects',
      icon: HiOutlineBriefcase,
      isExpanded: expandedSections.projects,
      onToggle: () => toggleSection('projects'),
      items: []
    },
    {
      title: 'Direct Messages',
      icon: HiOutlineMail,
      isExpanded: expandedSections.messages,
      onToggle: () => toggleSection('messages'),
      items: [
        { name: 'Olivia Rhye', path: '/messages/olivia-rhye', isUser: true },
        { name: 'Emmanuel Ekpenyong', path: '/messages/emmanuel-ekpenyong', isUser: true },
        { name: 'Manasseh Udim', path: '/messages/manasseh-udim', isUser: true }
      ]
    }
  ];

  const handleLinkClick = () => {
    if (onClose) {
      onClose();
    }
  };

  return (
    <div className="w-64 bg-neutral-50 border-r border-gray-200 h-full overflow-y-auto">
      <div className="p-4">
        {/* Announcements Section */}
        <nav className="space-y-1">
          {navigationItems.map((section) => (
            <div key={section.title}>
              <h3 className="px-3 mb-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                {section.title}
              </h3>
              {section.items.map((item) => {
                const IconComponent = item.icon;
                return (
                  <Link
                    key={item.name}
                    to={item.path}
                    onClick={handleLinkClick}
                    className={`group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                      item.isActive
                        ? 'bg-primary-50 text-primary-700 border-r-2 border-primary-500'
                        : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                    }`}
                  >
                    <IconComponent className={`mr-3 h-5 w-5 ${
                      item.isActive ? 'text-primary-500' : 'text-gray-600 group-hover:text-gray-900'
                    }`} />
                    {item.name}
                  </Link>
                );
              })}
            </div>
          ))}

          {/* Main Navigation Sections */}
          {mainSections.map((section) => (
            <div key={section.title} className="mt-6">
              <button
                onClick={section.onToggle}
                className="group w-full flex items-center px-3 py-2 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <section.icon className="mr-3 h-5 w-5 text-gray-600 group-hover:text-gray-900" />
                <span className="flex-1 text-left">{section.title}</span>
                {section.items.length > 0 && (
                  <span className="ml-2">
                    {section.isExpanded ? (
                      <HiChevronDown className="h-4 w-4" />
                    ) : (
                      <HiChevronRight className="h-4 w-4" />
                    )}
                  </span>
                )}
                {section.badge && (
                  <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {section.badge}
                  </span>
                )}
              </button>
              
              {/* Sub-items */}
              {section.isExpanded && section.items.length > 0 && (
                <div className="ml-6 mt-1 space-y-1">
                  {section.items.map((item) => (
                    <Link
                      key={item.name}
                      to={item.path}
                      onClick={handleLinkClick}
                      className={`group flex items-center px-3 py-1.5 text-sm rounded-md transition-colors ${
                        item.isAction
                          ? 'text-primary-600 hover:text-primary-700 hover:bg-primary-50'
                          : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                      }`}
                    >
                      {item.isUser && (
                        <div className="mr-2 h-6 w-6 rounded-full bg-orange-500 flex items-center justify-center text-white text-xs font-medium">
                          {item.name.charAt(0)}
                        </div>
                      )}
                      <span>{item.name}</span>
                      {item.hasBadge && (
                        <span className="ml-auto inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          +10
                        </span>
                      )}
                      {item.isAction && (
                        <HiPlus className="ml-auto h-4 w-4" />
                      )}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;