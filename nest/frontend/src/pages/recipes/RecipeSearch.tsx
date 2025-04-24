import { redirect, useLoaderData } from 'react-router-dom';
import { useState } from 'react';
import { CategoryType } from '../../types/CategoryType';
import { RecipeType } from '../../types/RecipeType';

const RecipeSearch = () => {

  const { categories, recipes } = useLoaderData<{ categories: CategoryType[], recipes: RecipeType[] }>();

 const [search, setSearch]=useState("");
  const [categoryId, setCategoryId]=useState("0");

  const handleSubmit =async (e: React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    //console.log(`category_=${category_} | search=${search}`);
    if(categoryId=="0")
    {
      return false;
    }
    const location = `/recetas/buscador?category_id=${categoryId}&search=${search}`;
    window.location.href = location;
  };

  return (
    <>
      <div className="breadcumb-area bg-img bg-overlay" style={{ backgroundImage: "url(img/bg-img/breadcumb4.jpg)" }}>
        <div className="container h-100">
          <div className="row h-100 align-items-center">
            <div className="col-12">
              <div className="breadcumb-text text-center">
                <h2>Recetas: Categoría: { recipes[0].category}</h2>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="top-catagory-area section-padding-80-0">
        <div className="container">

          <div className="receipe-post-search mb-80">
            <div className="container">
              <form onSubmit={handleSubmit}>
                <div className="row">

                <div className="col-12 col-lg-4">
                  <select id="category_id" className="form-control" onChange={(e)=>setCategoryId(e.target.value)}>
                    <option value="0">Seleccione....</option>
                    {categories.map((category: CategoryType)=>
                      (
                        <option key={category.id} value={category.id}>{category.name}</option>
                      ))}
                  </select>
                </div>

                <div className="col-12 col-lg-4">
                  <input type="text" className="form-control" id="search" onChange={(e)=>setSearch(e.target.value)} />
                </div>

                <div className="col-12 col-lg-3 text-right">
                  <button type="submit" className="btn delicious-btn" title="Buscar">
                  <i className="fas fa-search"></i> Buscar
                  </button>
                </div>


                </div>
              </form>
            </div>
          </div>

        </div>
      </section>

      <section className="best-receipe-area">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="section-heading">
                <h3>Todas nuestras recetas</h3>
              </div>
            </div>
          </div>

          <div className="row">

          {recipes.map((recipe: RecipeType)=>(
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

export default RecipeSearch