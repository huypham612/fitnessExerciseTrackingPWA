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

### Prerequisites
- Node.js (v16 or higher)
- npm

### Setup
```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:5173`

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
   - Source: "GitHub Actions"
   - The workflow will run automatically

3. **Your app will be live at**: https://huypham612.github.io/fitnessExerciseTrackingPWA

### For Updates - Simplified Workflow
1. **Make your code changes**
2. **Push to GitHub**:
   ```bash
   git add .
   git commit -m "Add new features"
   git push origin master
   ```
3. **GitHub Actions automatically builds and deploys**
4. **Users get updates automatically** via service worker

### For Users - Getting Updates
The app updates automatically via service worker, but if you don't see new changes:

**On Mobile PWA:**
- Close the app completely
- Reopen the app
- If changes still don't appear, clear the app's cache in Settings > Safari > Clear Website Data

**On Web Browser:**
- Hard refresh: `Ctrl+F5` (Windows) or `Cmd+Shift+R` (Mac)
- Or clear browser cache for the site