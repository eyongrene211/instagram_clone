// components/Post/PostComponent.jsx (Updated to use props)

import React                   from 'react';
// Assuming you have installed the required icons:
import { CiHeart, CiBookmark } from 'react-icons/ci';
import { BsChat, BsSend }      from 'react-icons/bs';
import { RxDotsHorizontal }    from 'react-icons/rx'; 
// Use the Image component for optimized images (if using Next.js)
import Image                   from 'next/image'; 

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

  return (
    // Max width of 480px (standard Instagram feed size)
    <div className="max-w-[480px] w-full border border-gray-200 sm:border-none mb-8 bg-white rounded-lg sm:rounded-none">
      
      {/* 1. Header (User Info and Options) */}
      <div className="flex items-center justify-between p-3">
        <div className="flex items-center space-x-3">
          {/* Avatar Image */}
          <div className="w-8 h-8 rounded-full flex-shrink-0 relative overflow-hidden">
             {/* Use the Image component for the profile picture */}
             <Image 
                src={avatarSrc} 
                alt={`${username}'s avatar`} 
                fill 
                sizes="32px"
                className="object-cover"
             />
          </div>
          <div>
            <span className="font-semibold text-sm cursor-pointer">{username}</span>
            {location && <p className="text-xs text-gray-500">{location}</p>}
          </div>
        </div>
        {/* Options Icon */}
        <RxDotsHorizontal size={20} className="text-gray-700 cursor-pointer" />
      </div>

      {/* 2. Media Area (Image) */}
      <div className="w-full relative aspect-[4/5] bg-gray-200">
        {/* Use the Image component for the main post image */}
        <Image 
            src={postSrc} 
            alt={`Post by ${username}`} 
            fill 
            sizes="(max-width: 640px) 100vw, 480px"
            className="object-cover"
        />
      </div>

      {/* 3. Action Icons & Likes */}
      <div className="p-3">
        {/* Action Icons */}
        <div className="flex justify-between items-center mb-2">
          <div className="flex space-x-4 text-2xl">
            <CiHeart className="cursor-pointer hover:text-red-500 transition" />
            <BsChat className="cursor-pointer hover:text-gray-700 transition" />
            <BsSend className="cursor-pointer hover:text-gray-700 transition" /> 
          </div>
          {/* Bookmark/Save Icon */}
          <CiBookmark size={24} className="cursor-pointer hover:text-gray-700 transition" /> 
        </div>

        {/* Likes Count */}
        <p className="font-semibold text-sm mb-2">{likesCount.toLocaleString()} likes</p>

        {/* Caption */}
        <p className="text-sm">
          <span className="font-semibold mr-1">{username}</span>
          {caption}
        </p>

        {/* View Comments Link */}
        {commentsCount > 0 && (
            <p className="text-sm text-gray-500 mt-1 cursor-pointer">
                View all {commentsCount.toLocaleString()} comments
            </p>
        )}
      </div>

      {/* 4. Comment Field Space */}
      <div className="px-3 py-2 border-t border-gray-200">
        <input 
          type="text" 
          placeholder="Add a comment..." 
          className="w-full text-sm placeholder-gray-500 focus:outline-none"
        />
      </div>

      {/* 5. Timestamp */}
      <p className="text-xs text-gray-500 px-3 pb-3 pt-1 uppercase">{timeAgo}</p>

    </div>
  );
}