# VocalVerse Frontend

Modern React frontend for VocalVerse - a comprehensive voice processing application.

## Features

- 🎤 **Audio Recording** - Record audio directly in the browser
- 📝 **Speech Transcription** - Real-time audio to text conversion
- 🌍 **Translation** - Translate text between 100+ languages
- 🎭 **Voice Cloning** - Clone and synthesize voices
- 📱 **Responsive Design** - Works on desktop and mobile devices

## Tech Stack

- **React 18** - Modern React with hooks
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **Web Audio API** - Browser audio recording and processing

## Installation

1. Clone the repository:

```bash
git clone <your-repo-url>
cd vocal-verse-frontend
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Backend Configuration

The frontend is configured to use environment variables for the backend URL. You can easily switch between local and deployed backend:

### Using Deployed Backend (Default)

The app is configured to use the deployed Railway backend by default. No changes needed.

### Using Local Backend

1. Create/edit the `.env` file in the project root:

```env
VITE_API_URL=http://localhost:3000
```

2. Make sure your local backend is running on `http://localhost:3000`

3. Restart the development server:

```bash
npm run dev
```

### Configuration File

You can also edit `src/config.js` to change the default backend URL or add additional configuration options.

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Project Structure

```
src/
├── Components/
│   ├── Clone.jsx          # Voice cloning interface
│   ├── FileDisplay.jsx    # Audio file display
│   ├── Information.jsx    # Main information panel
│   ├── Left.jsx          # Left sidebar
│   ├── Right.jsx         # Right sidebar
│   ├── Transcribing.jsx  # Transcription loading
│   ├── Transcription.jsx # Transcription display
│   └── Translation.jsx   # Translation interface
├── utils/
│   └── Languages.js      # Language mappings
├── assets/
│   └── loader.gif        # Loading animation
├── App.jsx               # Main app component
├── main.jsx             # React entry point
└── index.css            # Global styles
```

## Deployment

### Vercel (Recommended)

1. Install Vercel CLI:

```bash
npm install -g vercel
```

2. Deploy:

```bash
vercel
```

### Netlify

1. Build the project:

```bash
npm run build
```

2. Upload the `dist` folder to Netlify or connect your Git repository.

### Static Hosting

Build the project and serve the `dist` folder:

```bash
npm run build
# Serve the dist folder with any static file server
```

## Environment Variables

Create a `.env` file in the root directory if you need to configure the backend URL:

```env
VITE_API_URL=http://localhost:3000
```

## Browser Compatibility

- Chrome 66+
- Firefox 60+
- Safari 12+
- Edge 79+

Requires modern browser with Web Audio API support for audio recording features.
