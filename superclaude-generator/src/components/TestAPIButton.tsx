'use client';

import React, { useState } from 'react';

const TestAPIButton: React.FC = () => {
  const [testing, setTesting] = useState(false);
  const [result, setResult] = useState('');

  const testAPI = async () => {
    setTesting(true);
    setResult('Testing...');
    
    const apiKey = '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';
    
    try {
      // 直接测试 API
      const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
          'HTTP-Referer': window.location.origin,
          'X-Title': 'SuperClaude Test'
        },
        body: JSON.stringify({
          model: 'google/gemini-2.0-flash-exp:free',
          messages: [
            {
              role: 'user',
              content: 'Say hello'
            }
          ]
        })
      });
      
      const data = await response.text();
      console.log('Test response:', { status: response.status, data });
      
      if (response.ok) {
        setResult(`Success! Status: ${response.status}`);
      } else {
        setResult(`Error ${response.status}: ${data}`);
      }
    } catch (error) {
      console.error('Test error:', error);
      setResult(`Error: ${error}`);
    } finally {
      setTesting(false);
    }
  };

  return (
    <div className="fixed bottom-4 left-4 bg-white border border-gray-300 rounded-lg shadow-lg p-3">
      <button
        onClick={testAPI}
        disabled={testing}
        className="bg-purple-500 text-white px-4 py-2 rounded text-sm disabled:bg-gray-400"
      >
        {testing ? 'Testing...' : 'Test API'}
      </button>
      {result && (
        <div className="mt-2 text-xs text-gray-700 max-w-xs overflow-auto">
          {result}
        </div>
      )}
    </div>
  );
};

export default TestAPIButton;