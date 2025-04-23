export type HomeRecipeType = {
  id: number;
  name: string;
  slug: string;
  time: string;
  date: string;
  image: string;
  category_id: number;
  category: string;
  user_id: number;
  user: string;
}

export async function getRecipesHome() {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/recipe-helper`);
  const data = await response.json();
  return data;
}
