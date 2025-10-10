import { Link } from 'react-router-dom';
import { Radio } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-black text-white py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Radio className="w-6 h-6 text-primary" />
              <span className="font-bold">NEWTOWN RADIO</span>
            </div>
            <p className="text-gray-400 text-sm">
              Broadcasting the pulse of Johannesburg since 2020
            </p>
          </div>
          
          <div>
            <h4 className="font-bold mb-4">Quick Links</h4>
            <div className="space-y-2 text-sm text-gray-400">
              <Link to="/schedule" className="block hover:text-white transition">Schedule</Link>
              <Link to="/shows" className="block hover:text-white transition">Shows</Link>
              <Link to="/events" className="block hover:text-white transition">Events</Link>
            </div>
          </div>
          
          <div>
            <h4 className="font-bold mb-4">Support</h4>
            <div className="space-y-2 text-sm text-gray-400">
              <Link to="/membership" className="block hover:text-white transition">Membership</Link>
              <Link to="/donate" className="block hover:text-white transition">Donate</Link>
              <Link to="/shop" className="block hover:text-white transition">Shop</Link>
            </div>
          </div>
          
          <div>
            <h4 className="font-bold mb-4">Connect</h4>
            <div className="space-y-2 text-sm text-gray-400">
              <a href="#" className="block hover:text-white transition">Instagram</a>
              <a href="#" className="block hover:text-white transition">Twitter</a>
              <a href="#" className="block hover:text-white transition">Facebook</a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-400">
          <p>© 2025 Newtown Radio. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
