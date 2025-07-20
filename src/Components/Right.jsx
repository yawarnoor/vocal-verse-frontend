import React, { useState, useRef, useEffect } from "react";

export default function Right(props) {
  const { setFile, setAudioStream, setCurrentPage } = props;

  const [recordingStatus, setRecordingStatus] = useState("inactive");
  const [audioChunks, setAudioChunks] = useState([]);
  const [duration, setDuration] = useState(0);

  const mediaRecorder = useRef(null);
  const mimeType = "audio/webm";

  async function startRecording() {
    let tempStream;

    console.log("Start Recording");

    try {
      const streamData = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: false,
      });
      tempStream = streamData;
    } catch (err) {
      console.log(err.message);
      return;
    }

    setRecordingStatus("recording");

    const media = new MediaRecorder(tempStream, { mimeType });
    mediaRecorder.current = media;
    mediaRecorder.current.start();

    let localAudioChunks = [];

    mediaRecorder.current.ondataavailable = (e) => {
      if (typeof e.data === "undefined") return;
      if (e.data.size === 0) return;
      localAudioChunks.push(e.data);
    };

    setAudioChunks(localAudioChunks);
  }

  function stopRecording() {
    setRecordingStatus("inactive");
    mediaRecorder.current.stop();
    mediaRecorder.current.onstop = () => {
      const audioBlob = new Blob(audioChunks, { type: 'audio/webm' });
      setAudioStream(audioBlob);
      setAudioChunks([]);
      setDuration(0);
      setCurrentPage('fileDisplay');
    };
  }

  useEffect(() => {
    if (recordingStatus === "inactive") {
      return;
    }

    const interval = setInterval(() => {
      let curr = duration;
      setDuration((curr = curr + 1));
    }, 1000);

    return () => clearInterval(interval);
  });

  return (
    <div className="h-full flex items-center justify-center p-12">
      <div className="w-full max-w-2xl">
        <div className="card text-center">
          {/* Header */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-slate-900 mb-3">
              Start Your Voice Journey
            </h2>
            <p className="text-lg text-slate-600">
              Record your voice or upload an audio file to get started
            </p>
          </div>

          {/* Recording Section */}
          <div className="mb-10">
            <div className="flex flex-col items-center space-y-6">
              {/* Recording Button */}
              <button
                onClick={recordingStatus == "recording" ? stopRecording : startRecording}
                className={`flex items-center justify-center space-x-3 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200 ${
                  recordingStatus === "recording" 
                    ? "bg-red-600 hover:bg-red-700 text-white shadow-lg" 
                    : "btn-primary text-lg"
                }`}
              >
                <div className={`w-4 h-4 rounded-full ${
                  recordingStatus === "recording" 
                    ? "bg-white animate-pulse-soft" 
                    : "bg-white"
                }`}></div>
                <span>
                  {recordingStatus === "inactive" ? "🎤 Start Recording" : "⏹️ Stop Recording"}
                </span>
              </button>

              {/* Timer */}
              {duration > 0 && (
                <div className="text-center p-4 bg-slate-50 rounded-lg border">
                  <div className="text-2xl font-bold text-blue-600 mb-1">
                    {Math.floor(duration / 60)}:{(duration % 60).toString().padStart(2, '0')}
                  </div>
                  <p className="text-sm text-slate-600">Recording time</p>
                </div>
              )}
            </div>
          </div>

          {/* Divider */}
          <div className="flex items-center mb-10">
            <div className="flex-1 h-px bg-slate-200"></div>
            <span className="px-6 text-slate-500 font-medium">OR</span>
            <div className="flex-1 h-px bg-slate-200"></div>
          </div>

          {/* Upload Section */}
          <div className="mb-8">
            <label className="block w-full">
              <div className="border-2 border-dashed border-slate-300 rounded-lg p-8 text-center hover:border-blue-400 hover:bg-blue-50 transition-all duration-200 cursor-pointer">
                <div className="text-4xl mb-4">📁</div>
                <div className="text-xl font-semibold text-slate-700 mb-2">
                  Upload Audio File
                </div>
                <div className="text-slate-500 mb-4">
                  Supports MP3, WAV, M4A files
                </div>
                <div className="btn-secondary inline-block">
                  Choose File
                </div>
                <input
                  className="hidden"
                  onChange={(e) => {
                    const tempFile = e.target.files[0];
                    setFile(tempFile);
                    setCurrentPage('fileDisplay'); 
                  }}
                  type="file"
                  accept=".mp3, .wav, .m4a"
                />
              </div>
            </label>
          </div>

          {/* Voice Cloning Tip */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-white text-sm">💡</span>
              </div>
              <div className="text-left">
                <h4 className="font-semibold text-slate-900 mb-2">
                  Voice Cloning Pro Tip
                </h4>
                <p className="text-sm text-slate-600 leading-relaxed">
                  For best voice cloning results, record at least <strong>30 seconds</strong> of clear speech. 
                  This audio will be used to clone your voice in any language!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
