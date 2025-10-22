import React, { createContext, useContext, useState, useEffect, ReactNode, useRef } from 'react';
import type { Show, Membership, Product } from '@/data/database';

interface CartItem {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
  stock: number;
  sizes?: string[];
  quantity: number;
  size?: string;
  cartId: number;
}

interface CurrentTrack {
  show: string;
  host: string;
  track: string;
  artwork: string;
}

interface NotificationType {
  message: string;
  type: 'success' | 'error' | 'info';
}

interface AppContextType {
  isPlaying: boolean;
  setIsPlaying: (playing: boolean) => void;
  togglePlay: () => void;
  currentTrack: CurrentTrack;
  setCurrentTrack: (track: CurrentTrack) => void;
  volume: number;
  setVolume: (volume: number) => void;
  isMuted: boolean;
  toggleMute: () => void;
  cart: CartItem[];
  addToCart: (product: Product, size?: string) => void;
  removeFromCart: (cartId: number) => void;
  updateCartQuantity: (cartId: number, quantity: number) => void;
  calculateTotal: () => number;
  registeredEvents: number[];
  registerForEvent: (eventId: number, eventTitle: string) => void;
  userMembership: Membership | null;
  subscribeMembership: (membership: Membership) => void;
  selectedSize: Record<number, string>;
  setSelectedSize: (sizes: Record<number, string>) => void;
  notification: NotificationType | null;
  showNotification: (message: string, type?: 'success' | 'error' | 'info') => void;
  playbackTime: number;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState<CurrentTrack>({
    show: "Morning Vibes",
    host: "DJ Sarah",
    track: "Sunset Dreams - The Collective",
    artwork: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&h=400&fit=crop"
  });
  const [volume, setVolume] = useState(70);
  const [isMuted, setIsMuted] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [registeredEvents, setRegisteredEvents] = useState<number[]>([]);
  const [userMembership, setUserMembership] = useState<Membership | null>(null);
  const [selectedSize, setSelectedSize] = useState<Record<number, string>>({});
  const [notification, setNotification] = useState<NotificationType | null>(null);
  const [playbackTime, setPlaybackTime] = useState(0);

  // Initialize audio element
  useEffect(() => {
    // Using a direct streaming URL - replace with your actual Newtown Radio stream
    audioRef.current = new Audio('https://ice1.somafm.com/groovesalad-128-mp3');
    audioRef.current.volume = volume / 100;
    
    audioRef.current.addEventListener('error', (e) => {
      console.error('Audio error:', e);
      showNotification('Failed to load audio stream', 'error');
      setIsPlaying(false);
    });
    
    audioRef.current.addEventListener('canplay', () => {
      console.log('Audio ready to play');
    });
    
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  // Update audio volume
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume / 100;
    }
  }, [volume, isMuted]);

  // Handle playback timer
  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        setPlaybackTime(prev => prev + 1);
      }, 1000);
      return () => clearInterval(interval);
    } else {
      setPlaybackTime(0);
    }
  }, [isPlaying]);

  const showNotification = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const togglePlay = async () => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
      showNotification('Playback paused');
    } else {
      try {
        await audioRef.current.play();
        setIsPlaying(true);
        showNotification('Now playing live!');
      } catch (error) {
        console.error('Error playing audio:', error);
        showNotification('Unable to play audio', 'error');
      }
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    showNotification(isMuted ? 'Sound on' : 'Sound muted');
  };

  const addToCart = (product: Product, size?: string) => {
    const cartItem: CartItem = { ...product, quantity: 1, size, cartId: Date.now() };
    setCart([...cart, cartItem]);
    showNotification(`${product.name} added to cart!`);
  };

  const removeFromCart = (cartId: number) => {
    setCart(cart.filter(item => item.cartId !== cartId));
    showNotification('Item removed from cart');
  };

  const updateCartQuantity = (cartId: number, newQuantity: number) => {
    if (newQuantity < 1) {
      removeFromCart(cartId);
      return;
    }
    setCart(cart.map(item => 
      item.cartId === cartId ? { ...item, quantity: newQuantity } : item
    ));
  };

  const calculateTotal = () => {
    return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  };

  const registerForEvent = (eventId: number, eventTitle: string) => {
    if (registeredEvents.includes(eventId)) {
      showNotification('Already registered for this event!', 'info');
      return;
    }
    setRegisteredEvents([...registeredEvents, eventId]);
    showNotification(`Successfully registered for ${eventTitle}!`);
  };

  const subscribeMembership = (membership: Membership) => {
    setUserMembership(membership);
    showNotification(`Welcome to ${membership.tier} membership!`);
  };

  return (
    <AppContext.Provider
      value={{
        isPlaying,
        setIsPlaying,
        togglePlay,
        currentTrack,
        setCurrentTrack,
        volume,
        setVolume,
        isMuted,
        toggleMute,
        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        calculateTotal,
        registeredEvents,
        registerForEvent,
        userMembership,
        subscribeMembership,
        selectedSize,
        setSelectedSize,
        notification,
        showNotification,
        playbackTime,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
