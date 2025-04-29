import { useQuery } from '@tanstack/react-query';
import { Game, Highlight } from '@shared/schema';
import SportFilters from '../components/SportFilters';
import VideoCard from '../components/VideoCard';
import { Skeleton } from '@/components/ui/skeleton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useParams } from 'wouter';

interface SportPageProps {
  sport?: string;
}

export default function SportPage(props: SportPageProps) {
  // Get sport from URL parameters or props
  const params = useParams();
  const sport = props.sport || params.sport || 'all';
  // Fetch games by sport
  const { 
    data: games = [], 
    isLoading: gamesLoading 
  } = useQuery<Game[]>({ 
    queryKey: [`/api/sports/${sport}`], 
  });

  // Filter live games
  const liveGames = games.filter(game => game.isLive);
  
  // Fetch highlights
  const { 
    data: allHighlights = [], 
    isLoading: highlightsLoading 
  } = useQuery<Highlight[]>({ 
    queryKey: ['/api/highlights'], 
  });
  
  // Filter highlights by sport
  const highlights = sport === 'all' 
    ? allHighlights 
    : allHighlights.filter(highlight => highlight.sport === sport);

  // Skeleton for loading state
  const renderSkeletons = () => {
    return Array(4).fill(0).map((_, index) => (
      <div key={index} className="bg-white rounded-lg overflow-hidden shadow-md">
        <div className="relative aspect-video bg-gray-200"></div>
        <div className="p-3">
          <Skeleton className="h-5 w-full mb-2" />
          <Skeleton className="h-4 w-2/3" />
        </div>
      </div>
    ));
  };

  // Capitalize sport name for display
  const sportName = sport === 'all' ? 'All Sports' : sport.charAt(0).toUpperCase() + sport.slice(1);

  return (
    <main>
      <SportFilters />
      
      <section className="py-8 px-4">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold mb-6">{sportName}</h1>
          
          <Tabs defaultValue="all" className="mb-8">
            <TabsList>
              <TabsTrigger value="all">All Content</TabsTrigger>
              <TabsTrigger value="live">
                Live Now <span className="ml-1 text-xs bg-red-500 rounded-full px-2 text-white">{liveGames.length}</span>
              </TabsTrigger>
              <TabsTrigger value="highlights">Highlights</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all">
              {gamesLoading || highlightsLoading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {renderSkeletons()}
                </div>
              ) : games.length > 0 || highlights.length > 0 ? (
                <>
                  {liveGames.length > 0 && (
                    <div className="mb-6">
                      <h2 className="text-xl font-semibold mb-4 flex items-center">
                        <span className="inline-block w-2 h-2 bg-red-600 rounded-full mr-2 animate-pulse-custom"></span>
                        Live Now
                      </h2>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                        {liveGames.map(game => (
                          <VideoCard key={`live-${game.id}`} item={game} isLive={true} />
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {highlights.length > 0 && (
                    <div>
                      <h2 className="text-xl font-semibold mb-4">Highlights</h2>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                        {highlights.map(highlight => (
                          <VideoCard key={`highlight-${highlight.id}`} item={highlight} isHighlight={true} />
                        ))}
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center py-12 bg-white rounded-lg shadow">
                  <i className="fas fa-video-slash text-gray-400 text-4xl mb-4"></i>
                  <h2 className="text-2xl font-bold text-gray-700 mb-2">No Content Available</h2>
                  <p className="text-gray-500">There are no games or highlights for {sportName.toLowerCase()} at the moment.</p>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="live">
              {gamesLoading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {renderSkeletons()}
                </div>
              ) : liveGames.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {liveGames.map(game => (
                    <VideoCard key={game.id} item={game} isLive={true} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-white rounded-lg shadow">
                  <i className="fas fa-video-slash text-gray-400 text-4xl mb-4"></i>
                  <h2 className="text-2xl font-bold text-gray-700 mb-2">No Live Games</h2>
                  <p className="text-gray-500">There are no live {sportName.toLowerCase()} games at the moment.</p>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="highlights">
              {highlightsLoading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {renderSkeletons()}
                </div>
              ) : highlights.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {highlights.map(highlight => (
                    <VideoCard key={highlight.id} item={highlight} isHighlight={true} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-white rounded-lg shadow">
                  <i className="fas fa-film text-gray-400 text-4xl mb-4"></i>
                  <h2 className="text-2xl font-bold text-gray-700 mb-2">No Highlights</h2>
                  <p className="text-gray-500">There are no {sportName.toLowerCase()} highlights at the moment.</p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </main>
  );
}
