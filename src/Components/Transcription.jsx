import React from 'react';

export default function Transcription(props) {
  const { transcription } = props;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <div className="flex items-center justify-center space-x-3 mb-4">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-green-500 rounded-xl flex items-center justify-center">
            <span className="text-2xl">📝</span>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Speech Transcription</h2>
            <p className="text-gray-600">Your audio converted to text using Whisper AI</p>
          </div>
        </div>
      </div>

      {/* Transcription Content */}
      <div className="bg-gradient-to-r from-blue-50 to-green-50 border border-blue-200 rounded-xl p-4">
        <div className="flex items-center space-x-3 mb-3">
          <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
            <span className="text-white text-xs">📝</span>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 text-sm">Transcribed Text</h4>
            <p className="text-xs text-gray-600">AI-powered speech recognition</p>
          </div>
        </div>
        
        <div className="bg-white rounded-lg p-4 shadow-sm border border-blue-100">
          <p className="text-gray-800 text-base leading-relaxed">
            {transcription || "No transcription available. Please record or upload audio first."}
          </p>
        </div>

        {transcription && (
          <div className="mt-3 flex items-center justify-between">
            <div className="flex items-center space-x-2 text-xs text-gray-500">
              <span>✓</span>
              <span>Transcription completed</span>
            </div>
            <button 
              onClick={() => {
                navigator.clipboard.writeText(transcription);
                // You could add a toast notification here
              }}
              className="btn-secondary text-xs"
            >
              📋 Copy Text
            </button>
          </div>
        )}
      </div>

      {/* Features */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="feature-card text-center p-3">
          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-2">
            <span className="text-white text-sm">🎯</span>
          </div>
          <h4 className="font-semibold text-gray-900 mb-1 text-sm">High Accuracy</h4>
          <p className="text-xs text-gray-600">Powered by OpenAI Whisper</p>
        </div>
        
        <div className="feature-card text-center p-3">
          <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-2">
            <span className="text-white text-sm">⚡</span>
          </div>
          <h4 className="font-semibold text-gray-900 mb-1 text-sm">Fast Processing</h4>
          <p className="text-xs text-gray-600">Real-time transcription</p>
        </div>
        
        <div className="feature-card text-center p-3">
          <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-2">
            <span className="text-white text-sm">🌍</span>
          </div>
          <h4 className="font-semibold text-gray-900 mb-1 text-sm">Multi-language</h4>
          <p className="text-xs text-gray-600">Supports 107+ languages</p>
        </div>
      </div>
    </div>
  );
}
