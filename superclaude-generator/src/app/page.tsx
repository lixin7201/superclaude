'use client';

import React, { useState } from 'react';
import { Command, Persona } from '@/types';
import CommandSelector from '@/components/CommandSelector';
import FlagSelector from '@/components/FlagSelector';
import PersonaSelector from '@/components/PersonaSelector';
import CommandGenerator from '@/components/CommandGenerator';

export default function Home() {
  const [selectedCommand, setSelectedCommand] = useState<Command | null>(null);
  const [selectedFlags, setSelectedFlags] = useState<string[]>([]);
  const [selectedPersona, setSelectedPersona] = useState<Persona | null>(null);
  const [customArguments, setCustomArguments] = useState<string>('');

  const handleFlagToggle = (flag: string) => {
    setSelectedFlags(prev => 
      prev.includes(flag) 
        ? prev.filter(f => f !== flag)
        : [...prev, flag]
    );
  };

  const handleReset = () => {
    setSelectedCommand(null);
    setSelectedFlags([]);
    setSelectedPersona(null);
    setCustomArguments('');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">SuperClaude 命令生成器</h1>
              <span className="ml-3 px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                v2.0.1
              </span>
            </div>
            <button
              onClick={handleReset}
              className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
            >
              重置
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-lg text-gray-700 mb-2">
            构建你的 SuperClaude 命令
          </h2>
          <p className="text-gray-600">
            选择命令、配置标志、选择认知角色，生成专业的 SuperClaude 命令。
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Selectors */}
          <div className="space-y-6">
            <CommandSelector
              selectedCommand={selectedCommand}
              onCommandSelect={setSelectedCommand}
            />
            
            <PersonaSelector
              selectedPersona={selectedPersona}
              onPersonaSelect={setSelectedPersona}
            />
          </div>

          {/* Right Column - Flags and Generator */}
          <div className="space-y-6">
            <FlagSelector
              selectedCommand={selectedCommand}
              selectedFlags={selectedFlags}
              onFlagToggle={handleFlagToggle}
            />
            
            <CommandGenerator
              selectedCommand={selectedCommand}
              selectedFlags={selectedFlags}
              selectedPersona={selectedPersona}
              customArguments={customArguments}
              onCustomArgumentsChange={setCustomArguments}
            />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-600">
            <p className="mb-2">
              SuperClaude 开发框架 - 增强 Claude Code 的专业能力
            </p>
            <p className="text-sm">
              19 个专业命令 | 9 个认知角色 | 高级 MCP 集成 | 基于证据的方法论
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
