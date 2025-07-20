import React from "react";

export default function Left() {
  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-8 border-b border-slate-200">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white text-lg font-bold">V</span>
          </div>
          <div className="text-2xl font-bold text-slate-900">
            Voice<span className="text-gradient">Verse</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">
            Voice<span className="text-gradient">Verse</span>
          </h1>
          <p className="text-lg text-slate-600 leading-relaxed">
            Transform your voice across <span className="text-blue-600 font-semibold">107+ languages</span> with AI-powered voice cloning
          </p>
        </div>

        {/* Features */}
        <div className="space-y-6 mb-12">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Features</h3>
          
          <div className="feature-card">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <span className="text-2xl">🎤</span>
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-slate-900">Voice Recording</h4>
                <p className="text-sm text-slate-600">Crystal clear audio capture with professional quality</p>
              </div>
            </div>
          </div>

          <div className="feature-card">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                <span className="text-2xl">🌍</span>
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-slate-900">107+ Languages</h4>
                <p className="text-sm text-slate-600">Translate and clone voices across multiple languages</p>
              </div>
            </div>
          </div>

          <div className="feature-card">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-sky-100 rounded-lg flex items-center justify-center">
                <span className="text-2xl">🎭</span>
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-slate-900">Voice Cloning</h4>
                <p className="text-sm text-slate-600">Your voice speaking fluently in any language</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tech Stack */}
        <div className="text-center">
          <p className="text-sm text-slate-500 mb-4">Powered by</p>
          <div className="flex items-center justify-center space-x-3">
            <span className="inline-flex items-center px-3 py-1.5 rounded-md text-xs font-medium bg-blue-100 text-blue-800">
              Whisper AI
            </span>
            <span className="inline-flex items-center px-3 py-1.5 rounded-md text-xs font-medium bg-emerald-100 text-emerald-800">
              XTTS v2
            </span>
            <span className="inline-flex items-center px-3 py-1.5 rounded-md text-xs font-medium bg-sky-100 text-sky-800">
              Free Translate
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
