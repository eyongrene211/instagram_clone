import React from 'react';
import Image from 'next/image';

const StatusComponent = ({ status, onStatusClick }) => {
  const borderStyle = status.viewed
    ? 'p-[3px] border-gray-300'
    : 'p-[3px] border-transparent bg-gradient-to-r from-yellow-400 via-pink-500 to-red-500';

  return (
    <div
      className="flex flex-col items-center cursor-pointer flex-shrink-0 w-[18%] min-w-[60px] max-w-[80px] sm:w-[80px]"
      onClick={() => onStatusClick(status)}
    >
      {/* Avatar Container */}
      <div className={`relative rounded-full ${borderStyle}`}>
        <div className="w-[65px] h-[65px] sm:w-[60px] sm:h-[60px] rounded-full overflow-hidden bg-white flex items-center justify-center">
          <div className="w-[60px] h-[60px] sm:w-[55px] sm:h-[55px] rounded-full overflow-hidden relative">
            <Image
              src={status.avatarSrc}
              alt={`${status.username}'s avatar`}
              fill
              sizes="(max-width: 640px) 50vw, 60px"
              className="object-cover"
              onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/60x60/cccccc/333333?text=P'; }}
            />
          </div>
        </div>
      </div>

      {/* Username */}
      <span className="text-xs sm:text-sm mt-1 truncate text-center w-full">
        {status.username.length > 8 ? status.username.substring(0, 8) + '...' : status.username}
      </span>
    </div>
  );
}

export default StatusComponent;
