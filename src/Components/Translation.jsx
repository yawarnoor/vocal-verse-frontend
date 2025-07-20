import React from 'react';
import { LANGUAGES } from '../utils/Languages';

export default function Translation(props) {
  const { translation, translating, setTranslation, setTranslating, toLanguage, setToLanguage, generateTranslation } = props;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <div className="flex items-center justify-center space-x-3 mb-4">
          <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-xl flex items-center justify-center">
            <span className="text-2xl">🌍</span>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Text Translation</h2>
            <p className="text-gray-600">Translate your transcribed text to any language</p>
          </div>
        </div>
      </div>

      {/* Translation Form */}
      <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-xl p-4">
        <div className="flex items-center space-x-3 mb-3">
          <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
            <span className="text-white text-xs">🌍</span>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 text-sm">Translate Text</h4>
            <p className="text-xs text-gray-600">Choose target language and translate</p>
          </div>
        </div>

        {!translating && (
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <select 
                value={toLanguage} 
                onChange={(e) => setToLanguage(e.target.value)}
                className="input-modern flex-1"
              >
                <option value='Select Language'>🌍 Select Language</option>
                {Object.entries(LANGUAGES).map(([key, value]) => (
                  <option key={key} value={value}>{key}</option>
                ))}
              </select>
              <button
                onClick={generateTranslation}
                disabled={toLanguage === 'Select Language'}
                className="btn-accent px-6 py-3 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                🌍 Translate
              </button>
            </div>
          </div>
        )}

        {/* Loading State */}
        {translating && (
          <div className="text-center py-6">
            <div className="flex items-center justify-center space-x-3">
              <div className="w-6 h-6 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
              <span className="text-base font-semibold text-gray-700">Translating...</span>
            </div>
            <p className="text-xs text-gray-500 mt-2">Converting text to {toLanguage}</p>
          </div>
        )}

        {/* Translation Result */}
        {translation && !translating && (
          <div className="mt-4">
            <div className="bg-white rounded-lg p-4 shadow-sm border border-green-100">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs">✓</span>
                </div>
                <h5 className="font-semibold text-gray-900 text-sm">Translation Result</h5>
              </div>
              <p className="text-gray-800 text-base leading-relaxed">
                {translation}
              </p>
            </div>
            
            <div className="mt-3 flex items-center justify-between">
              <div className="flex items-center space-x-2 text-xs text-gray-500">
                <span>✓</span>
                <span>Translation completed</span>
              </div>
              <button 
                onClick={() => {
                  navigator.clipboard.writeText(translation);
                  // You could add a toast notification here
                }}
                className="btn-secondary text-xs"
              >
                📋 Copy Translation
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Features */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="feature-card text-center p-3">
          <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-2">
            <span className="text-white text-sm">⚡</span>
          </div>
          <h4 className="font-semibold text-gray-900 mb-1 text-sm">Fast Translation</h4>
          <p className="text-xs text-gray-600">Instant results</p>
        </div>
        
        <div className="feature-card text-center p-3">
          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-2">
            <span className="text-white text-sm">🌍</span>
          </div>
          <h4 className="font-semibold text-gray-900 mb-1 text-sm">107+ Languages</h4>
          <p className="text-xs text-gray-600">Global coverage</p>
        </div>
        
        <div className="feature-card text-center p-3">
          <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-2">
            <span className="text-white text-sm">🎯</span>
          </div>
          <h4 className="font-semibold text-gray-900 mb-1 text-sm">High Accuracy</h4>
          <p className="text-xs text-gray-600">AI-powered translation</p>
        </div>
      </div>
    </div>
  );
}
