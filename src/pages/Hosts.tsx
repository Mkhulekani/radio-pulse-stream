import { DATABASE } from '@/data/database';

const Hosts = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12 pb-24">
      <h1 className="text-4xl font-bold mb-8">Meet Our Hosts</h1>
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
