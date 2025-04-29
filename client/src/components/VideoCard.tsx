import { Link } from 'wouter';
import { Game, Highlight } from '@shared/schema';

interface VideoCardProps {
  item: Game | Highlight;
  isLive?: boolean;
  isHighlight?: boolean;
}

export default function VideoCard({ item, isLive = false, isHighlight = false }: VideoCardProps) {
  const thumbnailUrl = item.thumbnailUrl;
  const title = item.title;
  const sport = item.sport;
  const duration = isHighlight ? (item as Highlight).duration : undefined;
  const views = item.views;
  
  // Format views with K/M for thousands/millions
  const formatViews = (views: number | null) => {
    if (!views) return "0";
    
    if (views >= 1000000) {
      return `${(views / 1000000).toFixed(1)}M`;
    } else if (views >= 1000) {
      return `${(views / 1000).toFixed(1)}K`;
    } else {
      return views.toString();
    }
  };
  
  // Generate the appropriate link
  const linkPath = isHighlight 
    ? `/watch/highlight/${item.id}` 
    : `/watch/${item.id}`;
  
  return (
    <Link href={linkPath}>
      <div className="video-card bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition duration-200 cursor-pointer">
        <div className="relative aspect-video">
          <img 
            src={thumbnailUrl} 
            alt={title} 
            className="w-full h-full object-cover"
            onError={(e) => {
              // Fallback for broken images
              e.currentTarget.src = "https://placehold.co/600x400/e2e8f0/94a3b8?text=No+Preview";
            }}
          />
          <div className="absolute top-2 left-2 flex gap-2">
            {isLive ? (
              <span className="bg-red-600 text-white px-2 py-1 rounded-md text-xs font-medium flex items-center">
                <span className="inline-block w-2 h-2 bg-white rounded-full mr-1 animate-pulse-custom"></span>
                LIVE
              </span>
            ) : (
              duration && (
                <span className="bg-black/70 text-white px-2 py-1 rounded-md text-xs">
                  {duration}
                </span>
              )
            )}
            <span className="bg-black/70 text-white px-2 py-1 rounded-md text-xs capitalize">
              {sport}
            </span>
          </div>
          
          {/* Overlay on hover */}
          <div className="video-overlay absolute inset-0 bg-black/40 opacity-0 flex items-center justify-center">
            <span className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white">
              <i className="fas fa-play"></i>
            </span>
          </div>
          
          {/* Show viewers for live streams */}
          {isLive && (
            <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-xs">
              {formatViews(views)} viewers
            </div>
          )}
        </div>
        
        <div className="p-3">
          <h3 className="font-semibold text-lg line-clamp-2">{title}</h3>
          {isHighlight ? (
            <p className="text-gray-600 text-sm mt-1">{formatViews(views)} views</p>
          ) : (
            <p className="text-gray-600 text-sm mt-1">{(item as Game).description}</p>
          )}
        </div>
      </div>
    </Link>
  );
}
