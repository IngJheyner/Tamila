import { authLocalStorage } from "../helpers";

export const getPanel = async () => {
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
