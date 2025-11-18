import React from "react";

const Navbar: React.FC = () => {
  return (
    <header className="w-full h-16 bg-blue-600 text-white flex items-center px-6">
      Navbar
    </header>
  );
};

export default Navbar;










// import React, { useState, ChangeEvent } from "react";
// import { FaBell, FaSearch, FaChevronDown } from "react-icons/fa";
// import { useAuth } from '../context/AuthContext';

// interface User {
//   first_name?: string;
//   last_name?: string;
//   student_id?: string;
// }

// const Navbar: React.FC = () => {
//   const { user } = useAuth() as { user?: User };
//   const [showDropdown, setShowDropdown] = useState<boolean>(false);
//   const [searchQuery, setSearchQuery] = useState<string>("");

//   const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
//     setSearchQuery(e.target.value);
//   };

//   return (
//     <header
//       className="bg-white border-b border-gray-200 h-16 flex items-center px-6 sticky top-0 z-50"
//       data-testid="header"
//     >
//       <div className="min-w-0 flex-1 md:flex md:items-center md:justify-between">
//         <h1 className="text-2xl font-bold text-primary hidden md:block">Future HQ</h1>
//       </div>

//       <div className="ml-12 text-xl font-semibold text-gray-800">
//         General Announcements
//       </div>

//       <div className="flex-1 max-w-2xl mx-auto">
//         <div className="relative">
//           <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
//           <input
//             type="text"
//             placeholder="Search for anything here......."
//             value={searchQuery}
//             onChange={handleSearchChange}
//             data-testid="header-search-input"
//             className="w-full pl-12 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary focus:ring-opacity-20"
//           />
//         </div>
//       </div>

//       <div className="flex items-center space-x-6 ml-6">
//         <button
//           className="relative hover:bg-gray-100 p-2 rounded-full"
//           data-testid="notification-button"
//         >
//           <FaBell className="text-gray-700 text-xl" />
//         </button>

//         <div className="relative">
//           <button
//             onClick={() => setShowDropdown(!showDropdown)}
//             className="flex items-center space-x-2 hover:bg-gray-100 p-2 rounded-lg"
//             data-testid="user-profile-button"
//           >
//             <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-semibold">
//               {user?.first_name?.[0]}
//               {user?.last_name?.[0]}
//             </div>
//             <div className="text-left">
//               <div className="text-sm font-semibold text-gray-800">
//                 {user?.first_name} {user?.last_name}
//               </div>
//               <div className="text-xs text-gray-500">
//                 {user?.student_id || "FL-23432"}
//               </div>
//             </div>
//             <FaChevronDown className="text-gray-500 text-sm" />
//           </button>

//           {showDropdown && (
//             <div
//               className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2"
//               data-testid="user-dropdown-menu"
//             >
//               <button
//                 onClick={() => {
//                   setShowDropdown(false);
//                 }}
//                 className="w-full text-left px-4 py-2 hover:bg-gray-100 text-gray-700"
//               >
//                 Profile
//               </button>
//               <button
//                 onClick={() => {
//                   setShowDropdown(false);
//                 }}
//                 className="w-full text-left px-4 py-2 hover:bg-gray-100 text-gray-700"
//               >
//                 Settings
//               </button>
//               <hr className="my-2" />
//             </div>
//           )}
//         </div>
//       </div>
//     </header>
//   );
// };

// export default Navbar;
