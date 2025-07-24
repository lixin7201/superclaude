'use client';

import React, { useState } from 'react';

const APIDebug: React.FC = () => {
  const [showDebug, setShowDebug] = useState(false);
  const [testing, setTesting] = useState(false);
  const [result, setResult] = useState('');

  const testAPI = async () => {
    setTesting(true);
    setResult('测试中...');
    
    try {
      const response = await fetch('https://openrouter.ai/api/v1/models', {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer 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'
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setResult('API 连接成功！可用模型数: ' + data.data?.length);
      } else {
        const text = await response.text();
        setResult(`错误 ${response.status}: ${text}`);
      }
    } catch (error) {
      setResult(`网络错误: ${error}`);
    } finally {
      setTesting(false);
    }
  };

  if (!showDebug) {
    return (
      <button
        onClick={() => setShowDebug(true)}
        className="fixed bottom-4 right-4 bg-gray-500 text-white p-2 rounded-lg text-xs"
      >
        调试
      </button>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 bg-white border border-gray-300 rounded-lg shadow-lg p-4 max-w-sm">
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-semibold">API 调试</h3>
        <button
          onClick={() => setShowDebug(false)}
          className="text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>
      </div>
      
      <button
        onClick={testAPI}
        disabled={testing}
        className="bg-blue-500 text-white px-3 py-1 rounded text-sm mb-2 disabled:bg-gray-400"
      >
        测试连接
      </button>
      
      {result && (
        <div className="text-xs bg-gray-100 p-2 rounded overflow-auto max-h-40">
          {result}
        </div>
      )}
    </div>
  );
};

export default APIDebug;