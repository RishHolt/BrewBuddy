import React from 'react';
import { 
  UserCircleIcon, 
  EnvelopeIcon, 
  PhoneIcon, 
  CalendarIcon,
  KeyIcon,
  BellIcon,
  ShieldCheckIcon
} from '@heroicons/react/24/outline';

const Profile = () => {
  // This would come from your auth context or API in a real application
  const userProfile = {
    name: 'Admin User',
    email: 'admin@brewbuddy.com',
    phone: '+1 234 567 8900',
    role: 'Admin',
    joinDate: '2024-01-01',
    lastActive: '2024-03-21',
    lastPasswordChange: '2024-02-15',
    twoFactorEnabled: true,
    notificationsEnabled: true
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <div className="p-2 bg-accent/10 rounded-lg">
            <UserCircleIcon className="h-6 w-6 text-accent" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-text">My Profile</h1>
            <p className="text-sm text-gray-500">Manage your account settings and preferences</p>
          </div>
        </div>
        <span className="inline-flex px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800">
          {userProfile.role}
        </span>
      </div>

      {/* Profile Information Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Basic Information */}
        <div className="card bg-white lg:col-span-2">
          <div className="flex items-center space-x-3 mb-6">
            <UserCircleIcon className="h-5 w-5 text-gray-400" />
            <h2 className="text-lg font-semibold text-text">Basic Information</h2>
          </div>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-500">Full Name</label>
              <p className="mt-1 text-text font-medium">{userProfile.name}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500">Email</label>
              <div className="mt-1 flex items-center space-x-2">
                <EnvelopeIcon className="h-5 w-5 text-gray-400" />
                <p className="text-text">{userProfile.email}</p>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500">Phone</label>
              <div className="mt-1 flex items-center space-x-2">
                <PhoneIcon className="h-5 w-5 text-gray-400" />
                <p className="text-text">{userProfile.phone}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Account Status */}
        <div className="space-y-6">
          <div className="card bg-white">
            <div className="flex items-center space-x-3 mb-6">
              <ShieldCheckIcon className="h-5 w-5 text-gray-400" />
              <h2 className="text-lg font-semibold text-text">Account Status</h2>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-500">Last Active</label>
                <div className="mt-1 flex items-center space-x-2">
                  <CalendarIcon className="h-5 w-5 text-gray-400" />
                  <p className="text-text">{userProfile.lastActive}</p>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500">Join Date</label>
                <div className="mt-1 flex items-center space-x-2">
                  <CalendarIcon className="h-5 w-5 text-gray-400" />
                  <p className="text-text">{userProfile.joinDate}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Security Settings */}
          <div className="card bg-white">
            <div className="flex items-center space-x-3 mb-6">
              <KeyIcon className="h-5 w-5 text-gray-400" />
              <h2 className="text-lg font-semibold text-text">Security</h2>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-500">Last Password Change</label>
                <div className="mt-1 flex items-center space-x-2">
                  <CalendarIcon className="h-5 w-5 text-gray-400" />
                  <p className="text-text">{userProfile.lastPasswordChange}</p>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500">Two-Factor Authentication</label>
                <div className="mt-1 flex items-center justify-between">
                  <span className="text-sm text-gray-700">
                    {userProfile.twoFactorEnabled ? 'Enabled' : 'Disabled'}
                  </span>
                  <button
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      userProfile.twoFactorEnabled ? 'bg-accent' : 'bg-gray-200'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        userProfile.twoFactorEnabled ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500">Notifications</label>
                <div className="mt-1 flex items-center justify-between">
                  <span className="text-sm text-gray-700">
                    {userProfile.notificationsEnabled ? 'Enabled' : 'Disabled'}
                  </span>
                  <button
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      userProfile.notificationsEnabled ? 'bg-accent' : 'bg-gray-200'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        userProfile.notificationsEnabled ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile; 