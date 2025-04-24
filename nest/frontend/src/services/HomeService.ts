export async function getRecipesHome() {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/recipe-helper`);
  const data = await response.json();
  return data;
}
