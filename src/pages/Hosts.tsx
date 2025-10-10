import { useState } from 'react';
import { DATABASE } from '@/data/database';
import { useApp } from '@/contexts/AppContext';
import { Plus } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

const Hosts = () => {
  const { showNotification } = useApp();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    bio: '',
    photo: '',
    instagram: '',
    twitter: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    showNotification(`Host "${formData.name}" added successfully!`);
    setIsDialogOpen(false);
    setFormData({ name: '', bio: '', photo: '', instagram: '', twitter: '' });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 pb-24">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Meet Our Hosts</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="w-5 h-5" />
              Add Host
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Add New Host</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name">Host Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="photo">Photo URL</Label>
                <Input
                  id="photo"
                  type="url"
                  value={formData.photo}
                  onChange={(e) => setFormData({ ...formData, photo: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="instagram">Instagram Handle</Label>
                <Input
                  id="instagram"
                  value={formData.instagram}
                  onChange={(e) => setFormData({ ...formData, instagram: e.target.value })}
                  placeholder="@username"
                />
              </div>
              <div>
                <Label htmlFor="twitter">Twitter Handle</Label>
                <Input
                  id="twitter"
                  value={formData.twitter}
                  onChange={(e) => setFormData({ ...formData, twitter: e.target.value })}
                  placeholder="@username"
                />
              </div>
              <Button type="submit" className="w-full">Add Host</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      <div className="grid md:grid-cols-3 gap-8">
        {DATABASE.hosts.map(host => (
          <div key={host.id} className="bg-card rounded-xl shadow-lg overflow-hidden">
            <img src={host.photo} alt={host.name} className="w-full h-64 object-cover" />
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2">{host.name}</h3>
              <p className="text-muted-foreground text-sm mb-4">{host.bio}</p>
              <div className="text-sm text-primary">
                {DATABASE.shows.filter(s => s.hostId === host.id).length} show(s)
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Hosts;
