'use client';

import React, { useState } from 'react';
import { Command, Persona } from '@/types';
import HelpTooltip from './HelpTooltip';
import { exampleExplanations, flagChineseExplanations } from '@/data/exampleExplanations';

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
    <div id="command-generator" className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">生成的命令</h2>
      
      {/* Custom Arguments Input */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
          自定义参数 (可选)
          <HelpTooltip 
            content="可以添加任务描述、文件路径或其他特定参数"
            example='"实现用户登录功能" 或 --file src/auth.js'
            tip="描述越详细，AI理解越准确"
          />
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
        <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
          生成的命令
          <HelpTooltip 
            content="这是最终生成的命令，可以直接复制到 Claude Code 中使用"
            tip="点击下方的复制按钮，然后粘贴到 Claude Code 对话框"
          />
        </label>
        <div className="bg-gray-900 p-4 rounded-lg font-mono text-sm overflow-x-auto">
          {generatedCommand ? (
            <div className="flex flex-wrap items-center gap-2">
              {generatedCommand.split(' ').map((part, index) => {
                if (part.startsWith('/')) {
                  return <span key={index} className="text-yellow-400">{part}</span>;
                } else if (part.startsWith('--')) {
                  return <span key={index} className="text-blue-400">{part}</span>;
                } else if (part.startsWith('"') || part.endsWith('"')) {
                  return <span key={index} className="text-green-400">{part}</span>;
                } else {
                  return <span key={index} className="text-gray-300">{part}</span>;
                }
              })}
            </div>
          ) : (
            <span className="text-gray-500">请选择一个命令开始...</span>
          )}
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
                <strong className="text-gray-800">选择的角色:</strong> 
                <span className="text-gray-700">{selectedPersona.name}</span>
                <span className="text-gray-500 text-sm ml-2">({selectedPersona.flag})</span>
                <div className="text-sm text-gray-600 mt-1">
                  🎯 {selectedPersona.expertise}
                </div>
              </div>
            )}
            {selectedFlags.length > 0 && (
              <div className="mb-3">
                <strong className="text-gray-800">选择的标志:</strong>
                <div className="mt-1 space-y-1">
                  {selectedFlags.map((flag, index) => (
                    <div key={index} className="text-sm">
                      <span className="font-mono text-gray-700">{flag}</span>
                      {flagChineseExplanations[flag] && (
                        <span className="text-gray-500 ml-2">- {flagChineseExplanations[flag]}</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
            {customArguments && (
              <div className="mb-3">
                <strong className="text-gray-800">自定义参数:</strong>
                <div className="text-sm mt-1">
                  <span className="font-mono text-gray-700">{customArguments}</span>
                  {customArguments.includes('--env') && (
                    <div className="text-xs text-gray-600 mt-1">
                      💡 指定部署环境（staging=测试环境，prod=生产环境）
                    </div>
                  )}
                  {customArguments.includes('--depth') && (
                    <div className="text-xs text-gray-600 mt-1">
                      💡 指定解释深度（beginner=初学者，expert=专家）
                    </div>
                  )}
                  {customArguments.includes('--file') && (
                    <div className="text-xs text-gray-600 mt-1">
                      💡 指定要处理的文件路径
                    </div>
                  )}
                </div>
              </div>
            )}
            {selectedCommand.examples.length > 0 && (
              <div>
                <strong className="text-gray-800">示例用法:</strong>
                <ul className="mt-2 ml-4 text-sm text-gray-600">
                  {selectedCommand.examples.map((example, index) => (
                    <li key={index} className="mb-2">
                      <div className="font-mono bg-gray-100 p-2 rounded">
                        {example}
                      </div>
                      {exampleExplanations[example] && (
                        <div className="text-xs text-gray-600 mt-1 ml-2">
                          💡 {exampleExplanations[example]}
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Usage Tips */}
      {generatedCommand && (
        <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-start">
            <span className="text-blue-600 mr-2">💡</span>
            <div className="text-sm text-gray-700">
              <strong>使用提示：</strong>
              <ol className="mt-2 space-y-1 ml-4 list-decimal">
                <li>复制生成的命令</li>
                <li>打开 Claude Code 对话</li>
                <li>粘贴命令并按回车执行</li>
                <li>AI 会根据你选择的配置执行相应任务</li>
              </ol>
            </div>
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