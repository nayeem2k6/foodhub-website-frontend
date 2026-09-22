export interface Restaurant {
  _id: string;
  title: string;
  description: string;
  image: string;
  price: number;
  rating: number;
  location: string;
  category: string;
  cuisine: string[];
  createdBy: {
    _id: string;
    name: string;
    avatar?: string;
  };
  createdAt: string;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  role: 'USER' | 'ADMIN';
  avatar?: string;
}

export interface Review {
  _id: string;
  rating: number;
  comment: string;
  userId: {
    _id: string;
    name: string;
    avatar?: string;
  };
  restaurantId: string;
  createdAt: string;
}