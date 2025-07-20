import React, { useState, useEffect } from 'react';
import Left from './Components/Left';
import Right from './Components/Right';
import './index.css';
import FileDisplay from './Components/FileDisplay';
import Transcribing from './Components/Transcribing';
import Information from './Components/Information';
import { FFmpeg } from '@ffmpeg/ffmpeg';
import { fetchFile } from '@ffmpeg/util';
import { API_URL } from './config';

const ffmpeg = new FFmpeg({ log: true });

const App = () => {
  const [audioFile, setAudioFile] = useState(null);
  const [file, setFile] = useState(null);
  const [audioStream, setAudioStream] = useState(null);
  const [transcription, setTranscription] = useState('');
  const [currentPage, setCurrentPage] = useState('right'); // 'right', 'fileDisplay', 'transcribing', 'information'
  const [isFFmpegLoaded, setIsFFmpegLoaded] = useState(false);

  const testServerConnection = async () => {
    try {
      const response = await fetch(`${API_URL}/test`);
      const data = await response.json();
      console.log("Server test response:", data);
    } catch (error) {
      console.error("Error testing server connection:", error);
      // Don't block the app if server is not ready
    }
  };

  useEffect(() => {
    testServerConnection();
    const loadFFmpeg = async () => {
      try {
        console.log("Loading FFmpeg...");
        await ffmpeg.load();
        setIsFFmpegLoaded(true);
        console.log("FFmpeg loaded successfully");
      } catch (error) {
        console.error("Error loading FFmpeg:", error);
        // Continue without FFmpeg - we'll handle this in conversion
      }
    };

    if (!isFFmpegLoaded) {
      loadFFmpeg();
    }
  }, [isFFmpegLoaded]);

  const convertAudio = async (file) => {
    // Check if FFmpeg is loaded
    if (!isFFmpegLoaded) {
      console.warn("FFmpeg not loaded, attempting to send original file");
      return file; // Return original file if FFmpeg isn't loaded
    }

    try {
      // Determine input file extension based on type
      const inputFileName = file.type === 'audio/webm' ? 'input.webm' : 'input.mkv';
      
      await ffmpeg.writeFile(inputFileName, await fetchFile(file));
      await ffmpeg.exec(['-i', inputFileName, 'output.mp3']);
      const data = await ffmpeg.readFile('output.mp3');
      return new Blob([data.buffer], { type: 'audio/mp3' });
    } catch (error) {
      console.error("Audio conversion failed:", error);
      console.warn("Sending original file format");
      return file; // Fallback to original file
    }
  };

  const handleAudioReset = () => {
    setFile(null);
    setAudioStream(null);
    setTranscription('');
    setCurrentPage('right');
  };

  const handleTranscribe = async () => {

    console.log("transcribe clicked");
    setCurrentPage('transcribing');
    const data = file || audioStream;
    console.log("Audio data:", data);
    setAudioFile(file || audioStream);

    let audioData = data;
    if (data && (data.type === 'audio/x-matroska' || data.type === 'audio/webm')) {
      console.log(`Converting ${data.type} to MP3...`);
      audioData = await convertAudio(data);
      console.log('Audio conversion completed');
    }

    const formData = new FormData();
    formData.append('audio', audioData, audioData.name || 'recorded_audio.mp3');

    try {
      console.log('Transcribing audio...');
      const response = await fetch(`${API_URL}/transcribe`, {
        method: 'POST',
        body: formData,
      });
      console.log("Response status:", response.status);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Unknown error occurred');
      }

      const result = await response.json();
      setTranscription(result.transcription);
      setCurrentPage('information');
    } catch (error) {
      console.error('Error transcribing audio:', error);
      setCurrentPage('right');
      // Optionally, set an error state here to display to the user
    }
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'right':
        return <Right setFile={setFile} setAudioStream={setAudioStream} setCurrentPage={setCurrentPage} />;
      case 'fileDisplay':
        return <FileDisplay file={file} audioStream={audioStream} handleAudioReset={handleAudioReset} handleTranscribe={handleTranscribe} />;
      case 'transcribing':
        return <Transcribing />;
      case 'information':
        return <Information transcription={transcription} audioStream={audioStream} audioFile={audioFile}/>;
      default:
        return null;
    }
  };

  return (
    <div className="main-container">
      <div className="flex h-full">
        <div className="sidebar">
          <Left />
        </div>
        <div className="content-area">
          {renderPage()}
        </div>
      </div>
    </div>
  );  
};

export default App;