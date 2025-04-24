import React from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home';
import { getRecipesHome } from './services/HomeService';
import Layout from './layouts';
import '../public/style.css';
import About from './pages/About';
import Recipes from './pages/recipes/Recipes';
import { getRecipes, getRecipe, getCategories, getRecipesByCategory } from './services/RecipeService';
import RecipeDetails from './pages/recipes/RecipeDetails';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';
import RecipeSearch from './pages/recipes/RecipeSearch';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
        loader: getRecipesHome,
      },
      {
        path: "/sobre-nosotros",
        element: <About />,
      },
      {
        path: "/recetas",
        element: <Recipes />,
        loader: async () => {
          const categories = await getCategories();
          const recipes = await getRecipes();
          return { categories, recipes };
        },
      },
      {
        path: "/receta/:id/detalle",
        element: <RecipeDetails />,
        loader: async ({params}) => {
          const recipe = await getRecipe(Number(params.id));
          if (!recipe) {
            window.location.href = '/error';
          }
          return recipe;
        },
      },
      {
        path: "/recetas/buscador",
        element: <RecipeSearch />,
        loader: async ({request}) => {

          // Se obtiene la URL de la petición
          const url = new URL(request.url);
          // Se obtiene el id de la categoría
          const categoryId = url.searchParams.get('category_id');
          // Se obtiene el término de búsqueda
          const search = url.searchParams.get('search');

          const categories = await getCategories();

          if (categoryId) {
            const recipes = await getRecipesByCategory(Number(categoryId), search || '');
            if (recipes.length === 0) {
              return { categories, recipes: [] };
            }

            return { categories, recipes };
          } else {
            const recipes = await getRecipes();
            return { categories, recipes };
          }
        },
      },
      {
        path: "/contactanos",
        element: <Contact />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);