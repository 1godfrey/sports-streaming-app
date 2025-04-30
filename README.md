# 🏟️ King Sports - Free Streaming Platform

🚀 **Project Overview**  
King Sports is a modern, lightweight video streaming platform built to showcase amateur sports games and highlights from around the world — for free.

📺 **Watch Live Games**

🏆 **Explore Game Highlights**

🏀 **Filter by Your Favorite Sports**

🎥 **Upload Your Own Games**

Built for speed, simplicity, and scalability. Monetized through Google Ad Manager and optimized for future growth.

---

## 📦 Features

- **Homepage**: Live Games, Highlights, Upload CTA
- **Live Now Page**: See what's streaming live
- **Upload Portal**: Submit your own games
- **Highlights Section**: Watch quick clips
- **Sports Filter**: Browse by sport category
- **Mobile First**: Fully responsive design

---

## To Run Locally

git clone https://github.com/your-username/amateur-sports-fast.git
cd amateur-sports-fast

## To Install Dependencies

npm install

## Run the development server

npm run dev

## 📂 Project Structure

```bash
/amateur-sports-fast
├── app/
│   ├── page.tsx        # Homepage
│   ├── live/page.tsx   # Live Games
│   ├── sports/[sport]/page.tsx # Games by Sport
│   ├── upload/page.tsx # Upload Game
├── components/
│   ├── VideoCard.tsx   # Video Card Component
│   ├── Header.tsx      # Site Header
├── lib/
│   ├── mongodb.ts      # MongoDB Connection Helper
├── public/
│   ├── placeholder.png # Placeholder Images
├── styles/
│   ├── globals.css     # Global CSS
├── utils/
│   ├── api.ts          # API Fetch Helpers
├── README.md
├── next.config.js
├── tailwind.config.js
└── package.json
