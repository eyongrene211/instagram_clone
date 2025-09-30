import React from 'react';
import Image from 'next/image';

/**
 * Renders a single, clickable status item.
 */
const StatusComponent = ({ status, onStatusClick }) => {
    // Determine border style based on 'viewed' status
    const borderStyle = status.viewed
        ? 'p-[3px] border-gray-300' // Subtle gray border for viewed stories
        : 'p-[3px] border-transparent bg-gradient-to-r from-yellow-400 via-pink-500 to-red-500'; // Gradient for unviewed

    return (
        <div 
            className='flex flex-col items-center cursor-pointer flex-shrink-0 w-[80px]'
            onClick={() => onStatusClick(status)}
        >
            {/* Avatar Container with Gradient Border */}
            <div className={`relative rounded-full ${borderStyle}`}>
                <div className='w-[65px] h-[65px] rounded-full overflow-hidden bg-white flex items-center justify-center'>
                    <div className='w-[60px] h-[60px] rounded-full overflow-hidden relative'>
                        <Image 
                            src={status.avatarSrc} 
                            alt={`${status.username}'s avatar`} 
                            fill 
                            sizes="60px"
                            className='object-cover'
                            onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/60x60/cccccc/333333?text=P'; }}
                        />
                    </div>
                </div>
            </div>
            
            {/* Username */}
            <span className='text-xs mt-1 truncate max-w-full'>
                {status.username.length > 8 ? status.username.substring(0, 8) + '...' : status.username}
            </span>
        </div>
    );
}

export default StatusComponent;
