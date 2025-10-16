import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Radio, Menu, X, ShoppingCart, Heart } from 'lucide-react';
import { useApp } from '@/contexts/AppContext';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export const Navigation = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [authDialogOpen, setAuthDialogOpen] = useState(false);
  const [isSignIn, setIsSignIn] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    email: '',
    password: ''
  });
  const { cart, userMembership, showNotification } = useApp();
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path: string) => location.pathname === path;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isSignIn) {
      showNotification('Signed in successfully!');
      setAuthDialogOpen(false);
      navigate('/donate');
    } else {
      showNotification('Signed up successfully!');
      setIsSignIn(true);
    }
    setFormData({ name: '', surname: '', email: '', password: '' });
  };

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
              to="/about" 
              className={`hover:text-primary transition ${isActive('/about') ? 'text-primary' : ''}`}
            >
              About Us
            </Link>
            <Dialog open={authDialogOpen} onOpenChange={setAuthDialogOpen}>
              <DialogTrigger asChild>
                <button className="bg-primary px-4 py-2 rounded-full hover:opacity-90 transition">
                  {userMembership ? userMembership.tier : 'Join'}
                </button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>{isSignIn ? 'Sign In' : 'Sign Up'}</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                  {!isSignIn && (
                    <>
                      <div>
                        <Label htmlFor="name">Name</Label>
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="surname">Surname</Label>
                        <Input
                          id="surname"
                          value={formData.surname}
                          onChange={(e) => setFormData({ ...formData, surname: e.target.value })}
                          required
                        />
                      </div>
                    </>
                  )}
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    {isSignIn ? 'Sign In' : 'Sign Up'}
                  </Button>
                  <Button 
                    type="button" 
                    variant="ghost" 
                    className="w-full"
                    onClick={() => setIsSignIn(!isSignIn)}
                  >
                    {isSignIn ? "Don't have an account? Sign Up" : "Already have an account? Sign In"}
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
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
            <Link to="/about" className="block w-full text-left py-2 hover:text-primary" onClick={() => setMenuOpen(false)}>About Us</Link>
            <Link to="/cart" className="block w-full text-left py-2 hover:text-primary" onClick={() => setMenuOpen(false)}>Cart ({cart.length})</Link>
          </div>
        )}
      </div>
    </nav>
  );
};
