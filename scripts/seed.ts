// seed.ts
import { drizzle } from 'drizzle-orm/node-postgres';
import { Client } from 'pg';
import { games, highlights, teams } from '../shared/schema';
import { eq } from 'drizzle-orm';

const client = new Client({
  connectionString: process.env.DATABASE_URL,
});

const db = drizzle(client);

async function seed() {
  await client.connect();

  // Sample games
  const gamesData = [
    {
      title: "Liverpool vs Tottenham | English Premier League 2024/25 | Epl Live Stream | Full Match",
      sport: "soccer",
      isLive: true,
      videoUrl: "https://www.youtube.com/watch?v=1OoOhC6c9Uw&pp=ygUSZnJlZSBzb2NjZXIgc3RyZWFt0gcJCYQJAYcqIYzv",
      thumbnailUrl: "https://imageio.forbes.com/specials-images/imageserve/667b9cb16a1e72245c4f32ec/Liverpool-FC-v-Everton-FC---Premier-League/960x0.jpg?format=jpg&width=1440",
      startTime: new Date(),
      description: "Championship match with over 5,000 viewers watching now",
    },
    {
      title: "Division I Tournament: Wildcats vs Tigers",
      sport: "basketball",
      isLive: true,
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
      thumbnailUrl: "https://images2.minutemediacdn.com/image/upload/c_crop,w_3387,h_1905,x_0,y_238/c_fill,w_2160,ar_16:9,f_auto,q_auto,g_auto/images%2FImagnImages%2Fmmsport%2Fwildcats_today%2F01j5b8jnvxd3xrw9syj2.jpg",
      startTime: new Date(),
      description: "Regional championship semifinals",
    },
    {
      title: "University Cup: Northside vs Southside",
      sport: "volleyball",
      isLive: true,
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
      thumbnailUrl: "https://s.hdnux.com/photos/01/34/55/43/24303849/3/rawImage.jpg",
      startTime: new Date(),
      description: "College volleyball championship",
    },
    {
      title: "Fight Night: Martinez vs. Jackson",
      sport: "mma",
      isLive: true,
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
      thumbnailUrl: "https://ufc.com/images/styles/inline/s3/2022-10/101322-Jonathan-Martinez-Punch-GettyImages-1348263818%20copy.jpg?itok=jUXsrhJG",
      startTime: new Date(),
      description: "Regional amateur championship bout",
    },
    {
      title: "City Open: Finals - Smith vs Rodriguez",
      sport: "tennis",
      isLive: true,
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
      thumbnailUrl: "https://www.gosanangelo.com/gcdn/presto/2021/05/21/PARN/38502d6f-47e2-49f4-8b79-75f08f14e535-4D7CB4E4-6413-4F40-A226-EF3BBAECD9AB.jpeg?width=1200&disable=upscale&format=pjpg&auto=webp",
      startTime: new Date(),
      description: "Amateur tennis championship",
    },
  ];

  // Sample highlights
  const highlightsData = [
    {
      title: "Incredible Buzzer Beater Wins Championship Game",
      sport: "basketball",
      clipUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
      thumbnailUrl: "https://i0.wp.com/thehill.com/wp-content/uploads/sites/2/2023/02/ffd822b1b8794443bd147e042f2dca79.jpg?w=2000&ssl=1",
      duration: "2:45",
    },
    {
      title: "Top 5 Goals from Regional Youth Tournament",
      sport: "soccer",
      clipUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
      thumbnailUrl: "https://www.rollingstone.com/wp-content/uploads/2024/02/GettyImages-1978935936.jpg?w=1581&h=1054&crop=1",
      duration: "3:15",
    },
    {
      title: "Amazing Volleyball Rally in College Tournament",
      sport: "volleyball",
      clipUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
      thumbnailUrl: "https://www.ncaa.com/_flysystem/public-s3/styles/original/public-s3/images/2023/07/21/asjia-oneal_0.jpeg?itok=1GpNHzjN",
      duration: "1:45",
    },
    {
      title: "Best Points from Junior Tennis Championship",
      sport: "tennis",
      clipUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4",
      thumbnailUrl: "https://photo-assets.usopen.org/images/pics/large/f_20210825_USO_Q2_PS6_3726.jpg",
      duration: "2:30",
    },
  ];

  // Sample teams
  const teamsData = [
    {
      name: "West Valley Warriors",
      sport: "basketball",
      logoUrl: "https://images.unsplash.com/photo-1546519638-68e109acd27d",
    },
    {
      name: "Eastside United",
      sport: "soccer",
      logoUrl: "https://images.unsplash.com/photo-1575361204480-aadea25e6e68",
    },
    {
      name: "North High Volleyball",
      sport: "volleyball",
      logoUrl: "https://images.unsplash.com/photo-1539635278303-d4002c07eae3",
    },
    {
      name: "Downtown MMA",
      sport: "mma",
      logoUrl: "https://images.unsplash.com/photo-1511886929837-354d827aae26",
    },
    {
      name: "River City Tennis",
      sport: "tennis",
      logoUrl: "https://images.unsplash.com/photo-1562552052-53b67302f6bb",
    },
    {
      name: "Southside Runners",
      sport: "track",
      logoUrl: "https://images.unsplash.com/photo-1553778263-73a83bab9b0c",
    },
  ];

  // Insert data
  await db.insert(games).values(gamesData);
  await db.insert(highlights).values(highlightsData);
  await db.insert(teams).values(teamsData);

  console.log("Seeding complete.");
  await client.end();
}

seed().catch((err) => {
  console.error("Seeding failed:", err);
  client.end();
});
