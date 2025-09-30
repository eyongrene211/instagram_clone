// app/[[...rest]]/page.jsx
'use client';

import React, { useState }             from 'react';
import { useScreenSize }               from '@/hooks/useScreenSize';
// import DashboardContents               from '@/components/Content/DashboardContents';
// import SuggestionComponent             from '@/components/SuggestionContainer/SuggestionCoomponent';

import { SignedIn, SignedOut, SignIn } from '@clerk/nextjs';
import DashboardContents               from '@/components/Content/DashboardContents/DashboardContents';
import SuggestionComponent             from '../components/SuggestionComponent/SuggestionComponent';
import MySideBar                       from '../components/MySidebar/MySideBar';

// --- Content Components ---
const DashboardContent = () => <DashboardContents />;
const SettingsContent = () => (
  <div className="p-4">
    <h1 className="text-3xl font-bold mb-6">Explore & Settings View</h1>
    <p className="text-gray-600">This area handles the secondary pages like Search, Messages, and Reels.</p>
  </div>
);
const ReportsContent = () => (
  <div className="p-4">
    <h1 className="text-3xl font-bold mb-6">User Profile Page</h1>
    <p className="text-gray-600">This large view is dedicated to the user's profile and posts.</p>
  </div>
);

// Map page keys to components
const ContentMap = {
  dashboard: <DashboardContent />,
  settings: <SettingsContent />,
  reports: <ReportsContent />,
};

// Menu icon for mobile header
const MenuIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="3" y1="12" x2="21" y2="12"></line>
    <line x1="3" y1="6" x2="21" y2="6"></line>
    <line x1="3" y1="18" x2="21" y2="18"></line>
  </svg>
);

export default function Page() {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const { isMobile } = useScreenSize();
  const isLargePage = currentPage === 'reports';

  return (
    <>
      {/* Render your main app only when user is signed in */}
      {/* <SignedIn> */}
        <div style={{ display: 'flex', minHeight: '100vh', width: '100%' }}>
          {/* Sidebar */}
          <MySideBar
            setCurrentPage={setCurrentPage}
            isMobile={isMobile}
            isMobileOpen={isMobileOpen}
            setIsMobileOpen={setIsMobileOpen}
          />

          {/* Main content area */}
          <div className="flex flex-col flex-grow">
            {/* Mobile header */}
            {isMobile && (
              <div className="p-4 bg-white border-b flex justify-between items-center sticky top-0 z-10">
                <h1 className="text-xl font-semibold">My App</h1>
                <button onClick={() => setIsMobileOpen(true)} aria-label="Open menu">
                  <MenuIcon />
                </button>
              </div>
            )}

            {/* Main + Suggestions */}
            <div className="flex flex-grow overflow-auto">
              <div className={
                isMobile
                  ? 'w-full p-4'
                  : isLargePage
                    ? 'lg:w-full p-4'
                    : 'lg:w-3/4 p-4'
              }>
                {ContentMap[currentPage] || <DashboardContent />}
              </div>

              {/* Right-side suggestion panel */}
              {!isMobile && !isLargePage && (
                <aside className="lg:w-1/4 pl-8 pr-4 pt-8 self-start">
                  <SuggestionComponent />
                </aside>
              )}

            </div>
          </div>
        </div>
      {/* </SignedIn> */}

      {/* Show Clerk SignIn page if not signed in */}
      {/* <SignedOut>
        <SignIn path="/sign-in" routing="hash" afterSignInUrl="/" />
      </SignedOut> */}
    </>
  );
}
