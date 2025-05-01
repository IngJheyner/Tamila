import { authLocalStorage } from "../helpers";
import { RecipeType } from "../types/RecipeType";

export const getPanel = async (): Promise<RecipeType[]> => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/recipe-helper/panels/${authLocalStorage().id}/user`,
      {
        headers: {
          'content-type': 'application/json',
          'Authorization': `Bearer ${authLocalStorage().token}`
        }
      }
    );
    if (!response.ok) {
      const errorData = await response.json();
      console.error('Error al obtener las recetas del panel:', errorData);
      throw new Error(errorData.message || 'Error al obtener las recetas del panel');
    }
    return response.json();
  } catch (error) {
    console.error('Error al obtener las recetas del panel:', error);
    return [];
  }
};

export const createRecipe = async (recipe: FormData): Promise<RecipeType> => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/recipe`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${authLocalStorage().token}`
      },
      body: recipe
    });
    if (!response.ok) {
      const errorData = await response.json();
      console.error('Error al crear la receta:', errorData);
      throw new Error(errorData.message || 'Error al crear la receta');
    }
    return response.json();
  } catch (error) {
    console.error('Error al crear la receta:', error);
    throw error;
  }
};

export const updateRecipe = async (recipe: FormData): Promise<RecipeType> => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/recipe/${recipe.get('id')}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${authLocalStorage().token}`
      },
      body: recipe
    });
    if (!response.ok) {
      const errorData = await response.json();
      console.error('Error al actualizar la receta:', errorData);
      throw new Error(errorData.message || 'Error al actualizar la receta');
    }
    return response.json();
  } catch (error) {
    console.error('Error al actualizar la receta:', error);
    throw error;
  }
};

export const deleteRecipe = async (id: number): Promise<void> => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/recipe/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${authLocalStorage().token}`
      }
    });
    if (!response.ok) {
      const errorData = await response.json();
      console.error('Error al eliminar la receta:', errorData);
      throw new Error(errorData.message || 'Error al eliminar la receta');
    }
  } catch (error) {
    console.error('Error al eliminar la receta:', error);
    throw error;
  }
};
