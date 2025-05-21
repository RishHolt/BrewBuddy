import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useSidebar } from '../../contexts/SidebarContext';
import { UserCircleIcon, Cog6ToothIcon, ArrowRightOnRectangleIcon, BellIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';

const TopBar = () => {
  const { logout } = useAuth();
  const { isMinimized, toggleSidebar } = useSidebar();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const notificationsRef = useRef<HTMLDivElement>(null);

  // Mock notifications - in a real app, this would come from your backend
  const notifications = [
    { id: 1, message: "New order received", time: "5m ago" },
    { id: 2, message: "Inventory low alert", time: "1h ago" },
    { id: 3, message: "Daily sales report ready", time: "2h ago" },
  ];

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
      if (notificationsRef.current && !notificationsRef.current.contains(event.target as Node)) {
        setIsNotificationsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    setIsDropdownOpen(false);
    logout();
  };

  return (
    <div className="bg-white h-16 pl-3 pr-6 flex items-center justify-between border-b border-gray-200">
      {/* Left side - Sidebar Toggle */}
      <button
        onClick={toggleSidebar}
        className="p-2 rounded-lg text-gray-600 hover:text-accent hover:bg-accent/10 transition-colors"
        title={isMinimized ? "Expand sidebar" : "Collapse sidebar"}
      >
        <Bars3Icon className="h-6 w-6" />
      </button>

      {/* Right side - Notifications and Profile */}
      <div className="flex items-center space-x-4">
        {/* Notifications */}
        <div className="relative" ref={notificationsRef}>
          <button
            onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
            className="relative p-2 rounded-lg text-gray-600 hover:text-accent hover:bg-accent/10 transition-colors"
          >
            <BellIcon className="h-6 w-6" />
            <span className="absolute top-0 right-0 h-4 w-4 text-xs flex items-center justify-center bg-red-500 text-white rounded-full">
              {notifications.length}
            </span>
          </button>

          {/* Notifications Dropdown */}
          {isNotificationsOpen && (
            <div className="absolute right-0 mt-2 w-80 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
              <div className="py-2" role="menu">
                <div className="px-4 py-2 text-sm font-semibold text-gray-700 border-b border-gray-100">
                  Notifications
                </div>
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className="px-4 py-3 hover:bg-accent/10 cursor-pointer"
                  >
                    <p className="text-sm text-gray-700">{notification.message}</p>
                    <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                  </div>
                ))}
                <div className="border-t border-gray-100 px-4 py-2">
                  <button className="text-sm text-accent hover:text-accent-dark w-full text-center">
                    View all notifications
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* User Profile */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center space-x-2 p-2 rounded-lg text-gray-600 hover:text-accent hover:bg-accent/10 transition-colors"
          >
            <UserCircleIcon className="h-6 w-6" />
            <span className="text-sm font-medium">Admin</span>
          </button>

          {/* User Dropdown Menu */}
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
              <div className="py-1" role="menu" aria-orientation="vertical">
                <Link
                  to="/profile"
                  className="flex items-center px-4 py-2 text-sm text-gray-600 hover:text-accent hover:bg-accent/10"
                  role="menuitem"
                  onClick={() => setIsDropdownOpen(false)}
                >
                  <UserCircleIcon className="h-5 w-5 mr-3" />
                  Profile
                </Link>
                <Link
                  to="/settings"
                  className="flex items-center px-4 py-2 text-sm text-gray-600 hover:text-accent hover:bg-accent/10"
                  role="menuitem"
                  onClick={() => setIsDropdownOpen(false)}
                >
                  <Cog6ToothIcon className="h-5 w-5 mr-3" />
                  Settings
                </Link>
                <div className="border-t border-gray-100"></div>
                <button
                  onClick={handleLogout}
                  className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:text-red-700 hover:bg-red-50"
                  role="menuitem"
                >
                  <ArrowRightOnRectangleIcon className="h-5 w-5 mr-3" />
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TopBar; 