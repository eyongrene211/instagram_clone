'use client';
import Link                                 from 'next/link';
import Image                                from 'next/image';
import { mockCurrentUser, mockSuggestions } from '@/data/suggestionData';
import React                                from 'react';
import FooterComponent                      from '../FooterComponent/FooterComponent';
import { useTheme }                         from '@/components/context/ThemeContext';

const SuggestionComponent = ({ currentUser, suggestions }) => {
  const { isDark } = useTheme();
  const user = currentUser || mockCurrentUser;
  const suggestionList = suggestions || mockSuggestions;

  return (
    <div
      className={`w-90 px-4 pt-6 pb-8 h-auto ${
        isDark ? 'bg-[#0D0D0EFF] text-white' : 'bg-white text-gray-600'
      }`}
    >
      {/* ---------- Current User ---------- */}
      <div className="flex items-center justify-between gap-3 mb-6">
        <Link href={`/${user.username}`} className="flex items-center gap-3 group">
          <div className="relative w-12 h-12">
            <Image
              src={user.avatarSrc}
              alt={user.username}
              fill
              sizes="48px"
              className="rounded-full object-cover border border-gray-300"
            />
          </div>
          <div>
            <p className={`font-semibold text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {user.username}
            </p>
            <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-400'}`}>{user.name}</p>
          </div>
        </Link>
        <button className="text-xs font-semibold text-blue-500 hover:text-blue-600">Switch</button>
      </div>

      {/* ---------- Suggestions ---------- */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xs font-semibold tracking-wide uppercase text-gray-400">
            Suggestions for you
          </h2>
          <Link
            href="#"
            className={`text-xs font-semibold ${
              isDark ? 'text-gray-200 hover:text-gray-400' : 'text-gray-800 hover:text-gray-500'
            }`}
          >
            See All
          </Link>
        </div>

        <ul className="space-y-3">
          {suggestionList.map((suggestion) => (
            <li key={suggestion.id} className="flex items-center justify-between">
              <Link href={`/${suggestion.username}`} className="flex items-center gap-3 group">
                <div className="relative w-8 h-8">
                  <Image
                    src={suggestion.avatarSrc}
                    alt={suggestion.username}
                    fill
                    sizes="32px"
                    className="rounded-full object-cover"
                  />
                </div>
                <div>
                  <p
                    className={`text-sm font-semibold transition-colors ${
                      isDark
                        ? 'text-white group-hover:text-gray-300'
                        : 'text-gray-900 group-hover:text-gray-600'
                    }`}
                  >
                    {suggestion.username}
                  </p>
                  <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-400'}`}>
                    {suggestion.followedBy
                      ? `Followed by ${suggestion.followedBy}`
                      : 'Suggested for you'}
                  </p>
                </div>
              </Link>
              <button className="text-xs font-semibold text-blue-500 hover:text-blue-600">Follow</button>
            </li>
          ))}
        </ul>
      </div>

      <FooterComponent />
    </div>
  );
};

export default SuggestionComponent;
