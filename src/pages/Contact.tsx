import { useState } from 'react';
import { MapPin, Mail, Phone } from 'lucide-react';
import { useApp } from '@/contexts/AppContext';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const { showNotification } = useApp();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    showNotification('Message sent successfully!');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 pb-24">
      <h1 className="text-4xl font-bold mb-8">Get in Touch</h1>
      
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-card rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold mb-6">Send us a Message</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold mb-2">Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 border-2 border-input rounded-lg focus:border-primary focus:outline-none bg-background"
                placeholder="Your name"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 border-2 border-input rounded-lg focus:border-primary focus:outline-none bg-background"
                placeholder="your@email.com"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Message</label>
              <textarea
                rows={5}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-4 py-3 border-2 border-input rounded-lg focus:border-primary focus:outline-none bg-background"
                placeholder="Your message..."
                required
              ></textarea>
            </div>
            <button 
              type="submit"
              className="w-full bg-primary text-primary-foreground py-3 rounded-full font-semibold hover:opacity-90 transition"
            >
              Send Message
            </button>
          </form>
        </div>

        <div className="bg-card rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-primary mt-1" />
              <div>
                <div className="font-semibold">Studio Location</div>
                <div className="text-muted-foreground">Newtown Cultural Precinct, Johannesburg</div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Mail className="w-5 h-5 text-primary mt-1" />
              <div>
                <div className="font-semibold">Email</div>
                <div className="text-muted-foreground">hello@newtownradio.co.za</div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Phone className="w-5 h-5 text-primary mt-1" />
              <div>
                <div className="font-semibold">Phone</div>
                <div className="text-muted-foreground">+27 11 123 4567</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
