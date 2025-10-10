import { useState } from 'react';
import { Calendar, MapPin, Plus, Trash2 } from 'lucide-react';
import { useApp } from '@/contexts/AppContext';
import { DATABASE } from '@/data/database';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

const Events = () => {
  const { registerForEvent, registeredEvents, showNotification } = useApp();
  const [events, setEvents] = useState(DATABASE.events);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    time: '',
    location: '',
    price: '',
    description: '',
    image: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newEvent = {
      id: Date.now(),
      ...formData,
      price: formData.price ? parseInt(formData.price) : 0,
      capacity: 50,
      registered: 0
    };
    setEvents([...events, newEvent]);
    showNotification(`Event "${formData.title}" added successfully!`);
    setIsDialogOpen(false);
    setFormData({ title: '', date: '', time: '', location: '', price: '', description: '', image: '' });
  };

  const handleDelete = (eventId: number, eventTitle: string) => {
    setEvents(events.filter(e => e.id !== eventId));
    showNotification(`Event "${eventTitle}" deleted`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 pb-24">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Upcoming Events</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="w-5 h-5" />
              Add Event
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Add New Event</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="title">Event Title</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="date">Date</Label>
                <Input
                  id="date"
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="time">Time</Label>
                <Input
                  id="time"
                  type="time"
                  value={formData.time}
                  onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="price">Price (leave empty for free)</Label>
                <Input
                  id="price"
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  placeholder="0"
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
                <Label htmlFor="image">Image URL</Label>
                <Input
                  id="image"
                  type="url"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  required
                />
              </div>
              <Button type="submit" className="w-full">Add Event</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        {events.map(event => (
          <div key={event.id} className="bg-card rounded-xl shadow-lg overflow-hidden relative">
            <button
              onClick={() => handleDelete(event.id, event.title)}
              className="absolute top-4 right-4 bg-destructive text-destructive-foreground p-2 rounded-full hover:opacity-90 transition z-10"
              title="Delete event"
            >
              <Trash2 className="w-4 h-4" />
            </button>
            <img src={event.image} alt={event.title} className="w-full h-56 object-cover" />
            <div className="p-6">
              <h3 className="text-2xl font-bold mb-3">{event.title}</h3>
              <div className="space-y-2 text-sm text-muted-foreground mb-4">
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-primary" />
                  {event.date} at {event.time}
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-primary" />
                  {event.location}
                </div>
              </div>
              <p className="text-foreground mb-4">{event.description}</p>
              <button 
                onClick={() => registerForEvent(event.id, event.title)}
                className={`w-full py-3 rounded-full font-semibold transition ${
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
  );
};

export default Events;
