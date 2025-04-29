import { Link } from 'wouter';
import { Team } from '@shared/schema';
import { Skeleton } from '@/components/ui/skeleton';

interface FeaturedTeamsProps {
  teams: Team[];
  isLoading: boolean;
}

export default function FeaturedTeams({ teams, isLoading }: FeaturedTeamsProps) {
  // Skeleton for loading state
  const renderSkeletons = () => {
    return Array(6).fill(0).map((_, index) => (
      <div key={index} className="bg-white rounded-lg overflow-hidden shadow-md text-center p-4">
        <div className="w-16 h-16 rounded-full bg-gray-200 mx-auto mb-3"></div>
        <Skeleton className="h-5 w-3/4 mx-auto mb-2" />
        <Skeleton className="h-4 w-1/2 mx-auto" />
      </div>
    ));
  };

  return (
    <section className="py-8 px-4">
      <div className="container mx-auto">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">Featured Teams</h2>
          <Link href="/teams" className="text-primary hover:text-primary-dark font-medium flex items-center">
            View All <i className="fas fa-arrow-right ml-1"></i>
          </Link>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {isLoading ? (
            renderSkeletons()
          ) : teams.length > 0 ? (
            teams.map(team => (
              <div key={team.id} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition duration-200 text-center p-4">
                <div className="w-16 h-16 rounded-full bg-gray-200 mx-auto mb-3 overflow-hidden">
                  <img 
                    src={`${team.logoUrl}?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&h=100&q=80`} 
                    alt={team.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="font-semibold text-base">{team.name}</h3>
                <p className="text-gray-600 text-xs capitalize">{team.sport}</p>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-8">
              <p className="text-gray-500">No teams available.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
