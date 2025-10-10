import { Link } from 'react-router-dom';
import { DATABASE } from '@/data/database';

const Schedule = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12 pb-24">
      <h1 className="text-4xl font-bold mb-8">Weekly Schedule</h1>
      <div className="bg-card rounded-xl shadow-lg p-8">
        <div className="space-y-6">
          {DATABASE.shows.map(show => (
            <Link 
              key={show.id} 
              to={`/shows/${show.id}`}
              className="flex items-center gap-6 p-4 hover:bg-muted rounded-lg transition cursor-pointer"
            >
              <img src={show.artwork} alt={show.name} className="w-20 h-20 rounded-lg" />
              <div className="flex-1">
                <h3 className="font-bold text-lg">{show.name}</h3>
                <p className="text-muted-foreground">{show.host}</p>
              </div>
              <div className="text-right">
                <p className="font-semibold text-primary">{show.schedule}</p>
                <p className="text-sm text-muted-foreground">{show.genre}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Schedule;
