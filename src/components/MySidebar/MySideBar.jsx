// components/MySideBar/MySideBar.jsx
'use client';

import React, { useState, useRef, useEffect }     from 'react';
import { Sidebar, Menu, MenuItem, useProSidebar } from 'react-pro-sidebar';

// Icons
import { FaInstagram }                            from "react-icons/fa";
import { BiMoviePlay }                            from "react-icons/bi";
import { MdOutlineExplore }                       from "react-icons/md";
import { GoHomeFill }                             from "react-icons/go";
import { BsChatText }                             from "react-icons/bs";
import { CiHeart, CiSquarePlus, CiSearch }        from "react-icons/ci";
import { CgProfile }                              from "react-icons/cg";
import { RxHamburgerMenu }                        from "react-icons/rx";

const COLLAPSE_DELAY_MS = 300;
let collapseTimeout;

export default function MySideBar({ setCurrentPage, isMobile, isMobileOpen, setIsMobileOpen }) {
  const { collapsed, collapseSidebar } = useProSidebar();
  const sidebarRef = useRef(null);

  /* ---------- Hover Expand / Collapse ---------- */
  const handleMouseEnter = () => {
    if (collapseTimeout) clearTimeout(collapseTimeout);
    if (!isMobile) collapseSidebar(false);
  };
  const handleMouseLeave = () => {
    if (!isMobile) {
      collapseTimeout = setTimeout(() => collapseSidebar(true), COLLAPSE_DELAY_MS);
    }
  };

  /* ---------- Change Page ---------- */
  const handlePageChange = (key) => {
    setCurrentPage(key);
    if (isMobile) setIsMobileOpen(false);
  };

  /* ---------- Close on Outside Click (mobile) ---------- */
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
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMobile, isMobileOpen, setIsMobileOpen]);

  /* ---------- Instagram Brand ---------- */
  const InstagramBrand = () => (
    <div className="flex justify-center items-center py-6 px-4 mb-4">
      {collapsed && !isMobile ? (
        <FaInstagram size={28} className="text-black" />
      ) : (
        <h1 className="text-2xl font-bold italic transition-opacity duration-300">
          Instagram
        </h1>
      )}
    </div>
  );

  const menuItems = [
    { key: 'home',         label: 'Home',         icon: <GoHomeFill size={24} />, page: 'dashboard' },
    { key: 'search',       label: 'Search',       icon: <CiSearch size={24} />,   page: 'search' },
    { key: 'explore',      label: 'Explore',      icon: <MdOutlineExplore size={24} />, page: 'settings' },
    { key: 'reels',        label: 'Reels',        icon: <BiMoviePlay size={24} />, page: 'reels' },
    { key: 'messages',     label: 'Messages',     icon: <BsChatText size={24} />,  page: 'messages' },
    { key: 'notifications',label: 'Notification', icon: <CiHeart size={24} />,     page: 'notifications' },
    { key: 'create',       label: 'Create',       icon: <CiSquarePlus size={24} />,page: 'create' },
    { key: 'profile',      label: 'Profile',      icon: <CgProfile size={24} />,   page: 'reports' },
    { key: 'more',         label: 'More',         icon: <RxHamburgerMenu size={24} />, page: 'settings' },
  ];

    return (
        <>
        
    {/* ✅ FIXED SIDEBAR WRAPPER */}
    <div
      ref={sidebarRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="fixed top-0 left-0 h-auto z-50"   // key change: fixed + full height
    >
      <Sidebar
        collapsed={isMobile ? !isMobileOpen : collapsed}
        breakPoint="lg"
        onBackdropClick={() => setIsMobileOpen(false)}
        className="transition-all duration-300 ease-in-out"
        rootStyles={{
          backgroundColor: 'white',
          borderRight: '1px solid #e5e7eb',
          height: '100%', // fill the fixed container
          paddingTop: '0',
          paddingBottom: '20px',
        }}
      >
        <InstagramBrand />
        <Menu>
          {menuItems.map(item => (
            <MenuItem
              key={item.key}
              icon={item.icon}
              onClick={() => handlePageChange(item.page)}
              className="py-1 hover:bg-gray-100 transition-colors duration-150"
            >
              <span className="font-medium text-lg">{item.label}</span>
            </MenuItem>
          ))}
        </Menu>
      </Sidebar>
            </div>
            </>
  );
}
