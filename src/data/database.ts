export const DATABASE = {
  shows: [
    {
      id: 1,
      name: "Morning Vibes",
      host: "DJ Sarah",
      hostId: 1,
      genre: "Electronic",
      description: "Start your day with the freshest electronic beats",
      schedule: "Mon-Fri, 06:00-09:00",
      artwork: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&h=400&fit=crop",
      episodes: [
        { id: 101, title: "Summer Mix 2025", date: "2025-10-08", duration: "58:30", plays: 1250 },
        { id: 102, title: "Deep House Sessions", date: "2025-10-07", duration: "60:00", plays: 980 }
      ]
    },
    {
      id: 2,
      name: "Jazz After Dark",
      host: "Marcus Cole",
      hostId: 2,
      genre: "Jazz",
      description: "Smooth jazz for your evening wind-down",
      schedule: "Wed-Thu, 20:00-22:00",
      artwork: "https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?w=400&h=400&fit=crop",
      episodes: [
        { id: 201, title: "Classic Standards", date: "2025-10-08", duration: "120:00", plays: 2100 }
      ]
    },
    {
      id: 3,
      name: "Hip Hop Heritage",
      host: "MC Rhythm",
      hostId: 3,
      genre: "Hip Hop",
      description: "From golden age to modern classics",
      schedule: "Sat, 14:00-17:00",
      artwork: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop",
      episodes: [
        { id: 301, title: "90s Hip Hop Special", date: "2025-10-05", duration: "180:00", plays: 3400 }
      ]
    }
  ],
  hosts: [
    {
      id: 1,
      name: "DJ Sarah",
      bio: "Electronic music curator with 10+ years experience",
      photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
      social: { instagram: "@djsarah", twitter: "@djsarah" }
    },
    {
      id: 2,
      name: "Marcus Cole",
      bio: "Jazz aficionado and radio veteran",
      photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
      social: { instagram: "@marcuscole", twitter: "@marcusjazz" }
    },
    {
      id: 3,
      name: "MC Rhythm",
      bio: "Hip hop historian and community builder",
      photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
      social: { instagram: "@mcrhythm", twitter: "@mcrhythm" }
    }
  ],
  events: [
    {
      id: 1,
      title: "Live DJ Workshop",
      date: "2025-10-15",
      time: "18:00",
      location: "Newtown Studio, Johannesburg",
      price: 150,
      description: "Learn mixing techniques from our resident DJs",
      image: "https://images.unsplash.com/photo-1571266028243-d220c6e2a584?w=800&h=400&fit=crop",
      capacity: 20,
      registered: 8
    },
    {
      id: 2,
      title: "Community Listening Party",
      date: "2025-10-20",
      time: "20:00",
      location: "Newtown Radio Lounge",
      price: 0,
      description: "Join us for a special vinyl listening session",
      image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&h=400&fit=crop",
      capacity: 50,
      registered: 32
    }
  ],
  products: [
    {
      id: 1,
      name: "Newtown Radio T-Shirt",
      price: 350,
      category: "Apparel",
      image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop",
      sizes: ["S", "M", "L", "XL"],
      stock: 45
    },
    {
      id: 2,
      name: "Logo Tote Bag",
      price: 200,
      category: "Accessories",
      image: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=400&h=400&fit=crop",
      stock: 30
    },
    {
      id: 3,
      name: "Vintage Cap",
      price: 280,
      category: "Apparel",
      image: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=400&h=400&fit=crop",
      stock: 25
    }
  ],
  memberships: [
    {
      id: 1,
      tier: "Join",
      price: 0,
      features: ["Access to live stream", "Weekly newsletter", "Show schedule"]
    },
    {
      id: 2,
      tier: "Premium",
      price: 99,
      features: ["All Free features", "Ad-free listening", "Download episodes", "Early event access"]
    },
    {
      id: 3,
      tier: "VIP",
      price: 249,
      features: ["All Premium features", "Exclusive content", "Studio tours", "Meet & greets", "10% shop discount"]
    }
  ]
};

export type Show = typeof DATABASE.shows[0];
export type Host = typeof DATABASE.hosts[0];
export type Event = typeof DATABASE.events[0];
export type Product = typeof DATABASE.products[0];
export type Membership = typeof DATABASE.memberships[0];
