'use client';

import React, { useState, useRef, useEffect }     from 'react';
import { Sidebar, Menu, MenuItem, useProSidebar } from 'react-pro-sidebar';
import { useClerk, useUser }                      from '@clerk/nextjs';

// Icons
import { FaInstagram }                            from 'react-icons/fa';
import { BiMoviePlay }                            from 'react-icons/bi';
import { MdOutlineExplore, MdOutlineDarkMode }    from 'react-icons/md';
import { GoHomeFill }                             from 'react-icons/go';
import { BsChatText, BsBookmark }                 from 'react-icons/bs';
import { CiHeart, CiSquarePlus, CiSearch }        from 'react-icons/ci';
import { RxHamburgerMenu }                        from 'react-icons/rx';
import { FiSettings, FiLogOut, FiUser }           from 'react-icons/fi';
import { AiOutlineClockCircle }                   from 'react-icons/ai';
import { useTheme }                               from '../context/ThemeContext';
// import localFont                                  from 'next/font/local';

const COLLAPSE_DELAY_MS = 300;
let collapseTimeout;

// const billabong = localFont({
//   src: '.../fonts/Billabong.otf', // relative to this file
//   variable: '--font-billabong',
// });

const ProfileIcon = ({ user }) => {
  if (!user) return <div className="w-6 h-6 rounded-full bg-gray-200" />;
  return (
    <div className="relative">
      <img
        src={user.imageUrl}
        alt="Profile"
        className="w-6 h-6 rounded-full object-cover border border-gray-400 p-[1px] group-hover:border-gray-800 dark:border-gray-500 dark:group-hover:border-white transition-colors"
      />
    </div>
  );
};

export default function MySideBar({
  setCurrentPage,
  setSettingsTab,
  isMobile,
  isMobileOpen,
  setIsMobileOpen,
}) {
  const { collapsed, collapseSidebar } = useProSidebar();
  const { user } = useUser();
  const { signOut } = useClerk();
  const { isDark, toggleTheme } = useTheme();

  const sidebarRef = useRef(null);
  const moreRef = useRef(null);
  const popoverRef = useRef(null);

  const [isMoreOpen, setIsMoreOpen] = useState(false);

  // Sidebar hover expand/collapse
  const handleMouseEnter = () => {
    if (collapseTimeout) clearTimeout(collapseTimeout);
    if (!isMobile) collapseSidebar(false);
  };
  const handleMouseLeave = () => {
    if (!isMobile && !isMoreOpen) {
      collapseTimeout = setTimeout(
        () => collapseSidebar(true),
        COLLAPSE_DELAY_MS
      );
    }
  };

  // Outside click for popover + mobile sidebar
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isMobile &&
        isMobileOpen &&
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target)
      ) {
        setIsMobileOpen(false);
      }
      if (isMoreOpen) {
        if (
          popoverRef.current &&
          !popoverRef.current.contains(event.target) &&
          moreRef.current &&
          !moreRef.current.contains(event.target)
        ) {
          setIsMoreOpen(false);
        }
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMobile, isMobileOpen, isMoreOpen]);

  const handleLogout = async () => {
    try {
      await signOut();
    } catch (err) {
      console.error('Sign out error', err);
    }
  };

  const handlePageChange = (key) => {
    setCurrentPage(key);
    setIsMoreOpen(false);
    if (isMobile) setIsMobileOpen(false);
  };

  const openSettingsAndTab = (tabKey) => {
    setSettingsTab(tabKey);
    setCurrentPage('settings');
    setIsMoreOpen(false);
    if (isMobile) setIsMobileOpen(false);
  };

  // Brand Section (Instagram)
  const InstagramBrand = () => (
    <div
      className={`flex justify-start items-start py-6 pl-6 mb-0 ${
        isDark ? 'bg-[#18181b]' : 'bg-white'
      }`}
    >
      {collapsed && !isMobile ? (
        <FaInstagram size={28} className={isDark ? 'text-white' : 'text-black'} />
      ) : (
        <h1
          className={`text-2xl font-bold   ${
            isDark ? 'text-white' : 'text-black'
                          }`}
                        style={{
    fontFamily: 'Billabong, cursive',
     
    lineHeight: '1',
  }}
        >
          Instagram
        </h1>
      )}
    </div>
  );

  const menuItems = [
    { key: 'home', label: 'Home', icon: <GoHomeFill size={24} />, page: 'dashboard' },
    { key: 'search', label: 'Search', icon: <CiSearch size={24} />, page: 'search' },
    { key: 'explore', label: 'Explore', icon: <MdOutlineExplore size={24} />, page: 'settings' },
    { key: 'reels', label: 'Reels', icon: <BiMoviePlay size={24} />, page: 'reels' },
    { key: 'messages', label: 'Messages', icon: <BsChatText size={24} />, page: 'messages' },
    { key: 'notifications', label: 'Notification', icon: <CiHeart size={24} />, page: 'notifications' },
    { key: 'create', label: 'Create', icon: <CiSquarePlus size={24} />, page: 'create' },
    { key: 'profile', label: 'Profile', icon: <ProfileIcon user={user} />, page: 'reports' },
    { key: 'more', label: 'More', icon: <RxHamburgerMenu size={24} />, page: null },
  ];

  return (
    <div
      ref={sidebarRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="fixed top-0 left-0 z-50"
    >
      {/* Popover */}
      {isMoreOpen && !isMobile && (
        <div
          ref={popoverRef}
          className="absolute z-[9999] w-60 rounded-2xl shadow-2xl transition-all duration-300"
          style={{
            left: collapsed ? '70px' : '260px',
            top: (moreRef.current?.offsetTop || 0) - 8,
            backgroundColor: isDark ? '#18181b' : 'white',
            border: '1px solid',
            borderColor: isDark ? '#3f3f46' : '#e5e7eb',
            color: isDark ? 'white' : 'black',
            padding: '8px',
          }}
        >
          <div className="py-1">
            <button
              onClick={() => openSettingsAndTab('general')}
              className="flex items-center gap-3 w-full px-3 py-2 rounded-lg hover:bg-[#2d2d2d] transition-colors"
              style={{ color: isDark ? 'white' : 'black' }}
            >
              <FiSettings size={18} />
              <span className="text-sm">Settings</span>
            </button>
            <button
              onClick={() => openSettingsAndTab('activity')}
              className="flex items-center gap-3 w-full px-3 py-2 rounded-lg hover:bg-[#2d2d2d] transition-colors"
              style={{ color: isDark ? 'white' : 'black' }}
            >
              <AiOutlineClockCircle size={18} />
              <span className="text-sm">Your activity</span>
            </button>
            <button
              onClick={() => openSettingsAndTab('saved')}
              className="flex items-center gap-3 w-full px-3 py-2 rounded-lg hover:bg-[#2d2d2d] transition-colors"
              style={{ color: isDark ? 'white' : 'black' }}
            >
              <BsBookmark size={18} />
              <span className="text-sm">Saved</span>
            </button>

            {/* Dark Mode Toggle with Switch */}
            <div
              className="flex items-center justify-between w-full px-3 py-2 rounded-lg hover:bg-[#2d2d2d] cursor-pointer transition-colors"
              onClick={toggleTheme}
            >
              <div
                className="flex items-center gap-3"
                style={{ color: isDark ? 'white' : 'black' }}
              >
                <MdOutlineDarkMode size={18} />
                <span className="text-sm">Switch Appearance</span>
              </div>

              {/* Toggle switch */}
              <div
                className={`w-10 h-5 flex items-center rounded-full p-1 transition ${
                  isDark ? 'bg-blue-500' : 'bg-gray-300'
                }`}
              >
                <div
                  className={`bg-white w-4 h-4 rounded-full shadow-md transform transition ${
                    isDark ? 'translate-x-5' : 'translate-x-0'
                  }`}
                ></div>
              </div>
            </div>
          </div>

          <hr className="my-2 border-gray-200 dark:border-zinc-700" />

          <div className="py-1">
            <button
              onClick={() => setIsMoreOpen(false)}
              className="flex items-center gap-3 w-full px-3 py-2 rounded-lg hover:bg-[#2d2d2d] transition-colors"
              style={{ color: isDark ? 'white' : 'black' }}
            >
              <FiUser size={18} />
              <span className="text-sm">Switch accounts</span>
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 w-full px-3 py-2 rounded-lg text-red-600 hover:bg-[#2d2d2d] transition-colors"
            >
              <FiLogOut size={18} />
              <span className="text-sm">Log out</span>
            </button>
          </div>
        </div>
      )}

      <Sidebar
        collapsed={isMobile ? !isMobileOpen : collapsed}
        breakPoint="lg"
        onBackdropClick={() => setIsMobileOpen(false)}
        rootStyles={{
          backgroundColor: isDark ? '#0D0D0EFF' : '#fff',
          borderRight: '1px solid',
          borderColor: isDark ? '#3f3f46' : '#e5e7eb',
          height: 'auto',
          color: isDark ? 'white' : 'black',
        }}
        className="transition-all duration-300 ease-in-out"
      >
        <InstagramBrand />
        <Menu
          className={`${isDark ? 'bg-[#0D0D0EFF] text-white' : 'bg-white text-black'}`}
          menuItemStyles={{
            button: {
              '&:hover': {
                backgroundColor: isDark ? '#2d2d2d' : '#f3f4f6',
              },
              color: isDark ? 'white' : 'black',
            },
          }}
        >
          {menuItems.map((item) => (
            <MenuItem
              key={item.key}
              ref={item.key === 'more' ? moreRef : null}
              onClick={
                item.key === 'more'
                  ? () => setIsMoreOpen((v) => !v)
                  : () => handlePageChange(item.page)
              }
              icon={item.icon}
              className="py-1 transition-colors duration-150 group"
              style={{
                backgroundColor:
                  item.key === 'more' && isMoreOpen
                    ? isDark
                      ? '#27272a'
                      : '#f3f4f6'
                    : 'transparent',
              }}
            >
              {(!collapsed || isMobile) && (
                <span className="font-medium text-lg">{item.label}</span>
              )}
            </MenuItem>
          ))}
        </Menu>
      </Sidebar>
    </div>
  );
}
