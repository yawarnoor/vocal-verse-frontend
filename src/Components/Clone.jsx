import React, { useState, useEffect } from 'react';
import { API_URL } from '../config';

export default function Clone({ audioFile, audioStream }) {
  const [text, setText] = useState('');
  const [clonedAudio, setClonedAudio] = useState(null);
  const [isCloning, setIsCloning] = useState(false);
  const [error, setError] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState('en');

  // XTTS supported languages with flags
  const supportedLanguages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'es', name: 'Spanish', flag: '🇪🇸' },
    { code: 'fr', name: 'French', flag: '🇫🇷' },
    { code: 'de', name: 'German', flag: '🇩🇪' },
    { code: 'it', name: 'Italian', flag: '🇮🇹' },
    { code: 'pt', name: 'Portuguese', flag: '🇵🇹' },
    { code: 'pl', name: 'Polish', flag: '🇵🇱' },
    { code: 'tr', name: 'Turkish', flag: '🇹🇷' },
    { code: 'ru', name: 'Russian', flag: '🇷🇺' },
    { code: 'nl', name: 'Dutch', flag: '🇳🇱' },
    { code: 'cs', name: 'Czech', flag: '🇨🇿' },
    { code: 'ar', name: 'Arabic', flag: '🇸🇦' },
    { code: 'zh-cn', name: 'Chinese', flag: '🇨🇳' },
    { code: 'ja', name: 'Japanese', flag: '🇯🇵' },
    { code: 'hu', name: 'Hungarian', flag: '🇭🇺' },
    { code: 'ko', name: 'Korean', flag: '🇰🇷' },
    { code: 'hi', name: 'Hindi', flag: '🇮🇳' }
  ];

  useEffect(() => {
    console.log("Audio file in Clone component:", audioFile);
    console.log("Audio stream in Clone component:", audioStream);
  }, [audioFile, audioStream]);

  const handleClone = async (event) => {
    event.preventDefault();
    setIsCloning(true);
    setError(null);

    if (!text.trim()) {
      setError('Please enter some text to clone.');
      setIsCloning(false);
      return;
    }

    const audioData = audioFile || audioStream;
    if (!audioData) {
      setError('No audio sample available. Please record or upload audio first.');
      setIsCloning(false);
      return;
    }

    console.log("Attempting to clone with audio data:", audioData);

    const formData = new FormData();
    formData.append('text', text);
    formData.append('language', selectedLanguage);
    formData.append('voice_sample', audioData, audioData.name || 'recorded_audio.webm');

    try {
      console.log(`🎭 Cloning voice in ${selectedLanguage} with text: "${text}"`);
              const response = await fetch(`${API_URL}/clone_xtts`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`XTTS voice cloning failed: ${errorText}`);
      }

      const result = await response.json();
      setClonedAudio(result.audio);
    } catch (err) {
      setError('An error occurred during voice cloning: ' + err.message);
      console.error(err);
    } finally {
      setIsCloning(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <div className="flex items-center justify-center space-x-3 mb-4">
          <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-blue-500 rounded-xl flex items-center justify-center">
            <span className="text-2xl">🎭</span>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Cross-Lingual Voice Cloning</h2>
            <p className="text-gray-600">Clone your voice speaking in any language</p>
          </div>
        </div>
      </div>

      {/* Voice Sample Status */}
      <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-xl p-4">
        <div className="flex items-center space-x-3">
          <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
            <span className="text-white text-xs">✓</span>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 text-sm">Voice Sample Ready</h4>
            <p className="text-xs text-gray-600">
              Your recorded audio will be used to clone your voice in the selected language
            </p>
          </div>
        </div>
      </div>

      {/* Cloning Form */}
      <form onSubmit={handleClone} className="space-y-4">
        {/* Language Selection */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            🌍 Target Language
          </label>
          <select
            value={selectedLanguage}
            onChange={(e) => setSelectedLanguage(e.target.value)}
            className="input-modern w-full"
          >
            {supportedLanguages.map((lang) => (
              <option key={lang.code} value={lang.code}>
                {lang.flag} {lang.name}
              </option>
            ))}
          </select>
        </div>

        {/* Text Input */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            💬 Text to Speak
          </label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder={`Enter text to be spoken in ${supportedLanguages.find(l => l.code === selectedLanguage)?.name} using your cloned voice...`}
            className="input-modern w-full resize-none"
            rows="3"
          />
          <p className="text-xs text-gray-500 mt-1">
            The text will be spoken in {supportedLanguages.find(l => l.code === selectedLanguage)?.name} using your voice
          </p>
        </div>

        {/* Clone Button */}
        <button
          type="submit"
          disabled={isCloning}
          className="btn-accent w-full py-3 text-base font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isCloning ? (
            <div className="flex items-center justify-center space-x-3">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>🎭 Cloning Voice...</span>
            </div>
          ) : (
            '🎭 Clone Voice'
          )}
        </button>
      </form>

      {/* Error Display */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4">
          <div className="flex items-center space-x-3">
            <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
              <span className="text-white text-xs">⚠</span>
            </div>
            <p className="text-red-700 font-medium text-sm">{error}</p>
          </div>
        </div>
      )}

      {/* Cloned Audio Player */}
      {clonedAudio && (
        <div className="bg-gradient-to-r from-blue-50 to-orange-50 border border-blue-200 rounded-xl p-4">
          <div className="flex items-center space-x-3 mb-3">
            <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-orange-500 rounded-full flex items-center justify-center">
              <span className="text-white text-xs">🎵</span>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 text-sm">Cloned Voice Audio</h4>
              <p className="text-xs text-gray-600">Your voice speaking in {supportedLanguages.find(l => l.code === selectedLanguage)?.name}</p>
            </div>
          </div>
          
          <audio 
            controls 
            src={`data:audio/wav;base64,${clonedAudio}`}
            className="w-full"
          >
            Your browser does not support the audio element.
          </audio>
          
          <div className="mt-3 flex space-x-3">
            <button 
              onClick={() => {
                const link = document.createElement('a');
                link.href = `data:audio/wav;base64,${clonedAudio}`;
                link.download = `cloned_voice_${selectedLanguage}.wav`;
                link.click();
              }}
              className="btn-secondary text-xs"
            >
              📥 Download Audio
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

