'use client';

import React, { useState } from 'react';
import { apicoreService } from '@/services/apicore';
import { Command, Persona } from '@/types';
import { commands, personas } from '@/data/commands';

interface AICommandGeneratorProps {
  onCommandGenerated: (command: Command, flags: string[], persona: Persona | null, customArgs?: string) => void;
}

const AICommandGenerator: React.FC<AICommandGeneratorProps> = ({ onCommandGenerated }) => {
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [generatedCommand, setGeneratedCommand] = useState<string | null>(null);
  const [showSuggestions, setShowSuggestions] = useState(true);

  const examplePrompts = [
    { text: "创建一个React网站", icon: "🌐" },
    { text: "帮我修复代码错误", icon: "🐛" },
    { text: "检查代码安全性", icon: "🔒" },
    { text: "部署到生产环境", icon: "🚀" },
    { text: "优化网站性能", icon: "⚡" },
    { text: "写单元测试", icon: "🧪" },
    { text: "生成API文档", icon: "📚" },
    { text: "设计微服务架构", icon: "🏗️" }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInput.trim()) return;

    setIsLoading(true);
    setError(null);
    setGeneratedCommand(null);

    try {
      const commandString = await apicoreService.generateCommand(userInput);
      setGeneratedCommand(commandString);
      
      // Parse the generated command
      parseAndApplyCommand(commandString);
      
    } catch (err) {
      setError(err instanceof Error ? err.message : '生成命令时出错，请重试');
      console.error('AI generation error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const parseAndApplyCommand = (commandString: string) => {
    // Clean up the command string - remove any extra whitespace
    commandString = commandString.trim().replace(/\s+/g, ' ');
    
    console.log('Parsing command:', commandString);
    
    // Extract command name - be more flexible with the pattern
    const commandMatch = commandString.match(/^\/?(\w+)/);
    if (!commandMatch) {
      setError('命令格式不正确，应以 / 开头');
      return;
    }
    
    // Ensure the command starts with /
    const commandName = commandMatch[0].startsWith('/') ? commandMatch[0] : `/${commandMatch[1]}`;
    
    const command = commands.find(cmd => cmd.name === commandName);
    if (!command) {
      setError(`未找到命令: ${commandName}`);
      return;
    }

    // Extract flags and arguments
    const remainingString = commandString.substring(commandName.length).trim();
    const flags: string[] = [];
    let selectedPersona: Persona | null = null;
    let customArgs = '';
    
    // Parse flags with values
    const flagsWithValues = ['--env', '--depth', '--file', '--files', '--commit', '--pr', '--threshold'];
    let processedString = remainingString;
    
    // Extract persona first
    const personaMatch = processedString.match(/--persona-(\w+)/);
    if (personaMatch) {
      const personaId = personaMatch[1];
      selectedPersona = personas.find(p => p.id === personaId) || null;
      processedString = processedString.replace(personaMatch[0], '').trim();
    }
    
    // Extract flags with values
    flagsWithValues.forEach(flag => {
      const regex = new RegExp(`${flag}\\s+(\\S+)`);
      const match = processedString.match(regex);
      if (match) {
        customArgs += `${flag} ${match[1]} `;
        processedString = processedString.replace(match[0], '').trim();
      }
    });
    
    // Extract quoted strings
    const quotedMatch = processedString.match(/"([^"]+)"/);
    if (quotedMatch) {
      customArgs += `"${quotedMatch[1]}" `;
      processedString = processedString.replace(quotedMatch[0], '').trim();
    }
    
    // Extract remaining flags
    const remainingFlags = processedString.match(/--\\w+(-\\w+)*/g) || [];
    flags.push(...remainingFlags);
    
    customArgs = customArgs.trim();
    
    // Apply the command
    onCommandGenerated(command, flags, selectedPersona, customArgs);
    
    // Scroll to command generator
    setTimeout(() => {
      const generator = document.querySelector('#command-generator');
      if (generator) {
        generator.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const handleExampleClick = (prompt: string) => {
    setUserInput(prompt);
    setShowSuggestions(false);
  };

  return (
    <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-lg shadow-md p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
            <span className="text-2xl">🤖</span>
            AI 智能命令生成
            <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full">
              Powered by Gemini 2.5 Pro
            </span>
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            用自然语言描述你想做什么，AI 会帮你生成正确的命令
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            描述你的需求
          </label>
          <textarea
            value={userInput}
            onChange={(e) => {
              setUserInput(e.target.value);
              setShowSuggestions(false);
            }}
            onFocus={() => setShowSuggestions(false)}
            placeholder="例如：我想创建一个带登录功能的React网站，要包含测试..."
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 resize-none"
            rows={3}
            disabled={isLoading}
          />
        </div>

        {/* Example prompts */}
        {showSuggestions && !userInput && (
          <div className="space-y-2">
            <p className="text-sm text-gray-600">试试这些例子：</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {examplePrompts.map((prompt, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => handleExampleClick(prompt.text)}
                  className="text-left p-2 text-sm bg-white border border-gray-200 rounded-lg hover:border-purple-300 hover:bg-purple-50 transition-all duration-200"
                >
                  <span className="mr-1">{prompt.icon}</span>
                  <span className="text-gray-700">{prompt.text}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Error message */}
        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
            <strong>错误：</strong> {error}
          </div>
        )}

        {/* Generated command preview */}
        {generatedCommand && (
          <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-sm font-medium text-green-800 mb-1">AI 生成的命令：</p>
            <code className="text-sm text-green-700 font-mono">{generatedCommand}</code>
          </div>
        )}

        {/* Submit button */}
        <button
          type="submit"
          disabled={isLoading || !userInput.trim()}
          className={`w-full py-3 px-4 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2 ${
            isLoading || !userInput.trim()
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700 shadow-md hover:shadow-lg'
          }`}
        >
          {isLoading ? (
            <>
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              <span>AI 正在思考...</span>
            </>
          ) : (
            <>
              <span>✨</span>
              <span>生成命令</span>
            </>
          )}
        </button>
      </form>

      {/* Tips */}
      <div className="mt-4 p-3 bg-purple-50 rounded-lg">
        <p className="text-xs text-purple-700">
          <strong>💡 提示：</strong>
          描述越详细，生成的命令越准确。可以包含技术栈、功能需求、性能要求等信息。
        </p>
      </div>
    </div>
  );
};

export default AICommandGenerator;