export class RecipeResponseDto {
  id?: number;
  name?: string;
  slug?: string;
  time?: string;
  date?: Date;
  image?: string | null;
  description?: string | null;
  category_id?: number;
  category?: string | null;
  user_id?: number;
  user?: string | null;
}
