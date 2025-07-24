'use client';

import React, { useState, useEffect } from 'react';

const WelcomeBanner: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // 检查是否是首次访问
    const hasVisited = localStorage.getItem('superclaude-visited');
    if (!hasVisited) {
      setIsVisible(true);
    }
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    localStorage.setItem('superclaude-visited', 'true');
  };

  if (!isVisible) return null;

  return (
    <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4 mb-6 rounded-lg shadow-lg relative">
      <button
        onClick={handleClose}
        className="absolute top-2 right-2 text-white hover:text-gray-200"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
      
      <div className="pr-8">
        <h3 className="text-lg font-bold mb-2">👋 欢迎使用 SuperClaude 命令生成器！</h3>
        <p className="text-sm mb-3">
          如果你是编程新手，我们为你准备了特别的帮助：
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
          <div className="bg-white bg-opacity-20 p-3 rounded">
            <strong className="block mb-1">🚀 快速开始</strong>
            直接选择上方的预设模板，一键配置最佳组合
          </div>
          <div className="bg-white bg-opacity-20 p-3 rounded">
            <strong className="block mb-1">💡 实时帮助</strong>
            将鼠标悬停在 <span className="inline-block w-4 h-4 bg-blue-400 rounded-full text-center leading-4 text-xs">?</span> 图标上查看详细说明
          </div>
          <div className="bg-white bg-opacity-20 p-3 rounded">
            <strong className="block mb-1">📚 完整指南</strong>
            点击右上角的"帮助"按钮查看详细教程
          </div>
        </div>

        <p className="text-xs mt-3 opacity-80">
          提示：这个横幅只会显示一次。如需再次查看，请点击帮助按钮。
        </p>
      </div>
    </div>
  );
};

export default WelcomeBanner;