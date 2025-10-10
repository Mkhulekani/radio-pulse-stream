import { Link, useParams } from 'react-router-dom';
import { Play, Clock, User } from 'lucide-react';
import { useApp } from '@/contexts/AppContext';
import { DATABASE } from '@/data/database';

const ShowDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { setCurrentTrack, setIsPlaying, showNotification } = useApp();
  
  const show = DATABASE.shows.find(s => s.id === Number(id));

  if (!show) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12 text-center">
        <h1 className="text-4xl font-bold mb-4">Show Not Found</h1>
        <Link to="/shows" className="text-primary hover:underline">
          ← Back to Shows
        </Link>
      </div>
    );
  }

  const playShow = (episodeTitle?: string) => {
    setCurrentTrack({
      show: show.name,
      host: show.host,
      track: episodeTitle || show.episodes[0]?.title || 'Latest Episode',
      artwork: show.artwork
    });
    setIsPlaying(true);
    showNotification('Now playing!');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 pb-24">
      <Link 
        to="/shows"
        className="text-primary hover:underline mb-6 inline-block"
      >
        ← Back to Shows
      </Link>
      
      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <img 
          src={show.artwork} 
          alt={show.name} 
          className="w-full rounded-2xl shadow-2xl"
        />
        <div>
          <div className="text-sm text-primary font-semibold mb-2">{show.genre}</div>
          <h1 className="text-4xl font-bold mb-4">{show.name}</h1>
          <p className="text-muted-foreground text-lg mb-6">{show.description}</p>
          
          <div className="space-y-3 mb-6">
            <div className="flex items-center gap-2 text-foreground">
              <Clock className="w-5 h-5 text-primary" />
              <span>{show.schedule}</span>
            </div>
            <div className="flex items-center gap-2 text-foreground">
              <User className="w-5 h-5 text-primary" />
              <span>Hosted by {show.host}</span>
            </div>
          </div>

          <button 
            onClick={() => playShow()}
            className="bg-primary text-primary-foreground px-8 py-3 rounded-full hover:opacity-90 transition flex items-center gap-2"
          >
            <Play className="w-5 h-5" />
            Listen Now
          </button>
        </div>
      </div>

      {show.episodes.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold mb-6">Episodes</h2>
          <div className="space-y-4">
            {show.episodes.map(episode => (
              <div key={episode.id} className="bg-card p-6 rounded-lg shadow">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-lg mb-2">{episode.title}</h3>
                    <div className="text-sm text-muted-foreground flex gap-4">
                      <span>{episode.date}</span>
                      <span>{episode.duration}</span>
                      <span>{episode.plays} plays</span>
                    </div>
                  </div>
                  <button 
                    onClick={() => playShow(episode.title)}
                    className="text-primary hover:opacity-80 transition"
                  >
                    <Play className="w-6 h-6" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ShowDetail;
