'use client';

import { useState, useEffect } from 'react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import ResponsiveContainer from '@/components/ui/ResponsiveContainer';

export default function SettingsPage() {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [emailFrequency, setEmailFrequency] = useState('daily');
  const [saved, setSaved] = useState(false);

  // Load dark mode preference from localStorage
  useEffect(() => {
    const savedMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(savedMode);
    if (savedMode) document.documentElement.classList.add('dark');
  }, []);

  // Apply dark mode and save preference
  useEffect(() => {
    localStorage.setItem('darkMode', darkMode.toString());
    if (darkMode) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  }, [darkMode]);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100">Settings</h1>

      <ResponsiveContainer>
        {/* Appearance Card */}
        <Card className="mb-6 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Appearance</h2>
          <div className="flex items-center justify-between mb-4">
            <span>Dark Mode</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={darkMode}
                onChange={() => setDarkMode(!darkMode)}
              />
              <div className="w-11 h-6 bg-gray-200 dark:bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </Card>

        {/* Notifications Card */}
        <Card className="mb-6 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Notifications</h2>
          <div className="flex items-center justify-between mb-4">
            <span>Enable Notifications</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={notifications}
                onChange={() => setNotifications(!notifications)}
              />
              <div className="w-11 h-6 bg-gray-200 dark:bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>

          {notifications && (
            <div className="mb-4">
              <label className="block mb-2">Email Frequency</label>
              <select
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                value={emailFrequency}
                onChange={(e) => setEmailFrequency(e.target.value)}
              >
                <option value="daily">Daily Digest</option>
                <option value="weekly">Weekly Summary</option>
                <option value="important">Important Updates Only</option>
                <option value="none">No Emails</option>
              </select>
            </div>
          )}
        </Card>

        {/* Account Info Card */}
        <Card className="mb-6 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Account Information</h2>
          <div className="mb-4">
            <label className="block mb-2">Email Address</label>
            <input
              type="email"
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              defaultValue="user@example.com"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Full Name</label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              defaultValue="user"
            />
          </div>
        </Card>

        {/* Save Button */}
        <div className="flex justify-end">
          <Button
            onClick={handleSave}
            className="px-6 bg-blue-500 text-white dark:bg-blue-600 dark:text-white"
          >
            {saved ? 'Saved!' : 'Save Changes'}
          </Button>
        </div>
      </ResponsiveContainer>
    </div>
  );
}
