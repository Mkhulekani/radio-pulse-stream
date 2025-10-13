import { useState } from 'react';
import { Link } from 'react-router-dom';
import { DATABASE } from '@/data/database';
import { useApp } from '@/contexts/AppContext';
import { Plus, Trash2 } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

const Schedule = () => {
  const { showNotification } = useApp();
  const [shows, setShows] = useState(DATABASE.shows);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    host: '',
    genre: '',
    description: '',
    schedule: '',
    artwork: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    showNotification(`Show "${formData.name}" added to schedule!`);
    setIsDialogOpen(false);
    setFormData({ name: '', host: '', genre: '', description: '', schedule: '', artwork: '' });
  };

  const handleDelete = (showId: number, showName: string, e: React.MouseEvent) => {
    e.preventDefault();
    setShows(shows.filter(show => show.id !== showId));
    showNotification(`Show "${showName}" removed from schedule!`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 pb-24">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Weekly Schedule</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="w-5 h-5" />
              Add to Schedule
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Add Show to Schedule</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name">Show Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="host">Host</Label>
                <Input
                  id="host"
                  value={formData.host}
                  onChange={(e) => setFormData({ ...formData, host: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="genre">Genre</Label>
                <Input
                  id="genre"
                  value={formData.genre}
                  onChange={(e) => setFormData({ ...formData, genre: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="schedule">Schedule</Label>
                <Input
                  id="schedule"
                  value={formData.schedule}
                  onChange={(e) => setFormData({ ...formData, schedule: e.target.value })}
                  placeholder="e.g., Mon-Fri, 06:00-09:00"
                  required
                />
              </div>
              <div>
                <Label htmlFor="artwork">Artwork URL</Label>
                <Input
                  id="artwork"
                  type="url"
                  value={formData.artwork}
                  onChange={(e) => setFormData({ ...formData, artwork: e.target.value })}
                  required
                />
              </div>
              <Button type="submit" className="w-full">Add to Schedule</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      <div className="bg-card rounded-xl shadow-lg p-8">
        <div className="space-y-6">
          {shows.map(show => (
            <Link 
              key={show.id} 
              to={`/shows/${show.id}`}
              className="flex items-center gap-6 p-4 hover:bg-muted rounded-lg transition cursor-pointer relative group"
            >
              <Button
                variant="destructive"
                size="icon"
                className="absolute top-2 right-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={(e) => handleDelete(show.id, show.name, e)}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
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
