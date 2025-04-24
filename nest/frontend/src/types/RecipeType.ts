export interface RecipeType {
  id: number;
  name: string;
  slug: string;
  time: string;
  date: string;
  image: string;
  description: string | null;
  category_id: number;
  category: string;
  user_id: number;
  user: string;
}