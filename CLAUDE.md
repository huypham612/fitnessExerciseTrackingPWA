# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a fitness exercise tracking Progressive Web App (PWA) built with React and TypeScript. The application allows users to track exercises with optional dates, weights, and notes, featuring search/filtering capabilities and exercise reordering within date groups.

## Commands

### Development
- `npm run dev` - Start development server with Vite
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint for code quality
- `npm run type-check` - Run TypeScript compiler for type checking

### Setup
- `npm install` - Install dependencies

## Architecture

- **Build System**: Vite with React and TypeScript
- **PWA Configuration**: Uses vite-plugin-pwa for service worker and manifest generation
- **UI Framework**: Tailwind CSS (loaded via CDN in index.html)
- **Icons**: lucide-react for UI icons
- **State Management**: React hooks (useState) for local component state

## Project Structure

```
/
├── public/          # Static assets and PWA files
│   ├── manifest.json     # PWA manifest
│   ├── sw.js            # Service worker
│   ├── pwa-*.png        # PWA icons
│   └── favicon.ico      # Browser favicon
├── src/             # Source code
│   ├── components/      # React components
│   │   └── FitnessTracker.tsx  # Main app component
│   ├── App.tsx         # App root component
│   └── main.tsx        # React entry point
├── index.html       # HTML template
├── vite.config.ts   # Vite configuration with PWA setup
└── package.json     # Dependencies and scripts
```

## Core Features

### Data Model
- Exercises have: id, name, date (optional), weight (optional), note (optional, max 30 chars), order, createdAt, updatedAt
- Exercises are grouped by date with "No Date" as fallback group
- Ordering is maintained within date groups using order field and creation timestamps

### Key Components
- **Search/Add Interface**: Search bar doubles as quick-add functionality (press Enter to add)
- **Form Modal**: Add/edit form with name (required), date (optional), weight (optional), note (optional with character counter)
- **Exercise Groups**: Exercises displayed grouped by date, sorted newest first
- **Reordering**: Single up arrow button to move exercises up within their date group
- **Notes Display**: Short notes displayed below weight information in exercise cards

### State Management
- `exercises`: Array of exercise objects
- `showAddForm`: Boolean for form visibility
- `editingExercise`: Currently editing exercise or null
- `searchTerm`: Search filter string
- `formData`: Form input state (name, date, weight, note)

## PWA Features

- **Offline Support**: Service worker caches app for offline use
- **Installable**: Can be installed on devices as a native-like app
- **Responsive**: Works on desktop and mobile devices
- **App Shortcuts**: Quick "Add Exercise" shortcut in supported browsers

## Development Notes

- Uses modern React patterns (functional components, hooks)
- Follows controlled component patterns for forms and inputs
- TypeScript for type safety
- ESLint configured for code quality
- Git repository initialized with comprehensive .gitignore