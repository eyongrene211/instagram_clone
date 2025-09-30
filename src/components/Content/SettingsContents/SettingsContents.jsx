'use client';

import React                    from 'react';
import { FiSettings }           from 'react-icons/fi';
import { AiOutlineClockCircle } from 'react-icons/ai';
import { BsBookmark }           from 'react-icons/bs';
import { MdOutlineDarkMode }    from 'react-icons/md';
import { useTheme }             from '@/components/context/ThemeContext';
// import { useTheme }             from '../context/ThemeContext';

export default function SettingsContents({ settingsTab, setSettingsTab }) {
  const { isDark } = useTheme();

  const tabs = [
    { key: 'general', label: 'Settings', icon: <FiSettings size={18} /> },
    { key: 'activity', label: 'Your activity', icon: <AiOutlineClockCircle size={18} /> },
    { key: 'saved', label: 'Saved', icon: <BsBookmark size={18} /> },
    { key: 'display', label: 'Change display', icon: <MdOutlineDarkMode size={18} /> },
  ];

  return (
    <div className="lg:flex gap-6 p-4 w-full">
      {/* Left column: Tabs */}
      <nav className={`w-full lg:w-64 border rounded p-3 ${isDark ? 'bg-[#0D0D0EFF] border-[#3f3f46]' : 'bg-white border-gray-200'}`}>
        <ul className="space-y-2">
          {tabs.map(t => (
            <li key={t.key}>
              <button
                onClick={() => setSettingsTab(t.key)}
                className={`flex items-center gap-3 w-full text-left px-3 py-2 rounded
                  ${settingsTab === t.key
                    ? isDark ? 'bg-[#1c1c1e] font-medium text-white' : 'bg-gray-100 font-medium text-black'
                    : isDark ? 'hover:bg-[#1c1c1e] text-white' : 'hover:bg-gray-50 text-black'}`
                }
              >
                {t.icon}
                <span className="text-sm">{t.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Right column: Content */}
      <section className={`flex-1 border rounded p-6 ${isDark ? 'bg-[#0D0D0EFF] border-[#3f3f46] text-white' : 'bg-white border-gray-200 text-black'}`}>
        {settingsTab === 'general' && (
          <>
            <h2 className="text-xl font-semibold mb-2">Settings</h2>
            <p className="text-sm text-gray-400">
              Update account preferences, privacy, and other settings here.
            </p>
          </>
        )}
        {settingsTab === 'activity' && (
          <>
            <h2 className="text-xl font-semibold mb-2">Your activity</h2>
            <p className="text-sm text-gray-400">
              See your recent activity, downloads, and interactions.
            </p>
          </>
        )}
        {settingsTab === 'saved' && (
          <>
            <h2 className="text-xl font-semibold mb-2">Saved</h2>
            <p className="text-sm text-gray-400">
              Your saved posts will appear here.
            </p>
          </>
        )}
        {settingsTab === 'display' && (
          <>
            <h2 className="text-xl font-semibold mb-2">Change display</h2>
            <p className="text-sm text-gray-400">
              Toggle your appearance settings (dark / light).
            </p>
          </>
        )}
      </section>
    </div>
  );
}
