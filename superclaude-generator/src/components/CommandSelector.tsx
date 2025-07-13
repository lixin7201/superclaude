'use client';

import React from 'react';
import { Command } from '@/types';
import { commands } from '@/data/commands';

interface CommandSelectorProps {
  selectedCommand: Command | null;
  onCommandSelect: (command: Command) => void;
}

const CommandSelector: React.FC<CommandSelectorProps> = ({ selectedCommand, onCommandSelect }) => {
  const categories = ['Development', 'Analysis', 'Operations', 'Design', 'Workflow'];

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">选择命令</h2>
      
      {categories.map(category => {
        const categoryCommands = commands.filter(cmd => cmd.category === category);
        
        return (
          <div key={category} className="mb-6">
            <h3 className="text-lg font-medium mb-3 text-gray-700 border-b border-gray-200 pb-2">
              {category} ({categoryCommands.length})
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {categoryCommands.map(command => (
                <button
                  key={command.id}
                  onClick={() => onCommandSelect(command)}
                  className={`p-4 rounded-lg border-2 text-left transition-all duration-200 ${
                    selectedCommand?.id === command.id
                      ? 'border-blue-500 bg-blue-50 shadow-md'
                      : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <div className="font-semibold text-gray-800 mb-2">{command.name}</div>
                  <div className="text-sm text-gray-600 mb-2">{command.description}</div>
                  <div className="text-xs text-gray-500">
                    {command.flags.slice(0, 3).join(', ')}
                    {command.flags.length > 3 && ` +${command.flags.length - 3} more`}
                  </div>
                </button>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CommandSelector;