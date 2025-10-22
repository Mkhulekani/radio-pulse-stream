import { Play, Pause, Volume2, VolumeX, Share2 } from 'lucide-react';
import { useApp } from '@/contexts/AppContext';

export const LivePlayer = () => {
  const { 
    isPlaying, 
    togglePlay, 
    currentTrack, 
    volume, 
    setVolume, 
    isMuted, 
    toggleMute,
    showNotification,
    playbackTime,
    genres,
    currentGenre,
    switchGenre
  } = useApp();

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const shareContent = (title: string) => {
    showNotification(`Sharing: ${title}`);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-purple-900 to-indigo-900 text-white shadow-2xl z-50">
      {/* Genre Selection */}
      <div className="border-b border-purple-700/50 overflow-x-auto">
        <div className="max-w-7xl mx-auto px-4 py-2">
          <div className="flex gap-2 min-w-max">
            {genres.map((genre) => (
              <button
                key={genre.name}
                onClick={() => switchGenre(genre.name)}
                className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all whitespace-nowrap ${
                  currentGenre === genre.name
                    ? 'bg-white text-purple-900'
                    : 'bg-purple-800/50 hover:bg-purple-700/50'
                }`}
              >
                {genre.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Player Controls */}
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4 flex-1 min-w-0">
            <img 
              src={currentTrack.artwork} 
              alt="Now Playing" 
              className="w-14 h-14 rounded-lg shadow-lg"
            />
            <div className="flex-1 min-w-0">
              <div className="font-bold text-sm truncate">{currentTrack.track}</div>
              <div className="text-xs text-purple-200 truncate">
                {currentTrack.show} • {currentTrack.host} • {currentGenre}
              </div>
              {isPlaying && (
                <div className="text-xs text-purple-300 mt-1">
                  Playing: {formatTime(playbackTime)}
                </div>
              )}
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2">
              <button onClick={toggleMute} className="hover:text-purple-200 transition">
                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </button>
              <input 
                type="range" 
                min="0" 
                max="100" 
                value={isMuted ? 0 : volume}
                onChange={(e) => setVolume(Number(e.target.value))}
                className="w-20 h-1 bg-purple-700 rounded-lg cursor-pointer"
              />
              <span className="text-xs w-8">{isMuted ? 0 : volume}%</span>
            </div>
            
            <button 
              onClick={togglePlay}
              className="bg-white text-purple-900 rounded-full p-3 hover:bg-purple-100 transition-all transform hover:scale-105"
            >
              {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-0.5" />}
            </button>
            
            <button 
              onClick={() => shareContent(currentTrack.track)}
              className="hover:text-purple-200 transition hidden sm:block"
            >
              <Share2 className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
