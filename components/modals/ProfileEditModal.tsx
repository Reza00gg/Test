
import React, { useState, useRef } from 'react';
import type { UserProfile } from '../../types';
import CloseIcon from '../icons/CloseIcon';
import PencilIcon from '../icons/PencilIcon';

interface ProfileEditModalProps {
  user: UserProfile;
  onSave: (user: UserProfile) => void;
  onClose: () => void;
}

const ProfileEditModal: React.FC<ProfileEditModalProps> = ({ user, onSave, onClose }) => {
    const [formData, setFormData] = useState<UserProfile>(user);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData(prev => ({ ...prev, avatar: reader.result as string }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleAvatarClick = () => {
        fileInputRef.current?.click();
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(formData);
    };

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="edit-profile-title">
            <div className="relative bg-slate-200/80 dark:bg-slate-800/80 backdrop-blur-lg border border-black/10 dark:border-white/10 rounded-2xl w-full max-w-md p-6 text-slate-800 dark:text-slate-100 shadow-2xl animate-in fade-in-0 zoom-in-95" onClick={e => e.stopPropagation()}>
                <button onClick={onClose} className="absolute top-4 right-4 text-slate-500 hover:text-black dark:text-slate-400 dark:hover:text-white transition-colors" aria-label="Close">
                    <CloseIcon className="w-6 h-6" />
                </button>
                <h2 id="edit-profile-title" className="text-2xl font-bold mb-6">Edit Profile</h2>

                <form onSubmit={handleSubmit}>
                    <div className="flex justify-center mb-6">
                        <div className="relative">
                            <img src={formData.avatar} alt="Profile Avatar" className="w-28 h-28 rounded-full object-cover border-2 border-white/50" />
                            <button type="button" onClick={handleAvatarClick} className="absolute bottom-0 right-0 bg-sky-500 text-white rounded-full p-2 hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-sky-500 transition-colors" aria-label="Change profile picture">
                                <PencilIcon className="w-5 h-5"/>
                            </button>
                            <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className="hidden" aria-hidden="true" />
                        </div>
                    </div>
                    
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-1">Name</label>
                            <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} className="w-full bg-slate-200/50 dark:bg-black/20 border border-slate-400/50 dark:border-white/20 rounded-lg py-2 px-3 text-slate-800 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500/50 dark:focus:ring-white/50" />
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-1">Email</label>
                            <input type="email" name="email" id="email" value={formData.email} onChange={handleChange} className="w-full bg-slate-200/50 dark:bg-black/20 border border-slate-400/50 dark:border-white/20 rounded-lg py-2 px-3 text-slate-800 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500/50 dark:focus:ring-white/50" />
                        </div>
                    </div>

                    <div className="flex justify-end gap-4 mt-8">
                        <button type="button" onClick={onClose} className="px-4 py-2 rounded-lg bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 transition-colors font-semibold">Cancel</button>
                        <button type="submit" className="px-4 py-2 rounded-lg bg-sky-500 hover:bg-sky-600 text-white font-bold transition-colors">Save Changes</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ProfileEditModal;
