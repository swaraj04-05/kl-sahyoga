
export enum Theme {
  LIGHT = 'light',
  DARK = 'dark',
}

export enum Tab {
  HOME = 'Home',
  DONATE = 'Donate',
  REQUESTS = 'Requests',
  MESSAGES = 'Messages',
  PROFILE = 'Profile',
}

export enum PostType {
    DONATION = 'donation',
    REQUEST = 'request'
}

export enum Category {
  FOOD = 'Food',
  CLOTHES = 'Clothes',
  BOOKS = 'Books',
  GADGETS = 'Gadgets',
  FURNITURE = 'Furniture',
  OTHER = 'Other'
}

export interface User {
  id: string;
  name: string;
  avatarUrl: string;
  isVerified: boolean;
}

export interface Post {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  category: Category;
  location: string;
  postedAt: string;
  isUrgent: boolean;
  user: User;
  type: PostType;
  likes: number;
  interested: number;
}

export interface MessageThread {
    id: string;
    user: User;
    lastMessage: string;
    timestamp: string;
    unreadCount: number;
}
