import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Modal from "../Modal";
import AddPost from "../PostNextActions/AddPost";
import {
  FaBook,
  FaUsers,
  FaProjectDiagram,
  FaEnvelope,
  FaChevronDown,
  FaPlus,
} from "react-icons/fa";

type ExpandedSections = {
  announcements: boolean;
  classroom: boolean;
  communities: boolean;
  projects: boolean;
  messages: boolean;
};

const Sidebar: React.FC = () => {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [expandedSections, setExpandedSections] = useState<ExpandedSections>({
    announcements: true,
    classroom: false,
    communities: false,
    projects: false,
    messages: false,
  });

  const toggleSection = (section: keyof ExpandedSections) => {
    setExpandedSections({
      ...expandedSections,
      [section]: !expandedSections[section],
    });
  };

  const isActive = (path: string): boolean => location.pathname === path;

  return (
    <aside
      className="w-64 bg-white border-r border-gray-200 overflow-y-auto"
      style={{ height: "calc(100vh - 64px)" }}
      data-testid="sidebar"
    >
      <div className="p-4">

        <div className="mb-2">
          <div className="text-sm font-semibold text-coffee mb-2">
            Announcements
          </div>

          <Link
            to="/dashboard/general-announcements"
            className={`flex items-center px-3 py-2 rounded-lg mb-1 ${isActive("/dashboard/general-announcements") ||
                isActive("/dashboard")
                ? "bg-aqua text-white"
                : "text-gray-700 hover:bg-gray-100"
              }`}
            data-testid="general-announcements-link"
          >
            General Announcements
          </Link>

          <Link
            to="/dashboard/classroom-announcements"
            className={`flex items-center px-3 py-2 rounded-lg ${isActive("/dashboard/classroom-announcements")
                ? "bg-aqua text-white"
                : "text-gray-700 hover:bg-gray-100"
              }`}
            data-testid="classroom-announcements-link"
          >
            Class Room Announcements
          </Link>
        </div>

        <div className="mb-2">
          <button
            onClick={() => toggleSection("classroom")}
            className="flex items-center justify-between w-full px-3 py-2 text-left text-sm font-semibold text-coffee hover:bg-gray-50 rounded"
            data-testid="classroom-section-toggle"
          >
            <div className="flex items-center">
              <FaBook className="mr-2" />
              Classroom
            </div>
            <FaChevronDown
              className={`text-xs transition-transform ${expandedSections.classroom ? "rotate-180" : ""
                }`}
            />
          </button>
          {expandedSections.classroom && (
            <div className="ml-4 mt-1 space-y-1">
              <Link
                to="/dashboard/course-outlines"
                className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded"
              >
                Course Outlines
              </Link>
              <Link
                to="/dashboard/class-schedule"
                className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded"
              >
                Class Schedule
              </Link>
              <Link
                to="/dashboard/assignments"
                className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded"
              >
                Assignments
              </Link>
              <Link
                to="/dashboard/my-grades"
                className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded"
              >
                My Grades
              </Link>
              <Link
                to="/dashboard/class-resources"
                className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded"
              >
                Class Resources
              </Link>
            </div>
          )}
        </div>

        <div className="mb-2">
          <button
            onClick={() => toggleSection("communities")}
            className="flex items-center justify-between w-full px-3 py-2 text-left text-sm font-semibold text-coffee hover:bg-gray-50 rounded"
            data-testid="communities-section-toggle"
          >
            <div className="flex items-center">
              <FaUsers className="mr-2" />
              Communities
            </div>
            <FaChevronDown
              className={`text-xs transition-transform ${expandedSections.communities ? "rotate-180" : ""
                }`}
            />
          </button>
          {expandedSections.communities && (
            <div className="ml-4 mt-1 space-y-1">
              <Link
                to="/dashboard/futurelabs-hq"
                className="flex items-center justify-between px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded"
              >
                <span>FutureLabs HQ</span>
                <span className="text-xs bg-primary text-white px-2 py-0.5 rounded-full">
                  +10
                </span>
              </Link>
              <Link
                to="/dashboard/design-2023"
                className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded"
              >
                Design 2023
              </Link>
              <button className="flex items-center w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded">
                <FaPlus className="mr-2 text-xs" />
                Create a Community
              </button>
            </div>
          )}
        </div>

        <div className="mb-2">
          <button
            onClick={() => toggleSection("projects")}
            className="flex items-center justify-between w-full px-3 py-2 text-left text-sm font-semibold text-coffee hover:bg-gray-50 rounded"
            data-testid="projects-section-toggle"
          >
            <div className="flex items-center">
              <FaProjectDiagram className="mr-2" />
              Projects
            </div>
            <FaChevronDown
              className={`text-xs transition-transform ${expandedSections.projects ? "rotate-180" : ""
                }`}
            />
          </button>
        </div>

        <div className="mb-2">
          <button
            onClick={() => toggleSection("messages")}
            className="flex items-center justify-between w-full px-3 py-2 text-left text-sm font-semibold text-coffee hover:bg-gray-50 rounded"
            data-testid="messages-section-toggle"
          >
            <div className="flex items-center">
              <FaEnvelope className="mr-2" />
              Direct Messages
            </div>
            <FaChevronDown
              className={`text-xs transition-transform ${expandedSections.messages ? "rotate-180" : ""
                }`}
            />
          </button>
          {expandedSections.messages && (
            <div className="ml-4 mt-1 space-y-1">
              <button className="flex items-center w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded">
                <div className="w-6 h-6 bg-primary rounded-full mr-2 flex-shrink-0"></div>
                <div className="flex-1 text-left">
                  <div className="text-sm">Olivia Rhye</div>
                  <div className="w-2 h-2 bg-green-500 rounded-full inline-block"></div>
                </div>
              </button>
              <button className="flex items-center w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded">
                <div className="w-6 h-6 bg-primary rounded-full mr-2 flex-shrink-0"></div>
                <div className="flex-1 text-left">
                  <div className="text-sm">Olivia Rhye</div>
                  <div className="w-2 h-2 bg-green-500 rounded-full inline-block"></div>
                </div>
              </button>
              <button className="flex items-center w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded">
                <div className="w-6 h-6 bg-primary rounded-full mr-2 flex-shrink-0"></div>
                <div className="flex-1 text-left">
                  <div className="text-sm">Olivia Rhye</div>
                  <div className="w-2 h-2 bg-green-500 rounded-full inline-block"></div>
                </div>
              </button>
            </div>
          )}
        </div>

        <div
          onClick={() => { setOpen(true) }}
          className="flex items-center gap-2 p-2 cursor-pointer text-[#BA5D00] font-semibold hover:bg-[#00A58E] hover:text-white rounded-md transition"
        >
          <span className="font-semibold">+  New Post</span>
        </div>

      </div>
      <Modal isOpen={open} onClose={() => setOpen(false)}>
        <AddPost onClose={() => setOpen(false)} />
      </Modal>
    </aside>
  );
};

export default Sidebar;