import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Clock } from 'lucide-react';
import { DATABASE } from '@/data/database';

const Shows = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredShows = DATABASE.shows.filter(show => 
    show.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    show.genre.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 pb-24">
      <h1 className="text-4xl font-bold mb-8">All Shows</h1>
      
      <div className="mb-8 relative">
        <Search className="absolute left-4 top-4 text-muted-foreground w-5 h-5" />
        <input 
          type="text"
          placeholder="Search shows..."
          className="w-full pl-12 pr-4 py-4 border-2 border-input rounded-lg focus:border-primary focus:outline-none bg-card"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {filteredShows.map(show => (
          <Link 
            key={show.id}
            to={`/shows/${show.id}`}
            className="bg-card rounded-xl shadow-lg overflow-hidden cursor-pointer hover:shadow-2xl transition-all transform hover:-translate-y-2"
          >
            <img src={show.artwork} alt={show.name} className="w-full h-48 object-cover" />
            <div className="p-6">
              <div className="text-sm text-primary font-semibold mb-2">{show.genre}</div>
              <h3 className="text-xl font-bold mb-2">{show.name}</h3>
              <p className="text-muted-foreground text-sm mb-4">{show.description}</p>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Host: {show.host}</span>
                <span className="flex items-center gap-1 text-muted-foreground">
                  <Clock className="w-4 h-4" />
                  {show.schedule.split(',')[0]}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {filteredShows.length === 0 && (
        <div className="text-center py-16">
          <p className="text-xl text-muted-foreground">No shows found matching "{searchQuery}"</p>
        </div>
      )}
    </div>
  );
};

export default Shows;
