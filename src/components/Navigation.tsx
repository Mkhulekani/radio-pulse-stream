import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Radio, Menu, X, ShoppingCart, Heart } from 'lucide-react';
import { useApp } from '@/contexts/AppContext';

export const Navigation = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { cart, userMembership } = useApp();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-black text-white sticky top-0 z-40 shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition">
            <Radio className="w-8 h-8 text-primary" />
            <span className="text-xl font-bold">NEWTOWN RADIO</span>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            <Link 
              to="/" 
              className={`hover:text-primary transition ${isActive('/') ? 'text-primary' : ''}`}
            >
              Home
            </Link>
            <Link 
              to="/schedule" 
              className={`hover:text-primary transition ${isActive('/schedule') ? 'text-primary' : ''}`}
            >
              Schedule
            </Link>
            <Link 
              to="/shows" 
              className={`hover:text-primary transition ${isActive('/shows') ? 'text-primary' : ''}`}
            >
              Shows
            </Link>
            <Link 
              to="/hosts" 
              className={`hover:text-primary transition ${isActive('/hosts') ? 'text-primary' : ''}`}
            >
              Hosts
            </Link>
            <Link 
              to="/events" 
              className={`hover:text-primary transition ${isActive('/events') ? 'text-primary' : ''}`}
            >
              Events
            </Link>
            <Link 
              to="/shop" 
              className={`hover:text-primary transition ${isActive('/shop') ? 'text-primary' : ''}`}
            >
              Shop
            </Link>
            <Link 
              to="/membership" 
              className="bg-primary px-4 py-2 rounded-full hover:opacity-90 transition"
            >
              {userMembership ? userMembership.tier : 'Join'}
            </Link>
            <Link 
              to="/donate" 
              className="text-primary hover:opacity-80 transition"
            >
              <Heart className="w-5 h-5" />
            </Link>
            <Link to="/cart" className="relative">
              <ShoppingCart className="w-5 h-5 cursor-pointer hover:text-primary transition" />
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {cart.length}
                </span>
              )}
            </Link>
          </div>

          <button 
            className="md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden py-4 space-y-3 border-t border-gray-800">
            <Link to="/" className="block w-full text-left py-2 hover:text-primary" onClick={() => setMenuOpen(false)}>Home</Link>
            <Link to="/shows" className="block w-full text-left py-2 hover:text-primary" onClick={() => setMenuOpen(false)}>Shows</Link>
            <Link to="/events" className="block w-full text-left py-2 hover:text-primary" onClick={() => setMenuOpen(false)}>Events</Link>
            <Link to="/shop" className="block w-full text-left py-2 hover:text-primary" onClick={() => setMenuOpen(false)}>Shop</Link>
            <Link to="/cart" className="block w-full text-left py-2 hover:text-primary" onClick={() => setMenuOpen(false)}>Cart ({cart.length})</Link>
          </div>
        )}
      </div>
    </nav>
  );
};
