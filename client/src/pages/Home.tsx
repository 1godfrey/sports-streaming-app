import { useQuery } from '@tanstack/react-query';
import SportFilters from '../components/SportFilters';
import HeroSection from '../components/HeroSection';
import LiveNowSection from '../components/LiveNowSection';
import HighlightsSection from '../components/HighlightsSection';
import UploadCTA from '../components/UploadCTA';
import FeaturedTeams from '../components/FeaturedTeams';
import { Game, Highlight, Team } from '@shared/schema';

export default function Home() {
  // Fetch live games
  const { 
    data: liveGames = [], 
    isLoading: liveGamesLoading 
  } = useQuery<Game[]>({ 
    queryKey: ['/api/live'], 
  });

  // Fetch highlights
  const { 
    data: highlights = [], 
    isLoading: highlightsLoading 
  } = useQuery<Highlight[]>({ 
    queryKey: ['/api/highlights'], 
  });

  // Fetch teams
  const { 
    data: teams = [], 
    isLoading: teamsLoading 
  } = useQuery<Team[]>({ 
    queryKey: ['/api/teams'], 
  });

  // Get featured game for hero (first live game)
  const featuredGame = liveGames.length > 0 ? liveGames[0] : undefined;

  return (
    <main>
      <SportFilters />
      <HeroSection featuredGame={featuredGame} isLoading={liveGamesLoading} />
      <LiveNowSection games={liveGames} isLoading={liveGamesLoading} />
      <HighlightsSection highlights={highlights} isLoading={highlightsLoading} />
      <UploadCTA />
      <FeaturedTeams teams={teams} isLoading={teamsLoading} />
    </main>
  );
}
