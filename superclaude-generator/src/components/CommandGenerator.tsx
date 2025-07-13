'use client';

import React, { useState } from 'react';
import { Command, Persona } from '@/types';

interface CommandGeneratorProps {
  selectedCommand: Command | null;
  selectedFlags: string[];
  selectedPersona: Persona | null;
  customArguments: string;
  onCustomArgumentsChange: (args: string) => void;
}

const CommandGenerator: React.FC<CommandGeneratorProps> = ({
  selectedCommand,
  selectedFlags,
  selectedPersona,
  customArguments,
  onCustomArgumentsChange
}) => {
  const [copied, setCopied] = useState(false);

  const generateCommand = () => {
    if (!selectedCommand) return '';
    
    let command = selectedCommand.name;
    
    // Add persona flag if selected
    if (selectedPersona) {
      command += ` ${selectedPersona.flag}`;
    }
    
    // Add selected flags
    if (selectedFlags.length > 0) {
      command += ` ${selectedFlags.join(' ')}`;
    }
    
    // Add custom arguments
    if (customArguments.trim()) {
      command += ` ${customArguments.trim()}`;
    }
    
    return command;
  };

  const handleCopy = async () => {
    const command = generateCommand();
    try {
      await navigator.clipboard.writeText(command);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleSave = () => {
    const command = generateCommand();
    const blob = new Blob([command], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'superclaude-command.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const generatedCommand = generateCommand();

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">生成的命令</h2>
      
      {/* Custom Arguments Input */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          自定义参数 (可选)
        </label>
        <input
          type="text"
          value={customArguments}
          onChange={(e) => onCustomArgumentsChange(e.target.value)}
          placeholder='例如: "Add user authentication" --env prod'
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
        <p className="text-xs text-gray-500 mt-1">
          添加命令描述、文件路径或其他参数
        </p>
      </div>
      
      {/* Generated Command Display */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          生成的命令
        </label>
        <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm overflow-x-auto">
          {generatedCommand || '请选择一个命令开始...'}
        </div>
      </div>
      
      {/* Command Preview */}
      {selectedCommand && (
        <div className="mb-6">
          <h3 className="text-lg font-medium mb-3 text-gray-700">命令预览</h3>
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="mb-3">
              <strong className="text-gray-800">命令:</strong> {selectedCommand.name}
            </div>
            <div className="mb-3">
              <strong className="text-gray-800">描述:</strong> {selectedCommand.description}
            </div>
            {selectedPersona && (
              <div className="mb-3">
                <strong className="text-gray-800">选择的角色:</strong> {selectedPersona.name} ({selectedPersona.flag})
              </div>
            )}
            {selectedFlags.length > 0 && (
              <div className="mb-3">
                <strong className="text-gray-800">选择的标志:</strong> {selectedFlags.join(', ')}
              </div>
            )}
            {selectedCommand.examples.length > 0 && (
              <div>
                <strong className="text-gray-800">示例用法:</strong>
                <ul className="mt-2 ml-4 text-sm text-gray-600">
                  {selectedCommand.examples.map((example, index) => (
                    <li key={index} className="font-mono bg-gray-100 p-2 rounded mb-1">
                      {example}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}
      
      {/* Action Buttons */}
      {generatedCommand && (
        <div className="flex gap-3">
          <button
            onClick={handleCopy}
            className={`flex-1 px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
              copied
                ? 'bg-green-500 text-white'
                : 'bg-blue-500 text-white hover:bg-blue-600'
            }`}
          >
            {copied ? '已复制!' : '复制命令'}
          </button>
          <button
            onClick={handleSave}
            className="px-6 py-3 bg-gray-500 text-white rounded-lg font-medium hover:bg-gray-600 transition-all duration-200"
          >
            保存为文件
          </button>
        </div>
      )}
    </div>
  );
};

export default CommandGenerator;