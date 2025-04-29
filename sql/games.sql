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
