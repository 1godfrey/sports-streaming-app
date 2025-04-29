import { useQuery } from '@tanstack/react-query';
import { Game } from '@shared/schema';
import SportFilters from '../components/SportFilters';
import VideoCard from '../components/VideoCard';
import { Skeleton } from '@/components/ui/skeleton';

export default function Live() {
  // Fetch live games
  const { 
    data: liveGames = [], 
    isLoading: liveGamesLoading 
  } = useQuery<Game[]>({ 
    queryKey: ['/api/live'], 
  });

  // Skeleton for loading state
  const renderSkeletons = () => {
    return Array(8).fill(0).map((_, index) => (
      <div key={index} className="bg-white rounded-lg overflow-hidden shadow-md">
        <div className="relative aspect-video bg-gray-200"></div>
        <div className="p-3">
          <Skeleton className="h-5 w-full mb-2" />
          <Skeleton className="h-4 w-2/3" />
        </div>
      </div>
    ));
  };

  return (
    <main>
      <SportFilters />
      
      <section className="py-8 px-4">
        <div className="container mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold flex items-center">
              <span className="inline-block w-3 h-3 bg-red-600 rounded-full mr-2 animate-pulse-custom"></span>
              Live Now
            </h1>
          </div>
          
          {liveGamesLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {renderSkeletons()}
            </div>
          ) : liveGames.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {liveGames.map(game => (
                <VideoCard key={game.id} item={game} isLive={true} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white rounded-lg shadow">
              <i className="fas fa-video-slash text-gray-400 text-4xl mb-4"></i>
              <h2 className="text-2xl font-bold text-gray-700 mb-2">No Live Games Right Now</h2>
              <p className="text-gray-500">Check back later or browse our highlights section.</p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
