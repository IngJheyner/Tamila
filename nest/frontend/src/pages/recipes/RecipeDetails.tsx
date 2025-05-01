import { useLoaderData } from 'react-router-dom';
import { RecipeType } from '../../types/RecipeType';
import { useContext, useEffect } from 'react';
import { AuthContext } from '../../context/AuthProvider';

 const RecipeDetails = () => {
  const recipe = useLoaderData<RecipeType>();
  const { HandleContextAuthenticate } = useContext(AuthContext);
  useEffect(() => {
    HandleContextAuthenticate();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
        <div className="breadcumb-area bg-img bg-overlay" style={{ backgroundImage: "url(img/bg-img/breadcumb4.jpg)" }}>
        <div className="container h-100">
          <div className="row h-100 align-items-center">
            <div className="col-12">
              <div className="breadcumb-text text-center">
                <h2>{recipe.name}</h2>
              </div>
            </div>
          </div>
        </div>
        </div>

        <div className="receipe-post-area section-padding-80">


  <div className="container">
      <div className="row">
          <div className="col-12">
            <img src={recipe.image || 'https://cdn.pixabay.com/photo/2016/12/26/17/28/spaghetti-1932466_1280.jpg' } alt={recipe.name} />
          </div>
      </div>
  </div>

  <div className="receipe-content-area">
      <div className="container">

          <div className="row">
              <div className="col-12 col-md-8">
                  <div className="receipe-headline my-5">
                      <span>{recipe.date}</span>
                      <h2>{recipe.name}</h2>
                      <div className="receipe-duration">
                          <h6>Tiempo: {recipe.time} </h6>
                          <h6>Categoría: {recipe.category}</h6>
                          <h6>Creada por: {recipe.user}</h6>
                      </div>
                  </div>
              </div>


          </div>

          <div className="row">
              <div className="col-12 col-lg-12">
                  <div className="single-preparation-step d-flex">

                      <p>{recipe.description || 'No hay descripción'}</p>
                  </div>

              </div>

          </div>


      </div>
  </div>
</div>
    </>
  )
}

export default RecipeDetails