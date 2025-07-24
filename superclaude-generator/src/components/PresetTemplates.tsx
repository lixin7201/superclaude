'use client';

import React from 'react';
import { presetTemplates } from '@/data/detailedDescriptions';
import { Command, Persona } from '@/types';
import { commands, personas } from '@/data/commands';

interface PresetTemplatesProps {
  onApplyTemplate: (command: Command, flags: string[], persona: Persona | null) => void;
}

const PresetTemplates: React.FC<PresetTemplatesProps> = ({ onApplyTemplate }) => {
  const handleTemplateClick = (template: typeof presetTemplates[0]) => {
    // 查找对应的命令
    const command = commands.find(cmd => cmd.name === template.command);
    if (!command) return;

    // 处理persona标志
    let selectedPersona: Persona | null = null;
    const personaFlag = template.flags.find(flag => flag.startsWith('--persona-'));
    if (personaFlag) {
      const personaId = personaFlag.replace('--persona-', '');
      selectedPersona = personas.find(p => p.id === personaId) || null;
    }

    // 过滤出非persona的标志
    const regularFlags = template.flags.filter(flag => !flag.startsWith('--persona-'));

    onApplyTemplate(command, regularFlags, selectedPersona);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-800">🚀 快速开始 - 常见场景模板</h2>
        <span className="text-sm text-gray-500">点击直接使用</span>
      </div>
      
      <p className="text-gray-600 mb-6">
        不知道怎么组合命令？选择一个场景，我们帮你配置好最佳组合！
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {presetTemplates.map(template => (
          <button
            key={template.id}
            onClick={() => handleTemplateClick(template)}
            className="text-left p-4 rounded-lg border-2 border-gray-200 hover:border-blue-400 hover:bg-blue-50 transition-all duration-200 group"
          >
            <div className="flex items-start">
              <div className="text-2xl mr-3 group-hover:scale-110 transition-transform">
                {template.name.split(' ')[0]}
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-800 mb-1">
                  {template.name.substring(template.name.indexOf(' ') + 1)}
                </h3>
                <p className="text-sm text-gray-600 mb-2">{template.description}</p>
                <div className="text-xs text-gray-500 bg-gray-100 p-2 rounded">
                  <span className="font-mono">{template.command}</span>
                  <span className="mx-1">+</span>
                  <span className="text-blue-600">{template.explanation}</span>
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>

      <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
        <div className="flex items-start">
          <span className="text-yellow-600 mr-2">💡</span>
          <div className="text-sm text-gray-700">
            <strong>小白提示：</strong>不确定选哪个？
            <ul className="mt-2 space-y-1 ml-4">
              <li>• 第一次做项目 → 选"初学者创建网站"</li>
              <li>• 代码出错了 → 选"修复程序错误"</li>
              <li>• 想学习 → 选"学习理解代码"</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PresetTemplates;