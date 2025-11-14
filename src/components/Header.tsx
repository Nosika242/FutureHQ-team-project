import React, { useState } from 'react';
import { 
  HiOutlineSearch, 
  HiOutlineBell, 
  HiOutlineMenu,
  HiUserCircle
} from 'react-icons/hi';
import type { User, HeaderProps, Notification } from '../types';

const Header: React.FC<HeaderProps> = ({ 
  user, 
  onSearch, 
  onNotificationClick, 
  onProfileClick, 
  onLogout,
  notifications = [],
  unreadCount = 0,
  className = '',
  ...props 
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);

  const handleSearch = (e: React.FormEvent): void => {
    e.preventDefault();
    if (searchQuery.trim() && onSearch) {
      onSearch(searchQuery.trim());
    }
  };

  const handleNotificationClick = (): void => {
    setShowNotifications(!showNotifications);
    if (onNotificationClick) {
      onNotificationClick();
    }
  };

  const handleProfileClick = (): void => {
    if (onProfileClick) {
      onProfileClick();
    }
  };

  const handleLogout = (): void => {
    if (onLogout) {
      onLogout();
    }
  };

  const getUserDisplayName = (user: User): string => {
    if (user.first_name && user.last_name) {
      return `${user.first_name} ${user.last_name}`;
    }
    return user.username;
  };

  const getUserInitials = (user: User): string => {
    if (user.first_name && user.last_name) {
      return `${user.first_name.charAt(0)}${user.last_name.charAt(0)}`;
    }
    return user.username.charAt(0).toUpperCase();
  };

  return (
    <header className={`bg-white border-b border-gray-200 px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between relative z-30 ${className}`} {...props}>
      {/* Left Section */}
      <div className="flex items-center space-x-4">
        {/* Mobile Menu Button */}
        <button
          onClick={handleProfileClick}
          className="lg:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500"
        >
          <HiOutlineMenu className="h-6 w-6" />
        </button>

        {/* Logo */}
        <div className="flex items-center cursor-pointer" onClick={handleProfileClick}>
          <h1 className="text-2xl font-bold text-primary-500">
            Future HQ
          </h1>
        </div>
      </div>

      {/* Center Section - Search */}
      <div className="flex-1 max-w-lg mx-8">
        <form onSubmit={handleSearch} className="relative">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <HiOutlineSearch className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-transparent rounded-lg bg-neutral-50 leading-5 text-gray-900 placeholder-gray-500 focus:outline-none focus:bg-white focus:border-primary-500 focus:ring-2 focus:ring-primary-500 focus:ring-opacity-50 sm:text-sm transition-all duration-200"
              placeholder="Search for anything here..."
              aria-label="Search"
            />
          </div>
        </form>
      </div>

      {/* Right Section */}
      <div className="flex items-center space-x-4">
        {/* Notifications */}
        <div className="relative">
          <button
            onClick={handleNotificationClick}
            className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors relative"
            aria-label={`Notifications ${unreadCount > 0 ? `(${unreadCount} unread)` : ''}`}
          >
            <HiOutlineBell className="h-6 w-6" />
            {/* Notification Badge */}
            {unreadCount > 0 && (
              <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-error-500 ring-2 ring-white" />
            )}
          </button>
          
          {/* Notifications Dropdown */}
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
              <div className="p-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-gray-900">Notifications</h3>
                  {unreadCount > 0 && (
                    <span className="text-xs bg-primary-100 text-primary-700 px-2 py-1 rounded-full">
                      {unreadCount} new
                    </span>
                  )}
                </div>
              </div>
              
              <div className="max-h-96 overflow-y-auto">
                {notifications.length > 0 ? (
                  <div className="p-2">
                    {notifications.slice(0, 5).map((notification: Notification) => (
                      <div
                        key={notification.id}
                        className={`p-3 rounded-lg mb-2 cursor-pointer hover:bg-gray-50 transition-colors ${
                          !notification.is_read ? 'bg-blue-50 border-l-4 border-primary-500' : ''
                        }`}
                      >
                        <div className="flex items-start space-x-3">
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900">
                              {notification.title}
                            </p>
                            <p className="text-sm text-gray-600 mt-1">
                              {notification.message}
                            </p>
                            <p className="text-xs text-gray-400 mt-1">
                              {new Date(notification.created_at).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-4 text-center text-sm text-gray-600">
                    No new notifications
                  </div>
                )}
              </div>
              
              {notifications.length > 5 && (
                <div className="p-4 border-t border-gray-200 text-center">
                  <button className="text-sm text-primary-600 hover:text-primary-700 font-medium">
                    View all notifications
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* User Profile */}
        <div className="flex items-center space-x-3">
          {user ? (
            <div 
              className="flex items-center space-x-3 cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors"
              onClick={handleProfileClick}
            >
              {user.profile?.avatar ? (
                <img
                  src={user.profile.avatar}
                  alt={getUserDisplayName(user)}
                  className="h-8 w-8 rounded-full object-cover"
                />
              ) : (
                <div className="h-8 w-8 rounded-full bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center text-white font-medium text-sm">
                  {getUserInitials(user)}
                </div>
              )}
              
              <div className="hidden md:block">
                <div className="text-sm font-medium text-gray-900">
                  {getUserDisplayName(user)}
                </div>
                <div className="text-xs text-gray-500">
                  FL-{user.id}
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center space-x-3">
              <HiUserCircle className="h-8 w-8 text-gray-600" />
              <button 
                onClick={handleProfileClick}
                className="text-sm text-primary-600 hover:text-primary-700 font-medium"
              >
                Sign in
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;