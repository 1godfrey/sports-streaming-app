-- Seed users
INSERT INTO users (username, password) VALUES
('alice', 'hashedpassword1'),
('bob', 'hashedpassword2'),
('charlie', 'hashedpassword3'),
('david', 'hashedpassword4'),
('emma', 'hashedpassword5'),
('frank', 'hashedpassword6'),
('grace', 'hashedpassword7'),
('hannah', 'hashedpassword8'),
('ivan', 'hashedpassword9'),
('julia', 'hashedpassword10');

-- Seed games
INSERT INTO games (title, sport, is_live, video_url, thumbnail_url, start_time, end_time, description) VALUES
('City Clash', 'Football', true, 'https://video1.com', 'https://thumb1.com', NOW(), NOW() + INTERVAL '2 hours', 'Intense football match.'),
('Court Kings', 'Basketball', false, 'https://video2.com', 'https://thumb2.com', NOW() - INTERVAL '1 day', NOW() - INTERVAL '22 hours', 'Semi-final showdown.'),
('Net Smash', 'Tennis', true, 'https://video3.com', 'https://thumb3.com', NOW(), NULL, 'Quarterfinal match in progress.'),
('Track Speed', 'Athletics', false, 'https://video4.com', 'https://thumb4.com', NOW() - INTERVAL '2 days', NOW() - INTERVAL '1 day', '100m sprint final.'),
('Powerplay', 'Cricket', false, 'https://video5.com', 'https://thumb5.com', NOW() - INTERVAL '3 days', NOW() - INTERVAL '2 days', 'Day/night ODI.'),
('Snow Derby', 'Hockey', true, 'https://video6.com', 'https://thumb6.com', NOW(), NULL, 'Winter league match.'),
('Ring Rumble', 'Wrestling', false, 'https://video7.com', 'https://thumb7.com', NOW() - INTERVAL '5 days', NOW() - INTERVAL '4 days', 'Championship final.'),
('Beach Serve', 'Volleyball', false, 'https://video8.com', 'https://thumb8.com', NOW() - INTERVAL '7 days', NOW() - INTERVAL '6 days', 'Summer volleyball event.'),
('Fast Track', 'Formula 1', false, 'https://video9.com', 'https://thumb9.com', NOW() - INTERVAL '10 days', NOW() - INTERVAL '9 days', 'Grand Prix in Monaco.'),
('Fight Night', 'Boxing', false, 'https://video10.com', 'https://thumb10.com', NOW() - INTERVAL '12 hours', NOW(), 'Main card and undercard highlights.');

-- Seed highlights
INSERT INTO highlights (game_id, title, clip_url, thumbnail_url, duration, sport) VALUES
(1, 'Epic Goal', 'https://clip1.com', 'https://thumb1.com', '00:01:12', 'Football'),
(1, 'Last Minute Save', 'https://clip2.com', 'https://thumb2.com', '00:00:45', 'Football'),
(2, '3-Point Buzzer', 'https://clip3.com', 'https://thumb3.com', '00:00:30', 'Basketball'),
(3, 'Smash Ace', 'https://clip4.com', 'https://thumb4.com', '00:00:20', 'Tennis'),
(4, 'Lightning Sprint', 'https://clip5.com', 'https://thumb5.com', '00:00:10', 'Athletics'),
(5, 'Boundary Blitz', 'https://clip6.com', 'https://thumb6.com', '00:01:00', 'Cricket'),
(1, 'Team Celebration', 'https://clip7.com', 'https://thumb7.com', '00:00:50', 'Football'),
(2, 'Player Dunk', 'https://clip8.com', 'https://thumb8.com', '00:00:35', 'Basketball'),
(3, 'Rally Replay', 'https://clip9.com', 'https://thumb9.com', '00:01:05', 'Tennis'),
(4, 'Record Breaker', 'https://clip10.com', 'https://thumb10.com', '00:00:40', 'Athletics');

-- Seed teams
INSERT INTO teams (name, sport, logo_url) VALUES
('City FC', 'Football', 'https://logo1.com'),
('Downtown Hoopers', 'Basketball', 'https://logo2.com'),
('Smash Bros', 'Tennis', 'https://logo3.com'),
('Speed Demons', 'Athletics', 'https://logo4.com'),
('Night Strikers', 'Cricket', 'https://logo5.com'),
('Ice Blazers', 'Hockey', 'https://logo6.com'),
('Ring Masters', 'Wrestling', 'https://logo7.com'),
('Beach Brawlers', 'Volleyball', 'https://logo8.com'),
('Track Titans', 'Formula 1', 'https://logo9.com'),
('Iron Fists', 'Boxing', 'https://logo10.com');