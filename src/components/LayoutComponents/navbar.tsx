import { useState } from "react";
import { FaBell, FaSearch, FaChevronDown, FaBars } from "react-icons/fa";
import usePostContext from "../../hooks/usePostContext";

const Navbar = ({ onMenuClick }: { onMenuClick: () => void }) => {
  const [showDropdown, setShowDropdown] = useState(false);
   const { searchQuery, setSearchQueryState } = usePostContext();

  return (
    <header className="bg-white border-b border-gray-200 h-16 flex items-center px-6 sticky top-0 z-50">


      <button className="lg:hidden mr-4" aria-label="Toggle" onClick={onMenuClick}>
        <FaBars className="text-xl" />
      </button>


      <div className="ml-12 me-4 text-xl font-semibold text-gray-800">
        General Announcements
      </div>


      <div className="flex-1 max-w-2xl mx-auto">
        <div className="relative">
          <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search for anything here..."
            value={searchQuery}
            onChange={(e) => setSearchQueryState(e.target.value)}
            className="w-full pl-12 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none"
          />
        </div>
      </div>


      <div className="flex items-center space-x-6 ml-6">
        <button className="relative hover:bg-gray-100 p-2 rounded-full" aria-label="Notification">
          <FaBell className="text-gray-700 text-xl" />
        </button>


        <div className="relative">
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="flex items-center space-x-2 hover:bg-gray-100 p-2 rounded-lg"
          >
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-semibold">
              JF
            </div>
            <div className="text-left">
              <div className="text-sm font-semibold text-gray-800">
                Joseph Francis
              </div>
              <div className="text-xs text-gray-500">FL-23432</div>
            </div>
            <FaChevronDown className="text-gray-500 text-sm" />
          </button>

          {showDropdown && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2">
              <button className="w-full text-left px-4 py-2 hover:bg-gray-100 text-gray-700">
                Profile
              </button>
              <button className="w-full text-left px-4 py-2 hover:bg-gray-100 text-gray-700">
                Settings
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
