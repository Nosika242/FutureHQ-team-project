import { useState } from "react";
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

const Sidebar = ({ isOpen }: { isOpen: boolean }) => {
  const location = useLocation();

  const [open, setOpen] = useState(false);
  const [expandedSections, setExpandedSections] = useState<ExpandedSections>({
    announcements: true,
    classroom: false,
    communities: false,
    projects: false,
    messages: false,
  });

  const toggleSection = (section: keyof ExpandedSections) =>
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));

  const isActive = (path: string) => location.pathname === path;

  return (
    <aside
      className={`
        fixed lg:static top-0 left-0
        w-64 h-full bg-white border-r border-gray-200
        transform transition-transform duration-300
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0
        z-40
      `}
      data-testid="sidebar"
    >
      
      <div className="p-4 pb-0">
        <h1 className="text-2xl font-bold text-[#00A58E] hidden md:block">
          Future HQ
        </h1>
      </div>

      <hr className="my-4 text-gray-200" />

      <div className="p-4">


        <div className="mb-4">
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
          >
            General Announcements
          </Link>

          <Link
            to="/dashboard/classroom-announcements"
            className={`flex cursor-not-allowed items-center px-3 py-2 rounded-lg ${
              isActive("/dashboard/classroom-announcements")
                ? "bg-[#00A58E] text-white"
                : "text-gray-700 hover:bg-[#00A58E] hover:text-white"
            }`}
          >
            Classroom Announcements
          </Link>
        </div>


        <div className="mb-2">
          <button
            onClick={() => toggleSection("classroom")}
            className="flex items-center justify-between w-full px-3 py-2 text-left text-sm font-semibold text-[#BA5D00] hover:bg-gray-50 rounded"
          >
            <span className="flex items-center">
              <FaBook className="mr-2" /> Classroom
            </span>
            <FaChevronDown
              className={`text-xs text-[#4F5E71] transition-transform ${
                expandedSections.classroom ? "rotate-180" : ""
              }`}
            />
          </button>

          {expandedSections.classroom && (
            <div className="ml-4 mt-1 space-y-1">
              {[
                { to: "/dashboard/course-outlines", label: "Course Outlines" },
                { to: "/dashboard/class-schedule", label: "Class Schedule" },
                { to: "/dashboard/assignments", label: "Assignments" },
                { to: "/dashboard/my-grades", label: "My Grades" },
                { to: "/dashboard/class-resources", label: "Class Resources" },
              ].map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className="block cursor-not-allowed px-3 py-2 text-sm hover:bg-gray-100 rounded text-gray-700"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          )}
        </div>


        <div className="mb-2">
          <button
            onClick={() => toggleSection("communities")}
            className="flex items-center justify-between w-full px-3 py-2 text-left text-sm font-semibold text-[#BA5D00] hover:bg-gray-50 rounded"
          >
            <span className="flex items-center">
              <FaUsers className="mr-2" /> Communities
            </span>
            <FaChevronDown
              className={`text-xs text-[#4F5E71] transition-transform ${
                expandedSections.communities ? "rotate-180" : ""
              }`}
            />
          </button>

          {expandedSections.communities && (
            <div className="ml-4 mt-1 space-y-1">
              <Link
                to="/dashboard/futurelabs-hq"
                className="flex cursor-not-allowed items-center justify-between px-3 py-2 text-sm hover:bg-gray-100 rounded text-gray-700"
              >
                <span>FutureLabs HQ</span>
                <span className="text-xs bg-primary text-white px-2 py-0.5 rounded-full">
                  +10
                </span>
              </Link>

              <Link
                to="/dashboard/design-2023"
                className="block cursor-not-allowed px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded"
              >
                Design 2023
              </Link>

              <button className="flex cursor-not-allowed items-center px-3 py-2 text-sm hover:bg-gray-100 rounded text-gray-700">
                <FaPlus className="mr-2 text-xs" /> Create a Community
              </button>
            </div>
          )}
        </div>


        <div className="mb-2">
          <button
            onClick={() => toggleSection("projects")}
            className="flex items-center justify-between w-full px-3 py-2 text-left text-sm font-semibold text-[#BA5D00] hover:bg-gray-50 rounded"
          >
            <span className="flex items-center">
              <FaProjectDiagram className="mr-2" /> Projects
            </span>
            <FaChevronDown
              className={`text-xs text-[#4F5E71] transition-transform ${
                expandedSections.projects ? "rotate-180" : ""
              }`}
            />
          </button>

          {expandedSections.projects && (
            <div className="ml-4 mt-1 space-y-1">
              <Link
                to="/dashboard/my-projects"
                className="block cursor-not-allowed px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded"
              >
                My Projects
              </Link>

              <button className="flex cursor-not-allowed items-center px-3 py-2 text-sm hover:bg-gray-100 rounded text-gray-700">
                <FaPlus className="mr-2 text-xs" /> Create a Project
              </button>
            </div>
          )}
        </div>


        <div className="mb-2">
          <button
            onClick={() => toggleSection("messages")}
            className="flex items-center justify-between w-full px-3 py-2 text-left text-sm font-semibold text-[#BA5D00] hover:bg-gray-50 rounded"
          >
            <span className="flex items-center">
              <FaEnvelope className="mr-2" /> Direct Messages
            </span>
            <FaChevronDown
              className={`text-xs text-[#4F5E71] transition-transform ${
                expandedSections.messages ? "rotate-180" : ""
              }`}
            />
          </button>

          {expandedSections.messages && (
            <div className="ml-4 mt-1 space-y-1">
              {[1, 2, 3].map((i) => (
                <button
                  key={i}
                  className="flex cursor-not-allowed items-center w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded"
                >
                  <div className="w-6 h-6 bg-primary rounded-full mr-2"></div>
                  <div className="flex-1 text-left">
                    <div className="text-sm">Olivia Rhye</div>
                    <div className="w-2 h-2 bg-green-500 rounded-full inline-block"></div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>


        <button
          onClick={() => setOpen(true)}
          className="flex items-center gap-2 p-2 text-[#BA5D00] font-semibold hover:bg-[#00A58E] hover:text-white rounded-md transition w-full"
        >
          + New Post
        </button>
      </div>

      <Modal isOpen={open} onClose={() => setOpen(false)}>
        <AddPost onClose={() => setOpen(false)} />
      </Modal>
    </aside>
  );
};

export default Sidebar;
