import { Link } from 'wouter';
import { Game } from '@shared/schema';

interface HeroSectionProps {
  featuredGame?: Game;
  isLoading?: boolean;
}

export default function HeroSection({ featuredGame, isLoading = false }: HeroSectionProps) {
  // If loading or no featured game, show skeleton
  if (isLoading || !featuredGame) {
    return (
      <section className="relative">
        <div className="relative aspect-video max-h-[70vh] overflow-hidden w-full bg-gray-200 animate-pulse">
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-4 md:p-8">
            <div className="h-6 w-24 bg-gray-400 rounded mb-2"></div>
            <div className="h-10 w-3/4 bg-gray-400 rounded mb-2"></div>
            <div className="h-4 w-1/2 bg-gray-400 rounded mb-4"></div>
            <div className="flex flex-wrap gap-2">
              <div className="h-10 w-32 bg-gray-400 rounded"></div>
              <div className="h-10 w-32 bg-gray-400 rounded"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative">
      <div className="relative aspect-video max-h-[70vh] overflow-hidden w-full">
        <img 
          src={`${featuredGame.thumbnailUrl}?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&h=1080&q=80`} 
          alt={featuredGame.title} 
          className="w-full h-full object-cover"
        />
        {/* Video Hero Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-4 md:p-8">
          <div className="flex items-center space-x-2 mb-2">
            <span className="bg-red-600 text-white px-2 py-1 rounded-md text-xs font-medium flex items-center">
              <span className="inline-block w-2 h-2 bg-white rounded-full mr-1 animate-pulse-custom"></span>
              LIVE NOW
            </span>
            <span className="bg-gray-800/80 text-white px-2 py-1 rounded-md text-xs capitalize">{featuredGame.sport}</span>
          </div>
          <h1 className="text-white text-xl md:text-3xl lg:text-4xl font-bold mb-2">{featuredGame.title}</h1>
          <p className="text-gray-200 text-sm md:text-base mb-4">{featuredGame.description}</p>
          <div className="flex flex-wrap gap-2">
            <Link href={`/watch/${featuredGame.id}`}>
              <button className="bg-primary hover:bg-primary-dark text-white px-4 py-2 md:px-6 md:py-3 rounded-md font-medium flex items-center transition duration-200">
                <i className="fas fa-play mr-2"></i> Watch Live
              </button>
            </Link>
            <button className="bg-gray-800/70 hover:bg-gray-800 text-white px-4 py-2 md:px-6 md:py-3 rounded-md font-medium flex items-center transition duration-200">
              <i className="fas fa-share-alt mr-2"></i> Share
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
