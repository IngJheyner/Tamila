import { User, Category } from 'src/model';

export interface IRecipe {
  id: number;
  name: string;
  slug: string;
  time: string;
  description: string;
  date: Date;
  image: string | null;
  category_id: Category | number;
  user_id: User | number;
}
