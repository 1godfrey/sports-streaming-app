-- Seed users
INSERT INTO users (username, password) VALUES
('testuser', 'hashedpassword123');

-- Seed games
INSERT INTO games (title, sport, is_live, video_url, thumbnail_url, start_time, description)
VALUES
('Liverpool vs Tottenham | English Premier League 2024/25 | Epl Live Stream | Full Match', 'soccer', true,
 'https://www.youtube.com/watch?v=1OoOhC6c9Uw&pp=ygUSZnJlZSBzb2NjZXIgc3RyZWFt0gcJCYQJAYcqIYzv',
 'https://imageio.forbes.com/specials-images/imageserve/667b9cb16a1e72245c4f32ec/Liverpool-FC-v-Everton-FC---Premier-League/960x0.jpg?format=jpg&width=1440',
 NOW(), 'Championship match with over 5,000 viewers watching now'),

('Division I Tournament: Wildcats vs Tigers', 'basketball', true,
 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
 'https://images2.minutemediacdn.com/image/upload/c_crop,w_3387,h_1905,x_0,y_238/c_fill,w_2160,ar_16:9,f_auto,q_auto,g_auto/images%2FImagnImages%2Fmmsport%2Fwildcats_today%2F01j5b8jnvxd3xrw9syj2.jpg',
 NOW(), 'Regional championship semifinals'),

('University Cup: Northside vs Southside', 'volleyball', true,
 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
 'https://s.hdnux.com/photos/01/34/55/43/24303849/3/rawImage.jpg',
 NOW(), 'College volleyball championship'),

('Fight Night: Martinez vs. Jackson', 'mma', true,
 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
 'https://ufc.com/images/styles/inline/s3/2022-10/101322-Jonathan-Martinez-Punch-GettyImages-1348263818%20copy.jpg?itok=jUXsrhJG',
 NOW(), 'Regional amateur championship bout'),

('City Open: Finals - Smith vs Rodriguez', 'tennis', true,
 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
 'https://www.gosanangelo.com/gcdn/presto/2021/05/21/PARN/38502d6f-47e2-49f4-8b79-75f08f14e535-4D7CB4E4-6413-4F40-A226-EF3BBAECD9AB.jpeg?width=1200&disable=upscale&format=pjpg&auto=webp',
 NOW(), 'Amateur tennis championship');

-- Seed highlights
INSERT INTO highlights (title, sport, clip_url, thumbnail_url, duration)
VALUES
('Incredible Buzzer Beater Wins Championship Game', 'basketball',
 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
 'https://i0.wp.com/thehill.com/wp-content/uploads/sites/2/2023/02/ffd822b1b8794443bd147e042f2dca79.jpg?w=2000&ssl=1', '2:45'),

('Top 5 Goals from Regional Youth Tournament', 'soccer',
 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
 'https://www.rollingstone.com/wp-content/uploads/2024/02/GettyImages-1978935936.jpg?w=1581&h=1054&crop=1', '3:15'),

('Amazing Volleyball Rally in College Tournament', 'volleyball',
 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
 'https://www.ncaa.com/_flysystem/public-s3/styles...FIX_ME', '2:30');  -- You may want to provide a full URL here

-- Teams are not seeded in your current memory data, but here's a sample:
-- INSERT INTO teams (name, sport, logo_url) VALUES
-- ('Tigers', 'basketball', 'https://example.com/tigers.png');
