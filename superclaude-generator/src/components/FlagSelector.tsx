'use client';

import React from 'react';
import { Command } from '@/types';
import { universalFlags } from '@/data/commands';

interface FlagSelectorProps {
  selectedCommand: Command | null;
  selectedFlags: string[];
  onFlagToggle: (flag: string) => void;
}

const FlagSelector: React.FC<FlagSelectorProps> = ({ selectedCommand, selectedFlags, onFlagToggle }) => {
  const flagCategories = ['Thinking', 'Token', 'MCP', 'Analysis', 'Planning', 'Quality'];

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">选择标志</h2>
      
      {/* Universal Flags */}
      <div className="mb-6">
        <h3 className="text-lg font-medium mb-3 text-gray-700 border-b border-gray-200 pb-2">
          通用标志 (适用于所有命令)
        </h3>
        
        {flagCategories.map(category => {
          const categoryFlags = universalFlags.filter(flag => flag.category === category);
          
          if (categoryFlags.length === 0) return null;
          
          return (
            <div key={category} className="mb-4">
              <h4 className="text-md font-medium mb-2 text-gray-600">{category}</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {categoryFlags.map(flag => (
                  <label
                    key={flag.flag}
                    className={`flex items-center p-3 rounded-lg border cursor-pointer transition-all duration-200 ${
                      selectedFlags.includes(flag.flag)
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={selectedFlags.includes(flag.flag)}
                      onChange={() => onFlagToggle(flag.flag)}
                      className="mr-3 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <div className="flex-1">
                      <div className="font-medium text-gray-800">
                        {flag.flag}
                        {flag.alias && <span className="text-sm text-gray-500 ml-2">({flag.alias})</span>}
                      </div>
                      <div className="text-sm text-gray-600">{flag.description}</div>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          );
        })}
      </div>
      
      {/* Command-specific Flags */}
      {selectedCommand && (
        <div className="mb-6">
          <h3 className="text-lg font-medium mb-3 text-gray-700 border-b border-gray-200 pb-2">
            {selectedCommand.name} 专用标志
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {selectedCommand.flags.map(flag => (
              <label
                key={flag}
                className={`flex items-center p-3 rounded-lg border cursor-pointer transition-all duration-200 ${
                  selectedFlags.includes(flag)
                    ? 'border-green-500 bg-green-50'
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }`}
              >
                <input
                  type="checkbox"
                  checked={selectedFlags.includes(flag)}
                  onChange={() => onFlagToggle(flag)}
                  className="mr-3 rounded border-gray-300 text-green-600 focus:ring-green-500"
                />
                <div className="font-medium text-gray-800">{flag}</div>
              </label>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FlagSelector;