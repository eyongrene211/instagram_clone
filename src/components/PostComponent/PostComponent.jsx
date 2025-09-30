'use client';

import React                   from 'react';
import { CiHeart, CiBookmark } from 'react-icons/ci';
import { BsChat, BsSend }      from 'react-icons/bs';
import { RxDotsHorizontal }    from 'react-icons/rx';
import Image                   from 'next/image';
import { useTheme }            from '../context/ThemeContext';

export default function PostComponent({
  username,
  avatarSrc,
  location,
  postSrc,
  likesCount,
  caption,
  commentsCount,
  timeAgo
}) {
  const { isDark } = useTheme();

  return (
    <div className={`max-w-[480px] w-full mb-8 rounded-lg sm:rounded-none
       ${isDark ? 'border-[#3f3f46] bg-[#0D0D0EFF]' : 'border-gray-200 bg-white'}`}
    >
      {/* 1. Header */}
      <div className="flex items-center justify-between p-3">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-full relative overflow-hidden">
            <Image 
              src={avatarSrc} 
              alt={`${username}'s avatar`} 
              fill 
              sizes="32px"
              className="object-cover"
            />
          </div>
          <div>
            <span className={`font-semibold text-sm cursor-pointer ${isDark ? 'text-white' : 'text-black'}`}>
              {username}
            </span>
            {location && <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{location}</p>}
          </div>
        </div>
        <RxDotsHorizontal size={20} className={`${isDark ? 'text-white' : 'text-gray-700'} cursor-pointer`} />
      </div>

      {/* 2. Media Area */}
      <div className="w-full relative aspect-[4/5] bg-gray-200">
        <Image 
          src={postSrc} 
          alt={`Post by ${username}`} 
          fill 
          sizes="(max-width: 640px) 100vw, 480px"
          className="object-cover"
        />
      </div>

      {/* 3. Actions & Likes */}
      <div className="p-3">
        <div className="flex justify-between items-center mb-2">
          <div className="flex space-x-4 text-2xl">
            <CiHeart className={`cursor-pointer transition ${isDark ? 'hover:text-red-500' : 'hover:text-red-500'}`} />
            <BsChat className={`cursor-pointer transition ${isDark ? 'hover:text-gray-300' : 'hover:text-gray-700'}`} />
            <BsSend className={`cursor-pointer transition ${isDark ? 'hover:text-gray-300' : 'hover:text-gray-700'}`} />
          </div>
          <CiBookmark size={24} className={`cursor-pointer transition ${isDark ? 'hover:text-gray-300' : 'hover:text-gray-700'}`} />
        </div>

        <p className={`font-semibold text-sm mb-2 ${isDark ? 'text-white' : 'text-black'}`}>{likesCount.toLocaleString()} likes</p>

        <p className={`text-sm ${isDark ? 'text-white' : 'text-black'}`}>
          <span className="font-semibold mr-1">{username}</span>
          {caption}
        </p>

        {commentsCount > 0 && (
          <p className={`text-sm mt-1 cursor-pointer ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            View all {commentsCount.toLocaleString()} comments
          </p>
        )}
      </div>

      {/* 4. Comment Field */}
      <div className={`px-3 py-2 border-t ${isDark ? 'border-[#3f3f46]' : 'border-gray-200'}`}>
        <input 
          type="text" 
          placeholder="Add a comment..." 
          className={`w-full text-sm placeholder-gray-500 focus:outline-none ${isDark ? 'bg-[#0D0D0EFF] text-white' : 'bg-white text-black'}`}
        />
      </div>

      {/* 5. Timestamp */}
      <p className={`text-xs px-3 pb-3 pt-1 uppercase ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{timeAgo}</p>
    </div>
  );
}
