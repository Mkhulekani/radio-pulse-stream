import { Link } from 'react-router-dom';
import { Play, Pause, Clock, Calendar, MapPin } from 'lucide-react';
import { useApp } from '@/contexts/AppContext';
import { DATABASE } from '@/data/database';

const Home = () => {
  const { isPlaying, togglePlay, registerForEvent, registeredEvents, setCurrentTrack, setIsPlaying } = useApp();

  return (
    <div className="pb-24">
      <div className="relative h-[600px] bg-gradient-to-br from-purple-900 via-indigo-900 to-black text-white">
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative max-w-7xl mx-auto px-4 h-full flex flex-col justify-center">
          <h1 className="text-6xl md:text-7xl font-bold mb-4">
            Your Sound.<br />Your Community.
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-purple-200 max-w-2xl">
            Broadcasting the pulse of Johannesburg. Live 24/7.
          </p>
          <div className="flex flex-wrap gap-4">
            <button 
              onClick={togglePlay}
              className="bg-primary px-8 py-4 rounded-full text-lg font-semibold hover:opacity-90 transition-all transform hover:scale-105 flex items-center gap-2"
            >
              {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
              {isPlaying ? 'Pause Live' : 'Listen Live'}
            </button>
            <Link 
              to="/schedule"
              className="border-2 border-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white hover:text-black transition-all"
            >
              View Schedule
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold mb-8">Featured Shows</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {DATABASE.shows.map(show => (
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
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {show.schedule}
                  </span>
                  <span className="text-primary font-semibold">
                    Listen →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className="bg-muted py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">Upcoming Events</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {DATABASE.events.map(event => (
              <div key={event.id} className="bg-card rounded-xl shadow-lg overflow-hidden">
                <img src={event.image} alt={event.title} className="w-full h-48 object-cover" />
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{event.title}</h3>
                  <div className="space-y-2 text-sm text-muted-foreground mb-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      {event.date} at {event.time}
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      {event.location}
                    </div>
                  </div>
                  <p className="text-foreground mb-4">{event.description}</p>
                  <button 
                    onClick={() => registerForEvent(event.id, event.title)}
                    className={`w-full py-2 rounded-full font-semibold transition ${
                      registeredEvents.includes(event.id)
                        ? 'bg-green-500 text-white'
                        : 'bg-primary text-primary-foreground hover:opacity-90'
                    }`}
                  >
                    {registeredEvents.includes(event.id) ? '✓ Registered' : `RSVP - ${event.price ? 'R' + event.price : 'Free'}`}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
