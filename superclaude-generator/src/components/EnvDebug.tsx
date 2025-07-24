'use client';

import React from 'react';

const EnvDebug: React.FC = () => {
  const apiKey = process.env.NEXT_PUBLIC_OPENROUTER_API_KEY;
  
  return (
    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
      <h3 className="font-semibold text-yellow-800 mb-2">环境变量调试信息</h3>
      <div className="text-sm text-gray-700">
        <p>API Key 状态: {apiKey ? '✅ 已配置' : '❌ 未配置'}</p>
        <p>API Key 长度: {apiKey ? apiKey.length : 0} 字符</p>
        <p>API Key 前缀: {apiKey ? apiKey.substring(0, 10) + '...' : 'N/A'}</p>
        <p>环境: {process.env.NODE_ENV}</p>
      </div>
      
      {!apiKey && (
        <div className="mt-3 text-xs text-yellow-700">
          <strong>解决方法：</strong>
          <ol className="list-decimal ml-5 mt-1">
            <li>确保 .env.local 文件在项目根目录</li>
            <li>确保文件内容格式正确：NEXT_PUBLIC_OPENROUTER_API_KEY=你的密钥</li>
            <li>重启开发服务器 (npm run dev)</li>
            <li>如果是 Vercel 部署，在项目设置中添加环境变量</li>
          </ol>
        </div>
      )}
    </div>
  );
};

export default EnvDebug;