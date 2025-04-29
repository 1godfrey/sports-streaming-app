import { Link } from 'wouter';
import { Game } from '@shared/schema';
import VideoCard from './VideoCard';
import { Skeleton } from '@/components/ui/skeleton';

interface LiveNowSectionProps {
  games: Game[];
  isLoading: boolean;
}

export default function LiveNowSection({ games, isLoading }: LiveNowSectionProps) {
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

  return (
    <section className="py-8 px-4">
      <div className="container mx-auto">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold flex items-center">
            <span className="inline-block w-3 h-3 bg-red-600 rounded-full mr-2 animate-pulse-custom"></span>
            Live Now
          </h2>
          <Link href="/live" className="text-primary hover:text-primary-dark font-medium flex items-center">
            View All <i className="fas fa-arrow-right ml-1"></i>
          </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {isLoading ? (
            renderSkeletons()
          ) : games.length > 0 ? (
            games.map(game => (
              <VideoCard key={game.id} item={game} isLive={true} />
            ))
          ) : (
            <div className="col-span-full text-center py-8">
              <p className="text-gray-500">No live games available right now.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
