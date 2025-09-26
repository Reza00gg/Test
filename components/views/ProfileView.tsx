
import React, { useState, useEffect } from 'react';
import type { UserProfile } from '../../types';
import ThemeToggle from '../ThemeToggle';
import ProfileEditModal from '../modals/ProfileEditModal';

const ProfileView: React.FC = () => {
  const [user, setUser] = useState<UserProfile>(() => {
    try {
      const savedUser = localStorage.getItem('userProfile');
      return savedUser
        ? JSON.parse(savedUser)
        : {
            name: 'Alex Doe',
            email: 'alex.doe@example.com',
            avatar: 'https://picsum.photos/100/100',
          };
    } catch (error) {
      console.error("Failed to parse user profile from localStorage", error);
      return {
            name: 'Alex Doe',
            email: 'alex.doe@example.com',
            avatar: 'https://picsum.photos/100/100',
          };
    }
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('userProfile', JSON.stringify(user));
  }, [user]);

  const handleSave = (updatedUser: UserProfile) => {
    setUser(updatedUser);
    setIsModalOpen(false);
  };

  return (
    <div className="p-4 md:p-6 text-slate-900 dark:text-slate-100">
      <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Profile</h1>
      <div className="mt-6 p-6 bg-white/40 dark:bg-white/5 backdrop-blur-lg rounded-2xl border border-black/10 dark:border-white/10 flex flex-col items-center">
        <img
          src={user.avatar}
          alt="Profile"
          className="w-24 h-24 rounded-full object-cover border-2 border-white/50 shadow-lg"
        />
        <h2 className="text-2xl font-semibold mt-4">{user.name}</h2>
        <p className="text-slate-500 dark:text-slate-400">{user.email}</p>
        <button
          onClick={() => setIsModalOpen(true)}
          className="mt-6 bg-sky-500/30 hover:bg-sky-500/50 border border-sky-400/50 text-white font-bold py-2 px-6 rounded-lg transition-all duration-300"
        >
          Edit Profile
        </button>
      </div>
      <ThemeToggle />
      {isModalOpen && (
        <ProfileEditModal
          user={user}
          onSave={handleSave}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};

export default ProfileView;