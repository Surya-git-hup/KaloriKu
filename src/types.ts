export type ScreenId = 'login' | 'register' | 'home' | 'scan' | 'analysis' | 'history' | 'profile';

export interface FoodItem {
  id: string;
  name: string;
  portion: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
  sugar: number;
  sodium: number;
  timeAgo: string;
  timestamp: number;
  image: string;
  analyzedWithAi: boolean;
  category?: 'Sarapan' | 'Makan Siang' | 'Makan Malam' | 'Camilan';
}

export interface UserProfile {
  name: string;
  email: string;
  avatarUrl: string;
  targetCalories: number;
  targetProtein: number;
  targetCarbs: number;
  targetFat: number;
  mealReminder: string;
  notifications: boolean;
  theme: 'Terang' | 'Gelap' | 'Sistem';
  language: string;
}
