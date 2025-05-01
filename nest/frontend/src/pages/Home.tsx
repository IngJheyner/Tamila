import { useLoaderData } from 'react-router-dom';
import { RecipeType } from '../types/RecipeType';
// import { useEffect } from 'react';
//import AuthContext from '../context/AuthProvider';

const Home = () => {

  const recipes = useLoaderData<RecipeType[]>();

  return (
    <>
        <div className="breadcumb-area bg-img bg-overlay" style={{ backgroundImage: "url(img/bg-img/breadcumb3.jpg)" }}>
        <div className="container h-100">
          <div className="row h-100 align-items-center">
            <div className="col-12">
              <div className="breadcumb-text text-center">
                <h2>Recetas flaites - Desarrollado con React 18  </h2>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="top-catagory-area section-padding-80-0">
        <div className="container">

        </div>
      </section>
      <section className="best-receipe-area">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="section-heading">
                <h3>Últimas recetas publicadas  </h3>
              </div>
            </div>
          </div>

          <div className="row">
            {recipes.map((recipe: RecipeType) => (
              <div key={recipe.id} className='col-12 col-sm-6 col-lg-4'>
                <div className="single-best-receipe-area mb-30">
                  <img src={recipe.image || 'https://cdn.pixabay.com/photo/2016/12/26/17/28/spaghetti-1932466_1280.jpg'} alt={recipe.name} className='foto-mini' />
                  <div className="receipe-content">
                      <a href={`/receta/${recipe.id}/detalle`} title={recipe.name}>
                          <h5>{recipe.name}</h5>
                      </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

export default Home;