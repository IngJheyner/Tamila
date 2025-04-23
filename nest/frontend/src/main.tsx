import React from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home';
import { getRecipesHome } from './services/HomeService';
import Layout from './Layouts';
import '../public/style.css';
import About from './pages/About';
import Recipes from './pages/Recipes';
import RecipeDetails from './pages/RecipeDetails';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';

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
      },
      {
        path: "/receta/:id/detalle",
        element: <RecipeDetails />,
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