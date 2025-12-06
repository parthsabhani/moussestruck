// Central data store for Moussestruck website

export interface Product {
  id: string;
  name: string;
  description: string;
  price: string;
  image: string;
  category: string;
  rating: number;
  badge?: string;
}

export interface Story {
  id: number;
  title: string;
  image: string;
  link?: string;
}

export interface Testimonial {
  id: number;
  name: string;
  review: string;
  rating: number;
  date: string;
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}

// Site Information
export const siteInfo = {
  brandName: "Moussestruck",
  tagline: "Indulge in Heavenly Mousse Creations",
  description: "Handcrafted artisanal mousse desserts made with premium ingredients and a passion for perfection.",
  email: "hello@moussestruck.com",
  phone: "+1 (555) 123-4567",
  address: "123 Dessert Lane, Sweet City, SC 12345",
  instagram: "@moussestruck",
  hours: {
    weekdays: "10:00 AM - 8:00 PM",
    weekends: "11:00 AM - 9:00 PM"
  }
};

// Products Data
export const products: Product[] = [
  {
    id: "prod-1",
    name: "Classic Chocolate Mousse",
    description: "Rich Belgian chocolate mousse with dark chocolate shavings",
    price: "$8.50",
    image: "https://images.unsplash.com/photo-1736840334919-aac2d5af73e4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaG9jb2xhdGUlMjBtb3Vzc2UlMjBkZXNzZXJ0fGVufDF8fHx8MTc2NDY2OTg5OHww&ixlib=rb-4.1.0&q=80&w=1080",
    category: "chocolate",
    rating: 4.9,
    badge: "Best Seller"
  },
  {
    id: "prod-2",
    name: "Strawberry Dream",
    description: "Light strawberry mousse with fresh berry compote",
    price: "$9.00",
    image: "https://images.unsplash.com/photo-1558234469-50fc184d1cc9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHJhd2JlcnJ5JTIwZGVzc2VydHxlbnwxfHx8fDE3NjQ2MDQ5NjZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    category: "fruit",
    rating: 4.8,
    badge: "New"
  },
  {
    id: "prod-3",
    name: "Vanilla Bean Elegance",
    description: "Madagascar vanilla mousse with caramelized white chocolate",
    price: "$8.00",
    image: "https://images.unsplash.com/photo-1763469026365-e5f39b418cf7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2YW5pbGxhJTIwZGVzc2VydCUyMGN1cHxlbnwxfHx8fDE3NjQ2Njk4OTl8MA&ixlib=rb-4.1.0&q=80&w=1080",
    category: "classic",
    rating: 5.0,
    badge: "Best Seller"
  },
  {
    id: "prod-4",
    name: "Matcha Paradise",
    description: "Premium Japanese matcha mousse with red bean swirl",
    price: "$9.50",
    image: "https://images.unsplash.com/photo-1603380207318-371ad12c0c0e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYXRjaGElMjBkZXNzZXJ0fGVufDF8fHx8MTc2NDY1MzI5NXww&ixlib=rb-4.1.0&q=80&w=1080",
    category: "specialty",
    rating: 4.7,
    badge: "New"
  },
  {
    id: "prod-5",
    name: "Salted Caramel Bliss",
    description: "Smooth caramel mousse topped with sea salt flakes",
    price: "$8.50",
    image: "https://images.unsplash.com/photo-1741244133042-970251e76066?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVnYW50JTIwZGVzc2VydCUyMHByZXNlbnRhdGlvbnxlbnwxfHx8fDE3NjQ2Njk4OTh8MA&ixlib=rb-4.1.0&q=80&w=1080",
    category: "specialty",
    rating: 4.9,
    badge: "Best Seller"
  },
  {
    id: "prod-6",
    name: "Raspberry Rose",
    description: "Delicate raspberry mousse infused with rose water",
    price: "$9.00",
    image: "https://images.unsplash.com/photo-1558234469-50fc184d1cc9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHJhd2JlcnJ5JTIwZGVzc2VydHxlbnwxfHx8fDE3NjQ2MDQ5NjZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    category: "fruit",
    rating: 4.6
  }
];

// Stories/Highlights Data
export const stories: Story[] = [
  {
    id: 1,
    title: "New Menu",
    image: "https://images.unsplash.com/photo-1736840334919-aac2d5af73e4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaG9jb2xhdGUlMjBtb3Vzc2UlMjBkZXNzZXJ0fGVufDF8fHx8MTc2NDY2OTg5OHww&ixlib=rb-4.1.0&q=80&w=1080"
  },
  {
    id: 2,
    title: "Best Sellers",
    image: "https://images.unsplash.com/photo-1741244133042-970251e76066?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVnYW50JTIwZGVzc2VydCUyMHByZXNlbnRhdGlvbnxlbnwxfHx8fDE3NjQ2Njk4OTh8MA&ixlib=rb-4.1.0&q=80&w=1080"
  },
  {
    id: 3,
    title: "Behind Scenes",
    image: "https://images.unsplash.com/photo-1657498023828-1e0181449d9f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWtlcnklMjBpbnRlcmlvcnxlbnwxfHx8fDE3NjQ2MTE2MDZ8MA&ixlib=rb-4.1.0&q=80&w=1080"
  },
  {
    id: 4,
    title: "Seasonal",
    image: "https://images.unsplash.com/photo-1558234469-50fc184d1cc9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHJhd2JlcnJ5JTIwZGVzc2VydHxlbnwxfHx8fDE3NjQ2MDQ5NjZ8MA&ixlib=rb-4.1.0&q=80&w=1080"
  },
  {
    id: 5,
    title: "Reviews",
    image: "https://images.unsplash.com/photo-1763469026365-e5f39b418cf7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2YW5pbGxhJTIwZGVzc2VydCUyMGN1cHxlbnwxfHx8fDE3NjQ2Njk4OTl8MA&ixlib=rb-4.1.0&q=80&w=1080"
  },
  {
    id: 6,
    title: "Events",
    image: "https://images.unsplash.com/photo-1603380207318-371ad12c0c0e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYXRjaGElMjBkZXNzZXJ0fGVufDF8fHx8MTc2NDY1MzI5NXww&ixlib=rb-4.1.0&q=80&w=1080"
  }
];

// Testimonials Data
export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    review: "The chocolate mousse is absolutely divine! Best dessert I've ever had. The texture is so smooth and the flavor is incredibly rich.",
    rating: 5,
    date: "Nov 2024"
  },
  {
    id: 2,
    name: "Michael Chen",
    review: "Moussestruck has become my go-to for special occasions. The presentation is beautiful and the taste is out of this world!",
    rating: 5,
    date: "Nov 2024"
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    review: "I'm obsessed with their matcha mousse! It's the perfect balance of sweet and earthy. Highly recommend!",
    rating: 5,
    date: "Oct 2024"
  },
  {
    id: 4,
    name: "David Thompson",
    review: "Fresh, delicious, and beautifully crafted. You can taste the quality in every bite. Worth every penny!",
    rating: 5,
    date: "Oct 2024"
  }
];

// Navigation Links
export const navLinks = [
  { name: "Home", href: "#home" },
  { name: "Menu", href: "#menu" },
  { name: "About", href: "#about" },
  { name: "Contact", href: "#contact" }
];

// Categories
export const categories = [
  { id: "all", name: "All", emoji: "🍮" },
  { id: "chocolate", name: "Chocolate", emoji: "🍫" },
  { id: "fruit", name: "Fruit", emoji: "🍓" },
  { id: "specialty", name: "Specialty", emoji: "✨" },
  { id: "classic", name: "Classic", emoji: "⭐" }
];

// Social Links
export const socialLinks: SocialLink[] = [
  { platform: "Instagram", url: "https://www.instagram.com/moussestruck/", icon: "instagram" },
  { platform: "Facebook", url: "#", icon: "facebook" },
  { platform: "Twitter", url: "#", icon: "twitter" }
];

// Features
export const features = [
  {
    id: 1,
    title: "Handcrafted Daily",
    description: "Every mousse is made fresh daily with premium ingredients",
    icon: "chef-hat"
  },
  {
    id: 2,
    title: "Premium Quality",
    description: "We source only the finest ingredients from around the world",
    icon: "award"
  },
  {
    id: 3,
    title: "Custom Orders",
    description: "Special events? We create custom mousse arrangements",
    icon: "gift"
  },
  {
    id: 4,
    title: "Fast Delivery",
    description: "Same-day delivery available for local orders",
    icon: "truck"
  }
];
