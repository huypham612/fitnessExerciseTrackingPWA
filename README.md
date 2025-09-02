# Fitness Exercise Tracker PWA

A Progressive Web App for tracking fitness exercises with dates, weights, and notes. Optimized for mobile devices and offline use.

## 📱 Mobile Installation

### iPhone/iPad (iOS 16.4+)
1. Open the app in Safari: https://huypham612.github.io/fitnessExerciseTrackingPWA
2. Tap the Share button (square with arrow)
3. Scroll down and tap "Add to Home Screen"
4. Tap "Add" to install the PWA
5. The app will appear on your home screen like a native app

## Use Case: Daily Routine
Perfect for tracking a routine with the same date:

```
📅 2024-02-15
├── 1. Bench Press (added first)
├── 2. Squats (added second)  
├── 3. Deadlifts (added third)
└── 4. Pull-ups (added last)

📅 2024-01-15
├── 1. Running
└── 2. Push-ups

📅 No Date
└── General exercises
```

## 🚀 Local Development

### Simple Setup
This is a static HTML/CSS/JavaScript app - no build process needed!

```bash
# Option 1: Use Python's built-in server
python -m http.server 8000

# Option 2: Use Node.js serve (if you have it installed)
npx serve .

# Option 3: Use any local server or open index.html directly
```

The app will be available at `http://localhost:8000`

## 🚀 GitHub Pages Deployment

### Initial Setup
1. **Push to GitHub**:
   ```bash
   git add .
   git commit -m "Initial fitness tracker PWA"
   git push origin main
   ```

2. **Enable GitHub Pages**:
   - Go to your repo: Settings → Pages
   - Source: "Deploy from a branch"
   - Branch: "main" (or "master")
   - Folder: "/ (root)"
   - Click "Save"

3. **Your app will be live at**: https://huypham612.github.io/fitnessExerciseTrackingPWA

### Deployment
```bash
# Update version in sw.js to force update
sed -i '' "s/const VERSION = '[^']*'/const VERSION = '1.0.2'/" sw.js

# Push to main branch
git add . && git commit -m "update" && git push

# GitHub Pages auto-deploys
# PWAs auto-update on next visit
```