'use client';

import React, { useState } from 'react';

interface HelpTooltipProps {
  content: string;
  example?: string;
  tip?: string;
}

const HelpTooltip: React.FC<HelpTooltipProps> = ({ content, example, tip }) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="relative inline-block ml-2">
      <button
        type="button"
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setIsVisible(!isVisible);
        }}
        className="text-blue-500 hover:text-blue-700 transition-colors"
      >
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </button>

      {isVisible && (
        <div className="absolute z-50 w-80 p-4 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg -left-20 md:left-0">
          <div className="text-sm text-gray-700 space-y-2">
            <p>{content}</p>
            
            {example && (
              <div className="mt-2 p-2 bg-gray-50 rounded">
                <p className="font-semibold text-gray-600 text-xs mb-1">示例：</p>
                <code className="text-xs text-blue-600">{example}</code>
              </div>
            )}
            
            {tip && (
              <div className="mt-2 p-2 bg-yellow-50 rounded">
                <p className="text-xs text-yellow-800">
                  <span className="font-semibold">💡 提示：</span> {tip}
                </p>
              </div>
            )}
          </div>
          
          <div className="absolute -top-2 left-24 w-0 h-0 border-l-8 border-r-8 border-b-8 border-transparent border-b-white"></div>
        </div>
      )}
    </div>
  );
};

export default HelpTooltip;