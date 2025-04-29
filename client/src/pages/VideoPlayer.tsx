import { useEffect } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { Game, Highlight } from '@shared/schema';
import { Skeleton } from '@/components/ui/skeleton';
import { apiRequest, queryClient } from '@/lib/queryClient';
import ReactPlayer from 'react-player/lazy';
import { useParams } from 'wouter';

interface VideoPlayerProps {
  id?: string;
  isHighlight?: boolean;
}

export default function VideoPlayer(props: VideoPlayerProps) {
  const params = useParams();
  const id = (props.id !== undefined ? props.id : params.id) || '0';
  const isHighlight = props.isHighlight || false;
  const numericId = parseInt(id);
  
  // Query for game or highlight data
  const { 
    data: videoData, 
    isLoading 
  } = useQuery<Game | Highlight>({ 
    queryKey: [isHighlight ? `/api/highlights/${numericId}` : `/api/games/${numericId}`], 
  });
  
  // Mutation to increment views
  const incrementViewsMutation = useMutation({
    mutationFn: async () => {
      return await apiRequest(
        'PUT', 
        isHighlight ? `/api/highlights/${numericId}/views` : `/api/games/${numericId}/views`,
        {}
      );
    },
    onSuccess: () => {
      // Invalidate the cache for this specific video
      queryClient.invalidateQueries({ 
        queryKey: [isHighlight ? `/api/highlights/${numericId}` : `/api/games/${numericId}`]
      });
    }
  });
  
  // Increment views on component mount
  useEffect(() => {
    if (!isLoading && videoData) {
      incrementViewsMutation.mutate();
    }
  }, [videoData, isLoading]);
  
  if (isLoading) {
    return (
      <div className="container mx-auto p-4 max-w-6xl">
        <div className="aspect-video w-full bg-gray-200 mb-4">
          <Skeleton className="h-full w-full" />
        </div>
        <Skeleton className="h-8 w-3/4 mb-2" />
        <Skeleton className="h-4 w-1/2" />
      </div>
    );
  }
  
  if (!videoData) {
    return (
      <div className="container mx-auto p-4 max-w-6xl text-center py-12">
        <i className="fas fa-exclamation-circle text-red-500 text-4xl mb-4"></i>
        <h2 className="text-2xl font-bold mb-2">Video Not Found</h2>
        <p className="text-gray-600">The video you're looking for doesn't exist or has been removed.</p>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto p-4 pb-16 max-w-6xl">
      {/* Video player */}
      <div className="aspect-video w-full bg-black mb-4 rounded-lg overflow-hidden">
        <ReactPlayer
          url={isHighlight ? (videoData as Highlight).clipUrl : (videoData as Game).videoUrl}
          width="100%"
          height="100%"
          controls
          playing
          fallback={<div className="w-full h-full flex items-center justify-center bg-gray-900 text-white">Loading video...</div>}
          config={{
            youtube: {
              playerVars: { showinfo: 1 }
            },
            file: {
              forceVideo: true
            }
          }}
        />
      </div>
      
      {/* Video details */}
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold mb-2">{videoData.title}</h1>
        <div className="flex flex-wrap items-center gap-2 text-sm text-gray-600">
          <span className="bg-gray-200 px-2 py-1 rounded-md capitalize">{videoData.sport}</span>
          {isHighlight ? (
            <span>{(videoData as Highlight).views} views</span>
          ) : (
            (videoData as Game).isLive && (
              <span className="bg-red-600 text-white px-2 py-1 rounded-md text-xs font-medium flex items-center">
                <span className="inline-block w-2 h-2 bg-white rounded-full mr-1 animate-pulse-custom"></span>
                LIVE
              </span>
            )
          )}
        </div>
      </div>
      
      {/* Description for games */}
      {!isHighlight && (videoData as Game).description && (
        <div className="bg-white p-4 rounded-lg shadow-sm mb-8">
          <h2 className="text-lg font-semibold mb-2">Description</h2>
          <p className="text-gray-700">{(videoData as Game).description}</p>
        </div>
      )}
    </div>
  );
}
