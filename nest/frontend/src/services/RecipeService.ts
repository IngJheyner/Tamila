import axios from 'axios';

// Obtiene todas las recetas
export const getRecipes = async () => {
  const response = await axios.get(`${import.meta.env.VITE_API_URL}/recipe`, {
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(response => {
    return response.data;
  })
  .catch(error => {
    console.error('Error fetching recipes:', error);
    throw error;
  });
  return response;
};

// Obtiene una receta por su id
export const getRecipe = async (id: number) => {
  const response = await axios.get(`${import.meta.env.VITE_API_URL}/recipe/${id}`, {
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(response => {
    if (response.status === 200) {
      return response.data;
    } else {
      return null;
    }
  })
  .catch(error => {
    console.error('Error fetching recipe:', error);
  });
  return response;
};

// Obtiene todas las categorías
export const getCategories = async () => {
  const response = await axios.get(`${import.meta.env.VITE_API_URL}/categories`, {
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(response => {
    return response.data;
  })
  .catch(error => {
    console.error('Error fetching categories:', error);
  });
  return response;
};

// Obtiene todas las recetas por categoría y término de búsqueda
export const getRecipesByCategory = async (categoryId: number, search: string) => {
  const response = await axios.get(`${import.meta.env.VITE_API_URL}/recipe-helper/search?category_id=${categoryId}&search=${search}`, {
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(response => {
    return response.data;
  })
  .catch(error => {
    console.error('Error fetching recipes by category:', error);
  });
  return response;
};