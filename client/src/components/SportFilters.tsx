import { Link, useLocation } from 'wouter';

interface SportFilter {
  name: string;
  path: string;
}

export default function SportFilters() {
  const [currentPath] = useLocation();
  const sport = currentPath.includes('/sports/') ? currentPath.split('/sports/')[1] : 'all';

  const sportFilters: SportFilter[] = [
    { name: 'All Sports', path: '/sports/all' },
    { name: 'Soccer', path: '/sports/soccer' },
    { name: 'Basketball', path: '/sports/basketball' },
    { name: 'MMA', path: '/sports/mma' },
    { name: 'Volleyball', path: '/sports/volleyball' },
    { name: 'Baseball', path: '/sports/baseball' },
    { name: 'Tennis', path: '/sports/tennis' },
    { name: 'Hockey', path: '/sports/hockey' }
  ];

  return (
    <section className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-3 overflow-x-auto">
        <div className="flex space-x-2 items-center">
          {sportFilters.map((filter) => (
            <Link 
              key={filter.path} 
              href={filter.path} 
              className={`${
                (filter.path === '/sports/all' && sport === 'all') || 
                filter.path === `/sports/${sport}`
                  ? 'bg-primary text-white' 
                  : 'bg-gray-200 hover:bg-gray-300'
              } px-4 py-2 rounded-full whitespace-nowrap text-sm font-medium transition`}
            >
              {filter.name}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
