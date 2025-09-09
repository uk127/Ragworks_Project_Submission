'use client';

import { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import ResponsiveContainer from '@/components/ui/ResponsiveContainer';


type User = {
  name: string;
  email: string;
  role: string;
  avatar: string;
  bio: string;
  location: string;
  joinDate: string;
};

type FormData = {
  name: string;
  email: string;
  bio: string;
  location: string;
};
export default function ProfilePage() {
  const [user, setUser] = useState({
    name: 'Eg',
    email: 'Eg.doe@example.com',
    role: 'Admin',
    avatar: 'https://placehold.co/400x400',
    bio: 'E-commerce specialist with 5+ years of experience in online retail management.',
    location: 'New York, USA',
    joinDate: 'January 2022'
  });

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    bio: user.bio,
    location: user.location
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  // ✅ TypeScript typing for form submit event
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setUser(prev => ({
      ...prev,
      ...formData,
    }));
    setIsEditing(false);
};
  return (
    <DashboardLayout>
      <ResponsiveContainer>
        <div className="flex flex-col md:flex-row gap-6">
          {/* Profile Summary Card */}
          <div className="w-full md:w-1/3">
            <Card className="p-6">
              <div className="flex flex-col items-center text-center">
                <div className="w-32 h-32 rounded-full overflow-hidden mb-4">
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h2 className="text-xl font-bold">{user.name}</h2>
                <p className="text-gray-600">{user.role}</p>
                <p className="text-sm text-gray-500 mt-1">{user.location}</p>
                <p className="text-sm text-gray-500">Member since {user.joinDate}</p>

                <div className="mt-6 w-full">
                  <Button
                    variant="outline"
                    fullWidth
                    onClick={() => setIsEditing(true)}
                  >
                    Edit Profile
                  </Button>
                </div>
              </div>
            </Card>
          </div>

          {/* Profile Details Card */}
          <div className="w-full md:w-2/3">
            <Card className="p-6">
              {isEditing ? (
                <form onSubmit={handleSubmit}>
                  <h2 className="text-xl font-bold mb-4">Edit Profile</h2>

                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                    <textarea
                      name="bio"
                      value={formData.bio}
                      onChange={handleChange}
                      rows={4}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                  </div>

                  <div className="flex gap-2">
                    <Button variant="primary" type="submit">
                      Save Changes
                    </Button>
                    <Button
                      variant="outline"
                      type="button"
                      onClick={() => {
                        setIsEditing(false);
                        setFormData({
                          name: user.name,
                          email: user.email,
                          bio: user.bio,
                          location: user.location
                        });
                      }}
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              ) : (
                <>
                  <h2 className="text-xl font-bold mb-4">Profile Information</h2>

                  <div className="mb-6">
                    <h3 className="text-sm font-medium text-gray-500">Bio</h3>
                    <p className="mt-1">{user.bio}</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Email</h3>
                      <p className="mt-1">{user.email}</p>
                    </div>

                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Role</h3>
                      <p className="mt-1">{user.role}</p>
                    </div>

                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Location</h3>
                      <p className="mt-1">{user.location}</p>
                    </div>

                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Member Since</h3>
                      <p className="mt-1">{user.joinDate}</p>
                    </div>
                  </div>
                </>
              )}
            </Card>

            <Card className="p-6 mt-6">
              <h2 className="text-xl font-bold mb-4">Account Security</h2>

              <div className="space-y-4">
                <div>
                  <Button variant="outline">
                    Change Password
                  </Button>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Two-Factor Authentication</h3>
                  <div className="flex items-center">
                    <span className="mr-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                      Disabled
                    </span>
                    <Button variant="secondary" size="sm">
                      Enable 2FA
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </ResponsiveContainer>
    </DashboardLayout>
  );
}