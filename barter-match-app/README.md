# 🎯 Barter Match System

A React web application for matching people who want to barter/trade services.

## 🚀 Quick Start

### Step 1: Install Dependencies

```bash
cd /Users/aleenamudassar/Downloads/barter-match-app
npm install
```

### Step 2: Run the App

```bash
npm run dev
```

### Step 3: Open in Browser

The app will start on `http://localhost:5173` (or another port if 5173 is busy)

Open your browser and go to the URL shown in the terminal!

---

## 📋 Complete Setup Instructions

### Prerequisites

- Node.js installed (download from https://nodejs.org/ if needed)
- npm (comes with Node.js)

### Installation Steps

1. **Navigate to project folder:**
   ```bash
   cd /Users/aleenamudassar/Downloads/barter-match-app
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```
   This will take 1-2 minutes to download all packages.

3. **Start development server:**
   ```bash
   npm run dev
   ```

4. **Open in browser:**
   - The terminal will show a URL like `http://localhost:5173`
   - Open this URL in your web browser
   - The app will automatically reload when you make changes!

---

## 🎨 Features

- ✅ User registration and profile creation
- ✅ Service matching (find people who want what you offer and offer what you want)
- ✅ Perfect matches (bidirectional matching)
- ✅ Partial matches (one-way matching)
- ✅ Chat system for coordinating trades
- ✅ Active trades management
- ✅ Beautiful UI with Tailwind CSS
- ✅ Responsive design

---

## 🛠️ Available Commands

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

---

## 📁 Project Structure

```
barter-match-app/
├── src/
│   ├── App.tsx          # Main component
│   ├── main.tsx         # Entry point
│   └── index.css        # Tailwind CSS
├── index.html           # HTML template
├── package.json         # Dependencies
├── vite.config.ts       # Vite configuration
├── tailwind.config.js   # Tailwind CSS config
└── tsconfig.json        # TypeScript config
```

---

## 🔧 Troubleshooting

**Issue: "command not found: npm"**
- Install Node.js from https://nodejs.org/

**Issue: "Port 5173 already in use"**
- Vite will automatically use another port
- Check the terminal for the correct URL

**Issue: Module not found errors**
- Make sure you ran `npm install`
- Delete `node_modules` and `package-lock.json`, then run `npm install` again

**Issue: TypeScript errors**
- Make sure all dependencies are installed
- Try `npm install` again

---

## 🌐 How to Use

1. **Create Profile:**
   - Enter your name, location
   - What you can offer (e.g., "Guitar Lessons")
   - What you're seeking (e.g., "Web Design")
   - Click "Create Profile & Find Matches"

2. **Find Matches:**
   - The search fields are pre-filled with your profile info
   - Click "Find Matches" to see results
   - Perfect matches show in green
   - Partial matches show in blue

3. **Accept Trade:**
   - Click "Accept Trade" on any match
   - This opens a chat with that person

4. **Chat:**
   - Send messages to coordinate the trade
   - The system auto-replies (simulated responses)
   - Go back to see all your active trades

---

Enjoy using Barter Match System! 🎉
