import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ChevronRight } from 'lucide-react';
import { useAuth } from '../context/AuthProvider';
import ProfileCard from '../components/profile/ProfileCard';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';

const Profile = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center space-x-2 text-sm">
            <Badge variant="pink" className="px-3 py-1">
              <Link to="/dashboard" className="flex items-center space-x-1">
                <Home className="w-3 h-3" />
                <span>Home</span>
              </Link>
            </Badge>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <span className="text-gray-700 font-medium">Profile</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
          <Button variant="primary">
            Edit Profile
          </Button>
        </div>

        <ProfileCard user={user} />
      </div>
    </div>
  );
};

export default Profile;
