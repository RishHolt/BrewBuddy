import React, { useState } from 'react';
import { Cog6ToothIcon, BellIcon, MoonIcon } from '@heroicons/react/24/outline';
import Swal from 'sweetalert2';

const Settings = () => {
  const [settings, setSettings] = useState({
    notifications: {
      email: true,
      push: false,
      orderUpdates: true,
      marketingEmails: false,
    },
    appearance: {
      darkMode: false,
      compactView: true,
    }
  });

  const handleNotificationChange = (key: keyof typeof settings.notifications) => {
    setSettings(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [key]: !prev.notifications[key],
      }
    }));
  };

  const handleAppearanceChange = (key: keyof typeof settings.appearance) => {
    setSettings(prev => ({
      ...prev,
      appearance: {
        ...prev.appearance,
        [key]: !prev.appearance[key],
      }
    }));
  };

  const handleSave = () => {
    // In a real application, you would save these settings to your backend
    Swal.fire({
      icon: 'success',
      title: 'Settings Saved!',
      text: 'Your preferences have been updated successfully',
      showConfirmButton: false,
      timer: 1500,
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <div className="p-2 bg-accent/10 rounded-lg">
          <Cog6ToothIcon className="h-6 w-6 text-accent" />
        </div>
        <h1 className="text-2xl font-bold text-text">Settings</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Notifications Settings */}
        <div className="card bg-white">
          <div className="flex items-center space-x-2 mb-4">
            <BellIcon className="h-5 w-5 text-gray-500" />
            <h2 className="text-lg font-semibold">Notifications</h2>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-gray-700">Email Notifications</label>
              <button
                onClick={() => handleNotificationChange('email')}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  settings.notifications.email ? 'bg-accent' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    settings.notifications.email ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-gray-700">Push Notifications</label>
              <button
                onClick={() => handleNotificationChange('push')}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  settings.notifications.push ? 'bg-accent' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    settings.notifications.push ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-gray-700">Order Updates</label>
              <button
                onClick={() => handleNotificationChange('orderUpdates')}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  settings.notifications.orderUpdates ? 'bg-accent' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    settings.notifications.orderUpdates ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-gray-700">Marketing Emails</label>
              <button
                onClick={() => handleNotificationChange('marketingEmails')}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  settings.notifications.marketingEmails ? 'bg-accent' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    settings.notifications.marketingEmails ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Appearance Settings */}
        <div className="card bg-white">
          <div className="flex items-center space-x-2 mb-4">
            <MoonIcon className="h-5 w-5 text-gray-500" />
            <h2 className="text-lg font-semibold">Appearance</h2>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-gray-700">Dark Mode</label>
              <button
                onClick={() => handleAppearanceChange('darkMode')}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  settings.appearance.darkMode ? 'bg-accent' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    settings.appearance.darkMode ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-gray-700">Compact View</label>
              <button
                onClick={() => handleAppearanceChange('compactView')}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  settings.appearance.compactView ? 'bg-accent' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    settings.appearance.compactView ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button onClick={handleSave} className="btn-primary">
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default Settings; 