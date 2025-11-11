'use client';

import { useState } from 'react';

interface ApiResponse {
  message: string;
  timestamp: string;
  functionName: string;
  requestMethod: string;
}

export default function HelloApiDemo() {
  const [response, setResponse] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [name, setName] = useState('World');

  const callApi = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const res = await fetch(`/api/helloWorld`);
      
      if (!res.ok) {
        throw new Error(`API call failed: ${res.status}`);
      }
      
      const data: ApiResponse = await res.json();
      setResponse(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-2xl p-6 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700">
      <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">
        🚀 Azure Functions API Demo
      </h2>
      
      <div className="mb-4">
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Enter your name:
        </label>
        <div className="flex gap-2">
          <button
            onClick={callApi}
            disabled={loading}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            {loading ? '⏳' : '📞'} Call API
          </button>
        </div>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-100 dark:bg-red-900 border border-red-300 dark:border-red-700 rounded-md">
          <p className="text-red-700 dark:text-red-300 font-medium">❌ Error:</p>
          <p className="text-red-600 dark:text-red-400">{error}</p>
        </div>
      )}

      {response && (
        <div className="bg-green-50 dark:bg-green-900 border border-green-200 dark:border-green-700 rounded-md p-4">
          <div className="mt-3 p-3 bg-gray-100 dark:bg-gray-700 rounded">
            <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">Raw JSON Response:</p>
            <pre className="text-xs font-mono text-gray-800 dark:text-gray-200 overflow-x-auto">
              {JSON.stringify(response, null, 2)}
            </pre>
          </div>
        </div>
      )}

      <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
        <p>
          💡 This component demonstrates the integration between your Next.js frontend and Azure Functions backend.
        </p>
        <p className="mt-1">
          🔗 API Endpoint: <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">/api/helloWorld</code>
        </p>
      </div>
    </div>
  );
}