import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Clock, Plus } from 'lucide-react';
import { DATABASE } from '@/data/database';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useApp } from '@/contexts/AppContext';

const Shows = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    host: '',
    genre: '',
    description: '',
    schedule: '',
    artwork: ''
  });
  const { showNotification } = useApp();

  const filteredShows = DATABASE.shows.filter(show => 
    show.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    show.genre.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    showNotification(`Show "${formData.name}" submitted successfully!`);
    setIsDialogOpen(false);
    setFormData({
      name: '',
      host: '',
      genre: '',
      description: '',
      schedule: '',
      artwork: ''
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 pb-24">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-4xl font-bold">All Shows</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Add Show
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Add New Show</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name">Show Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  placeholder="e.g., Morning Vibes"
                />
              </div>
              <div>
                <Label htmlFor="host">Host Name *</Label>
                <Input
                  id="host"
                  value={formData.host}
                  onChange={(e) => setFormData({ ...formData, host: e.target.value })}
                  required
                  placeholder="e.g., DJ Sarah"
                />
              </div>
              <div>
                <Label htmlFor="genre">Genre *</Label>
                <Input
                  id="genre"
                  value={formData.genre}
                  onChange={(e) => setFormData({ ...formData, genre: e.target.value })}
                  required
                  placeholder="e.g., Electronic, Jazz, Hip Hop"
                />
              </div>
              <div>
                <Label htmlFor="schedule">Schedule *</Label>
                <Input
                  id="schedule"
                  value={formData.schedule}
                  onChange={(e) => setFormData({ ...formData, schedule: e.target.value })}
                  required
                  placeholder="e.g., Mon-Fri, 06:00-09:00"
                />
              </div>
              <div>
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  required
                  placeholder="Brief description of the show"
                  rows={3}
                />
              </div>
              <div>
                <Label htmlFor="artwork">Artwork URL *</Label>
                <Input
                  id="artwork"
                  type="url"
                  value={formData.artwork}
                  onChange={(e) => setFormData({ ...formData, artwork: e.target.value })}
                  required
                  placeholder="https://example.com/image.jpg"
                />
              </div>
              <div className="flex gap-3 justify-end pt-4">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">
                  Submit Show
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      
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
