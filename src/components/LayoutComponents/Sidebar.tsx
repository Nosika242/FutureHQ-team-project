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

const Sidebar: React.FC<{ isOpen: boolean }> = ({ isOpen }) => {
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
    <>
      <div
        className={`
        h-screen bg-white border-r border-gray-200 overflow-y-auto
        fixed lg:relative top-0 left-0 z-40
        w-64 transform transition-transform duration-300
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0
      `}
        data-testid="sidebar"
      >
        <div className="min-w-0 flex-1 md:flex md:items-center md:justify-between p-4 pb-0">
          {" "}
          <h1 className="text-2xl font-bold text-[#00A58E] hidden md:block">
            {" "}
            Future HQ{" "}
          </h1>{" "}
        </div>
        <hr className="my-4 text-gray-200" />

        <div className="p-4">
          <div className="mb-2 pt-2">
            <div className="text-sm font-semibold text-[#BA5D00] mb-2">
              Announcements
            </div>

            <Link
              to="/dashboard/general-announcements"
              className={`flex items-center px-3 py-2 rounded-lg mb-1 ${
                isActive("/dashboard/general-announcements") ||
                isActive("/dashboard")
                  ? "bg-[#00A58E] text-white"
                  : "text-gray-700 hover:bg-[#00A58E] hover:text-white"
              }`}
              data-testid="general-announcements-link"
            >
              General Announcements
            </Link>

            <Link
              to="/dashboard/classroom-announcements"
              className={`flex items-center px-3 py-2 rounded-lg ${
                isActive("/dashboard/classroom-announcements")
                  ? "bg-[#00A58E] text-white"
                  : "text-gray-700 hover:bg-[#00A58E] hover:text-white"
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
              <div className="flex text-[#BA5D00] items-center">
                <FaBook className="mr-2" />
                Classroom
              </div>
              <FaChevronDown
                className={`text-xs transition-transform ${
                  expandedSections.classroom ? "rotate-180" : ""
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
              <div className="flex text-[#BA5D00] items-center">
                <FaUsers className="mr-2" />
                Communities
              </div>
              <FaChevronDown
                className={`text-xs transition-transform ${
                  expandedSections.communities ? "rotate-180" : ""
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
              <div className="flex text-[#BA5D00] items-center">
                <FaProjectDiagram className="mr-2" />
                Projects
              </div>
              <FaChevronDown
                className={`text-xs transition-transform ${
                  expandedSections.projects ? "rotate-180" : ""
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
              <div className="flex text-[#BA5D00] items-center">
                <FaEnvelope className="mr-2" />
                Direct Messages
              </div>
              <FaChevronDown
                className={`text-xs transition-transform ${
                  expandedSections.messages ? "rotate-180" : ""
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
            onClick={() => {
              setOpen(true);
            }}
            className="flex items-center gap-2 p-2 cursor-pointer text-[#BA5D00] font-semibold hover:bg-[#00A58E] hover:text-white rounded-md transition"
          >
            <span className="font-semibold">+ New Post</span>
          </div>
        </div>
      </div>
      <div>
        <Modal isOpen={open} onClose={() => setOpen(false)}>
          <AddPost onClose={() => setOpen(false)} />
        </Modal>
      </div>
    </>
  );
};

export default Sidebar;
