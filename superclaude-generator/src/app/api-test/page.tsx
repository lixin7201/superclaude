'use client';

import React, { useState } from 'react';

export default function APITestPage() {
  const [result, setResult] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const testAPI = async () => {
    setLoading(true);
    setResult('');
    
    const apiKey = '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';
    
    try {
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
              role: 'system',
              content: 'You are a helpful assistant. Reply with a short message.'
            },
            {
              role: 'user',
              content: 'Say hello in Chinese'
            }
          ],
          temperature: 0.7,
          max_tokens: 100
        })
      });

      const data = await response.text();
      
      if (!response.ok) {
        setResult(`Error ${response.status}: ${data}`);
      } else {
        const jsonData = JSON.parse(data);
        setResult(`Success! Response: ${JSON.stringify(jsonData, null, 2)}`);
      }
    } catch (error) {
      setResult(`Error: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">OpenRouter API Test</h1>
        
        <button
          onClick={testAPI}
          disabled={loading}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-gray-400 mb-4"
        >
          {loading ? 'Testing...' : 'Test API Connection'}
        </button>
        
        {result && (
          <pre className="bg-white p-4 rounded shadow overflow-auto">
            {result}
          </pre>
        )}
        
        <div className="mt-4 p-4 bg-yellow-50 rounded">
          <p className="text-sm">
            <strong>API Key:</strong> {apiKey.substring(0, 20)}...
          </p>
          <p className="text-sm mt-2">
            <strong>Endpoint:</strong> https://openrouter.ai/api/v1/chat/completions
          </p>
          <p className="text-sm mt-2">
            <strong>Model:</strong> google/gemini-2.0-flash-exp:free
          </p>
        </div>
      </div>
    </div>
  );
}