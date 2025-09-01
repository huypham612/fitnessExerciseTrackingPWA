# Fitness Exercise Tracker PWA

A Progressive Web App for tracking fitness exercises with dates, weights, and notes. Optimized for mobile devices and offline use.

## 📱 Mobile Installation

### iPhone/iPad (iOS 16.4+)
1. Open the app in Safari: https://huypham612.github.io/fitnessExerciseTrackingPWA
2. Tap the Share button (square with arrow)
3. Scroll down and tap "Add to Home Screen"
4. Tap "Add" to install the PWA
5. The app will appear on your home screen like a native app

### Android
1. Open the app in Chrome
2. Tap the menu (three dots)
3. Select "Add to Home Screen" or "Install App"
4. Follow the prompts to install

## 📋 How Sorting Works

### Exercise Organization
The app organizes exercises in a two-level hierarchy:

#### 1. Date Groups (Top Level)
- **Latest dates on top** - Today's workout appears first
- **"No Date" group at bottom** - Exercises without dates

#### 2. Within Each Date Group
- **Older exercises on top** - First exercise added to that date appears first
- **Newer exercises at bottom** - Recently added/moved exercises appear last

### Use Case: Daily Routine
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

### For Updates - Simple Workflow
1. **Edit the files directly** (index.html, sw.js, manifest.json, etc.)
2. **Push to GitHub**:
   ```bash
   git add .
   git commit -m "Update app features"
   git push origin main
   ```
3. **GitHub Pages automatically updates** (usually within 1-2 minutes)
4. **Users get updates automatically** via service worker

### For Users - Getting Updates
The app updates automatically via service worker when you reopen it. If you don't see new changes:

**On Mobile PWA:**
- Close the app completely (swipe up and close)
- Reopen the app from home screen
- New version will download automatically

**On Web Browser:**
- Refresh the page normally
- Service worker will check for updates and apply them