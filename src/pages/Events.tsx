import { Calendar, MapPin } from 'lucide-react';
import { useApp } from '@/contexts/AppContext';
import { DATABASE } from '@/data/database';

const Events = () => {
  const { registerForEvent, registeredEvents } = useApp();

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 pb-24">
      <h1 className="text-4xl font-bold mb-8">Upcoming Events</h1>
      <div className="grid md:grid-cols-2 gap-6">
        {DATABASE.events.map(event => (
          <div key={event.id} className="bg-card rounded-xl shadow-lg overflow-hidden">
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
