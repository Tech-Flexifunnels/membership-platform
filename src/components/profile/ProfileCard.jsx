import React from 'react';
import { User } from 'lucide-react';
import Card from '../common/Card';

const ProfileCard = ({ user }) => {
  return (
    <Card hover={false} className="p-6">
      <div className="flex items-center space-x-3 mb-6">
        <User className="w-6 h-6 text-primary-500" />
        <h2 className="text-xl font-semibold text-gray-900">My Profile</h2>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Full Name
          </label>
          <p className="text-base text-gray-900">{user?.name || 'N/A'}</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email Address
          </label>
          <p className="text-base text-primary-600">{user?.email || 'N/A'}</p>
        </div>
      </div>
    </Card>
  );
};

export default ProfileCard;
