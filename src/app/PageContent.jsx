'use client';
import React, { useState } from 'react';
import { useScreenSize }   from '@/hooks/useScreenSize';
import DashboardContents   from '@/components/Content/DashboardContents/DashboardContents';
import SuggestionComponent from '@/components/SuggestionComponent/SuggestionComponent';
import SettingsContents    from '@/components/Content/SettingsContents/SettingsContents';
import MySideBar           from '@/components/MySidebar/MySideBar';
import { FaInstagram }     from 'react-icons/fa';
import { useTheme }        from '@/components/context/ThemeContext';

export default function PageContent() {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [settingsTab, setSettingsTab] = useState('general');
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const { isMobile } = useScreenSize();
  const { isDark } = useTheme();

  const DashboardContent = () => <DashboardContents />;

  const ContentMap = {
    dashboard: <DashboardContent />,
    settings: (
      <SettingsContents
        settingsTab={settingsTab}
        setSettingsTab={setSettingsTab}
      />
    ),
    reports: (
      <div className="p-4">
        <h1 className="text-3xl font-bold mb-6">User Profile Page</h1>
        <p className="text-gray-600 dark:text-gray-300">
          This large view is dedicated to the user's profile and posts.
        </p>
      </div>
    ),
  };

  const MenuIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="3" y1="12" x2="21" y2="12"></line>
      <line x1="3" y1="6" x2="21" y2="6"></line>
      <line x1="3" y1="18" x2="21" y2="18"></line>
    </svg>
  );

  return (
    <div
      className={`flex min-h-screen w-full ${
        isDark ? 'bg-zinc-900 text-white' : 'bg-gray-100 text-black'
      }`}
    >
      <MySideBar
        setCurrentPage={setCurrentPage}
        setSettingsTab={setSettingsTab}
        isMobile={isMobile}
        isMobileOpen={isMobileOpen}
        setIsMobileOpen={setIsMobileOpen}
      />

      <div className="flex flex-col flex-grow">
        {isMobile && (
          <div className="p-4 bg-white dark:bg-black border-b flex justify-between items-center sticky top-0 z-10">
            <h1 className="text-xl font-semibold flex items-center gap-2">
              <FaInstagram />
              Instagram
            </h1>
            <button onClick={() => setIsMobileOpen(true)} aria-label="Open menu">
              <MenuIcon />
            </button>
          </div>
        )}

        <div className="w-full flex flex-grow">
          <div
            className={
              isMobile ? 'p-4 overflow-auto' : 'lg:w-3/4 p-4 overflow-auto'
            }
          >
            {ContentMap[currentPage] || <DashboardContent />}
          </div>

          {!isMobile && currentPage !== 'reports' && (
            <aside className="lg:w-1/4 pl-8 pr-4 pt-8">
              <div className="sticky top-6">
                <SuggestionComponent />
              </div>
            </aside>
          )}
        </div>
      </div>
    </div>
  );
}
