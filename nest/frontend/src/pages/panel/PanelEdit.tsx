import { useContext, useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useLoaderData } from 'react-router-dom';
import { RecipeType } from "../../types/RecipeType";
import { AuthContext } from "../../context/AuthProvider";
import { updateRecipe } from "../../services/PanelService";
import { authLocalStorage } from "../../helpers";

const PanelEdit = () => {
  const recipe = useLoaderData<RecipeType>();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { HandleContextAuthenticate } = useContext(AuthContext);
  useEffect(() => {
    HandleContextAuthenticate();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [boton, setBoton] = useState("block");
  const [preloader, setPreloader] = useState("none");

  const recibirFormulario = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();


    setBoton('none');
    setPreloader('block');
    const file = fileInputRef.current?.files?.[0];
    const formData = new FormData();
    formData.append('id', recipe.id.toString());
    if (file) {
      formData.append('file', file);
    }
    if(await updateRecipe(formData))
      {
        alert("Se modificó el registro exitosamente");
      }else
      {
        alert("Se produjo un error inesperado");
      }
      window.location.href=location.href;


  };
  return (
    <>
      <div className="breadcumb-area bg-img bg-overlay" style={{ backgroundImage: "url(img/bg-img/breadcumb6.jpg)" }}>
        <div className="container h-100">
          <div className="row h-100 align-items-center">
            <div className="col-12">
              <div className="breadcumb-text text-center">
                <h2>Editar foto</h2>
              </div>
            </div>
          </div>
        </div>
      </div>


      <div className="contact-area section-padding-0-80">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="section-heading">
                <h3>Editar foto receta: <strong>{recipe.name}</strong></h3>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-8">
              <div className="contact-form-area">
                <form onSubmit={recibirFormulario}>
                  <div className="row">
                    <div className="col-lg-12">
                      <img src={recipe.image} alt="" style={{width:"100px"}} />
                      <hr/>
                    </div>

                    <div className='col-lg-12'>
                      <label className="form-label" htmlFor="foto">
                        Foto
                      </label>
                      <input
                        className="form-control"
                        id="foto"
                        type="file"
                        placeholder='Foto'
                        ref={fileInputRef}
                      />
                    </div>
                    <div className="col-12 text-center" style={{ display: boton }}>
                      <button className="btn delicious-btn mt-30" type="submit" title="Enviar"  >Enviar</button>
                    </div>
                    <div className="col-12 text-center" style={{ display: preloader }}>
                      <img src="/img/img/load.gif" alt="" />
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

    </>
  )
}

export default PanelEdit