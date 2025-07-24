'use client';

import React, { useState } from 'react';
import { presetTemplates } from '@/data/detailedDescriptions';
import { Command, Persona } from '@/types';
import { commands, personas } from '@/data/commands';

interface PresetTemplatesProps {
  onApplyTemplate: (command: Command, flags: string[], persona: Persona | null, customArgs?: string) => void;
}

const PresetTemplates: React.FC<PresetTemplatesProps> = ({ onApplyTemplate }) => {
  const [selectedTemplateId, setSelectedTemplateId] = useState<string | null>(null);
  const handleTemplateClick = (template: typeof presetTemplates[0]) => {
    // 设置选中状态
    setSelectedTemplateId(template.id);
    
    // 查找对应的命令
    const command = commands.find(cmd => cmd.name === template.command);
    if (!command) {
      console.error('Command not found:', template.command);
      return;
    }

    // 处理persona标志
    let selectedPersona: Persona | null = null;
    const personaFlag = template.flags.find(flag => flag.startsWith('--persona-'));
    if (personaFlag) {
      const personaId = personaFlag.replace('--persona-', '');
      selectedPersona = personas.find(p => p.id === personaId) || null;
    }

    // 过滤出非persona的标志
    const regularFlags = template.flags.filter(flag => !flag.startsWith('--persona-'));

    // 如果模板有自定义参数，也传递过去
    const customArgs = (template as any).customArgs || '';
    
    onApplyTemplate(command, regularFlags, selectedPersona, customArgs);
    
    // 滚动到命令生成器部分
    setTimeout(() => {
      const generator = document.querySelector('#command-generator');
      if (generator) {
        generator.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
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
          <div key={template.id} className="relative">
            <button
              onClick={() => handleTemplateClick(template)}
              className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-200 group ${
                selectedTemplateId === template.id 
                  ? 'border-blue-500 bg-blue-50 shadow-md' 
                  : 'border-gray-200 hover:border-blue-400 hover:bg-blue-50'
              }`}
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
            {selectedTemplateId === template.id && (
              <div className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full shadow-md">
                ✓ 已选择
              </div>
            )}
          </div>
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