import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Home, User, Key, Gift, Ticket, LogOut, ChevronDown, BookOpen } from 'lucide-react';
import { Menu, Transition } from '@headlessui/react';
import { useAuth } from '../../hooks/useAuth';

const Header = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const userMenuItems = [
    { icon: User, label: 'My Profile', href: '/profile', color: 'bg-primary-500' },
    { icon: Key, label: 'Change Password', href: '/change-password', color: 'bg-pink-500' },
    { icon: Gift, label: 'My Plan', href: '/my-plan', color: 'bg-purple-500' },
    { icon: Ticket, label: 'Invite Code', href: '#', color: 'bg-orange-500' },
    { icon: LogOut, label: 'Logout', onClick: handleLogout, color: 'bg-red-500' },
  ];

  return (
    <header className="bg-white shadow-sm sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Home */}
          <div className="flex items-center space-x-4">
            <Link to="/dashboard" className="flex items-center">
              <div className="bg-white border-2 border-green-400 rounded-lg px-6 py-2">
                <span className="text-2xl font-bold text-primary-500" style={{ fontFamily: 'cursive' }}>
                  Logo
                </span>
              </div>
            </Link>
            <Link
              to="/dashboard"
              className="flex items-center space-x-2 bg-yellow-400 hover:bg-yellow-500 px-4 py-2 rounded-lg transition-colors"
            >
              <Home className="w-5 h-5 text-white" />
              <span className="text-white font-medium hidden sm:inline">Home</span>
            </Link>
            <Link
              to="/my-learning"
              className="flex items-center space-x-2 bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg transition-colors"
            >
              <BookOpen className="w-5 h-5 text-white" />
              <span className="text-white font-medium hidden sm:inline">My Learning</span>
            </Link>
          </div>

          {/* Search and User Menu */}
          <div className="flex items-center space-x-4">
            {/* Search Bar */}
            <div className="relative hidden md:block">
              <div className="flex items-center">
                <button className="bg-navy text-white p-2 rounded-l-full hover:bg-navy-light transition-colors">
                  <ChevronDown className="w-5 h-5" />
                </button>
                <input
                  type="text"
                  placeholder="Search by lesson name"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-64 px-4 py-2 border-t border-b border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
                <button className="bg-primary-500 text-white p-2 rounded-r-full hover:bg-primary-600 transition-colors">
                  <Search className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* User Menu */}
            <Menu as="div" className="relative">
              <Menu.Button className="flex items-center space-x-2 focus:outline-none">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center text-white font-semibold">
                  {user?.name?.charAt(0).toUpperCase() || 'U'}
                </div>
              </Menu.Button>
              <Transition
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right bg-white rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none overflow-hidden">
                  {userMenuItems.map((item, index) => (
                    <Menu.Item key={index}>
                      {({ active }) => (
                        item.onClick ? (
                          <button
                            onClick={item.onClick}
                            className={`${
                              active ? 'bg-gray-50' : ''
                            } flex items-center w-full px-4 py-3 text-sm text-gray-700 border-b border-gray-100 last:border-b-0`}
                          >
                            <div className={`${item.color} p-2 rounded-lg mr-3`}>
                              <item.icon className="w-4 h-4 text-white" />
                            </div>
                            {item.label}
                          </button>
                        ) : (
                          <Link
                            to={item.href}
                            className={`${
                              active ? 'bg-gray-50' : ''
                            } flex items-center w-full px-4 py-3 text-sm text-gray-700 border-b border-gray-100 last:border-b-0`}
                          >
                            <div className={`${item.color} p-2 rounded-lg mr-3`}>
                              <item.icon className="w-4 h-4 text-white" />
                            </div>
                            {item.label}
                          </Link>
                        )
                      )}
                    </Menu.Item>
                  ))}
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
