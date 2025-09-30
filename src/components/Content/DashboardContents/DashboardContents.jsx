'use client';

import React, { useState }     from 'react';
import StatusComponent         from "@/components/StatusComponent/StatusComponent";
import { posts }               from "@/data/postData";
import { statusData }          from "@/data/statusData";

// Swiper
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/autoplay';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, FreeMode }  from 'swiper/modules';

import PostComponent           from '../../PostComponent/PostComponent';
import { useTheme }            from '@/components/context/ThemeContext';
// import { useTheme }            from '@/context/ThemeContext';

// Close icon component
const CloseIcon = ({ className = 'text-white' }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    width="30"
    height="30"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

export default function DashboardContent() {
  const [selectedStatus, setSelectedStatus] = useState(null);
  const { isDark } = useTheme();

  const handleStatusClick = (status) => setSelectedStatus(status);
  const handleCloseStatus = () => setSelectedStatus(null);

  return (
    <div className={`mx-auto w-full flex flex-col items-center relative ${isDark ? 'bg-zinc-900 text-white' : 'bg-white text-black'}`}>
      {/* Status Reel Container */}
      <div className={`w-full max-w-[600px] border-b py-3 mb-6 sticky top-0 z-10 ${isDark ? 'border-zinc-700 bg-zinc-900' : 'border-gray-200 bg-white'}`}>
        <div className="px-2">
          <Swiper
            modules={[Autoplay, FreeMode]}
            spaceBetween={10}
            slidesPerView="auto"
            freeMode
            loop
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            direction="horizontal"
            className="w-full h-full"
          >
            {statusData.map((status) => (
              <SwiperSlide key={status.id} style={{ width: '80px' }}>
                <StatusComponent
                  status={status}
                  onStatusClick={handleStatusClick}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      {/* Posts Feed */}
      {posts.map((post) => (
        <PostComponent
          key={post.id}
          username={post.username}
          avatarSrc={post.avatarSrc}
          location={post.location}
          postSrc={post.postSrc}
          likesCount={post.likesCount}
          caption={post.caption}
          commentsCount={post.commentsCount}
          timeAgo={post.timeAgo}
        />
      ))}

      {/* Status Modal Overlay */}
      {selectedStatus && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90 transition-opacity duration-300"
          onClick={handleCloseStatus}
        >
          <div
            className="relative w-full h-full max-w-sm max-h-[80vh] md:max-w-md md:max-h-[90vh] rounded-xl shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-full h-full relative">
              <img
                src={selectedStatus.storyContentSrc}
                alt={`Status content from ${selectedStatus.username}`}
                className="w-full h-full object-cover"
              />

              <div className="absolute top-0 left-0 w-full p-4 flex items-center gap-3 bg-gradient-to-b from-black/50 to-transparent">
                <div className="w-8 h-8 rounded-full overflow-hidden relative border border-white">
                  <img
                    src={selectedStatus.avatarSrc}
                    alt="Avatar"
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="text-sm font-semibold text-white">
                  {selectedStatus.username}
                </span>
              </div>
            </div>

            <button
              className="absolute top-4 right-4 z-50 p-2 rounded-full hover:opacity-80 transition"
              onClick={handleCloseStatus}
              aria-label="Close status view"
            >
              <CloseIcon />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
