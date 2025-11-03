import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-primary-500 text-white py-6 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-4 text-sm">
          <span>© Logo, Inc. 2024</span>
          <span className="hidden sm:inline">|</span>
          <Link to="#" className="hover:underline">
            Privacy
          </Link>
          <span className="hidden sm:inline">|</span>
          <Link to="#" className="hover:underline">
            Terms and Conditions
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
