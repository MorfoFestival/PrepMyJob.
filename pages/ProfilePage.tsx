import React, { useState, useEffect } from 'react';
import { translations } from '../constants';
import { useAppContext } from '../context/AppContext';
import type { Language } from '../types';

interface ProfilePageProps {
    language: Language;
}

const InputField: React.FC<{label: string, value: string, name: string, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void}> = ({label, value, name, onChange}) => (
    <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{label}</label>
        <input
            type="text"
            name={name}
            value={value}
            onChange={onChange}
            className="w-full p-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm"
        />
    </div>
);


export const ProfilePage: React.FC<ProfilePageProps> = ({ language }) => {
    const { user, updateUser } = useAppContext();
    const t = translations[language].profilePage;
    
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        targetRole: '',
        industry: '',
    });

    useEffect(() => {
        if (user) {
            setFormData({
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                targetRole: user.targetRole,
                industry: user.industry,
            });
        }
    }, [user]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        updateUser(formData);
        alert('Profile updated!'); // Simple confirmation
    };

    if (!user) {
        return <p>Loading user profile...</p>;
    }

    return (
        <div className="w-full max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8 dark:text-gray-100">{t.title}</h2>

            <form onSubmit={handleSave} className="bg-white dark:bg-gray-800 p-8 rounded-xl border border-gray-200 dark:border-gray-700 shadow-lg space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <InputField label={t.firstName} name="firstName" value={formData.firstName} onChange={handleChange} />
                    <InputField label={t.lastName} name="lastName" value={formData.lastName} onChange={handleChange} />
                </div>
                <InputField label={t.email} name="email" value={formData.email} onChange={handleChange} />
                <InputField label={t.targetRole} name="targetRole" value={formData.targetRole} onChange={handleChange} />
                <InputField label={t.industry} name="industry" value={formData.industry} onChange={handleChange} />

                <div className="border-t border-gray-200 dark:border-gray-700 pt-6 flex flex-col sm:flex-row justify-between gap-4">
                    <button type="submit" className="w-full sm:w-auto px-6 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700">
                        {t.saveButton}
                    </button>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <button type="button" className="text-sm text-gray-600 dark:text-gray-400 hover:underline">{t.changePassword}</button>
                        <button type="button" className="text-sm text-red-600 dark:text-red-400 hover:underline">{t.deleteAccount}</button>
                    </div>
                </div>
            </form>
        </div>
    );
};