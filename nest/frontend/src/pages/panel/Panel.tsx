import { useContext, useRef, useState } from "react"
import { AuthContext } from './../../context/AuthProvider';
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { createRecipe, deleteRecipe, getPanel, updateRecipe } from "../../services/PanelService";
import { getCategories } from "../../services/RecipeService";
import { RecipeType } from "../../types/RecipeType";
//import {sendDataReceta, sendDataRecetaEditar, sendDataRecetaEliminar} from './../servicios/PanelService';
//injectar fancybox en react
//npm install @fancyapps/ui@4.0.31
import { Fancybox } from '@fancyapps/ui';
import "@fancyapps/ui/dist/fancybox.css";
//ventana modal
import Modal from "react-bootstrap/Modal";
import { CategoryType } from "../../types/CategoryType";
import { authLocalStorage } from "../../helpers";

const Panel = () => {
  const { HandleContextAuthenticate } = useContext(AuthContext);
  const [data, setData] = useState<RecipeType[]>([]);
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const traerRecetas = async () => {

      const data = await getPanel();
      setData(data);

      const data2 = await getCategories();
      setCategories(data2);
    };

    return () => {
      HandleContextAuthenticate();
      traerRecetas();
    };
  }, []);
  //ventana modal
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //formulario
  const [input, setInput] = useState<RecipeType>({
    id: 0,
    name: '',
    time: '',
    category_id: 0,
    description: '',
    image: '',
    slug: '',
    date: '',
    category: '',
    user_id: 0,
    user: '',
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  const [action, setAction] = useState<number>(1);
  //const [actionId, setActionId] = useState<number>(0);


  const handleCrear = () => {
    setAction(1);
    setInput({
      id: 0,
      name: '',
      time: '',
      category_id: 0,
      description: '',
      image: '',
      slug: '',
      date: '',
      category: '',
      user_id: 0,
      user: '',

    });
    handleShow();
  };

  const handleEditar = (item: RecipeType) => {

    setAction(2);
    //setActionId(item.id);
    setInput({
      id: item.id,
      name: item.name,
      time: item.time,
      category_id: item.category_id,
      description: item.description,
      image: item.image,
      slug: item.slug,
      date: item.date,
      category: item.category,
      user_id: item.user_id,
      user: item.user,
    });
    handleShow();
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(input.category_id==0)
    {
        alert("Debe seleccionar una categoría")
        return false;
    }
    if (input.name == "") {
      alert("El campo Nombre es obligatorio");
      setInput({...input, name: ''});
      return false;
    }
    if (input.time == "") {
      alert("El campo Tiempo es obligatorio");
      setInput({...input, time: ''});
      return false;
    }
    if (input.description == "") {
      alert("El campo Descripción es obligatorio");
      setInput({...input, description: ''});
      return false;
    }
    if(action==1)
    {
      try {
        const file = fileInputRef.current?.files?.[0];
        const formData = new FormData();
        formData.append('id', input.id.toString());
        formData.append('user_id', authLocalStorage().id.toString());
        formData.append('name', input.name);
        formData.append('time', input.time);
        formData.append('description', input.description || '');
        formData.append('category_id', input.category_id.toString());
        if (file) {
          formData.append('file', file);
        }
        await createRecipe(formData);
        alert("Se creó el registro exitosamente");
      } catch (error) {
        console.log("🚀 ~ handleSubmit ~ error:", error)
        alert("Ocurrió un error inesperado");
      }
    }
    if(action==2)
    {
      try {
        const file = fileInputRef.current?.files?.[0];
        const formData = new FormData();
        formData.append('id', input.id.toString());
        formData.append('user_id', authLocalStorage().id.toString());
        formData.append('name', input.name);
        formData.append('time', input.time);
        formData.append('description', input.description || '');
        formData.append('category_id', input.category_id.toString());
        if (file) {
          formData.append('file', file);
        }
        await updateRecipe(formData);
        alert("Se modificó el registro exitosamente");
      } catch (error) {
        console.log("🚀 ~ handleSubmit ~ error:", error)
        alert("Ocurrió un error inesperado");
      }
    }
   window.location.href="/panel";
  };

  const handleEliminar=async(id:number)=>
    {
      if(window.confirm("¿Realmente desea eliminar este registro?"))
      {

          await deleteRecipe(id);
          alert("Se eliminó el registro exitosamente");

        window.location.href="/panel";
      }
    };
  return (
    <>
      <div className="breadcumb-area bg-img bg-overlay" style={{ backgroundImage: "url(img/bg-img/breadcumb6.jpg)" }}>
        <div className="container h-100">
          <div className="row h-100 align-items-center">
            <div className="col-12">
              <div className="breadcumb-text text-center">
                <h2>Panel</h2>
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
                <h3>Mis recetas publicadas</h3>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-12">
              <div className="receipe-ratings text-right my-5">
                <a onClick={handleCrear} className="btn delicious-btn"><i className="fas fa-plus"></i> Crear</a>
              </div>
            </div>
            <hr />
            <div className="col-12">
              <div className="table-responsive">
                <table className="table table-bordered table-hover table-striped">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Categoría</th>
                      <th>Nombre</th>
                      <th>Tiempo</th>
                      <th>Detalle</th>
                      <th>Foto</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((item) =>
                    (
                      <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.category}</td>
                        <td>{item.name}</td>
                        <td>{item.time}</td>
                        <td>{item.description}</td>
                        <td className="text-center">
                          <a href={item.image} className="lightbox d-block" data-fancybox="image-gallery">
                            <img src={item.image || 'https://cdn.pixabay.com/photo/2016/12/26/17/28/spaghetti-1932466_1280.jpg'} alt="" style={{ width: "100px" }} />
                          </a>
                        </td>
                        <td className="text-center">
                          <Link to={`/panel-editar/${item.id}`} title="Editar foto"><i className="fas fa-pen-square"></i></Link>
                          &nbsp;&nbsp;
                          <Link to="#" onClick={()=>{handleEditar(item)}} title="Editar">
                            <i className="fas fa-edit"></i>
                          </Link>
                          &nbsp;&nbsp;
                          <Link onClick={()=>handleEliminar(item.id)} to="#" title="Eliminar"><i className="fas fa-trash"></i></Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal show={show} onHide={handleClose} size="lg" id="listingModal">
        <Modal.Header>
          <Modal.Title>
            {action == 1 ? "Crear" : "Editar"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit}>
            <div className="row gy-3">

              <div className="col-lg-12">
                <label htmlFor="categoria_id">Categoría</label>
                <select id="categoria_id" value={input.category_id} onChange={(e) => setInput({...input, category_id: parseInt(e.target.value)})} className="form-control">
                  <option value="0">Seleccione.....</option>
                  {categories.map((category: CategoryType) => (
                    <option key={category.id} value={category.id}>{category.name}</option>
                  ))}
                </select>
              </div>

              <div className='col-lg-12'>
                <label className="form-label" htmlFor="nombre">
                  Nombre
                </label>
                <input
                  className="form-control"
                  id="nombre"
                  type="text"
                  placeholder='Nombre'
                  value={input.name}
                  onChange={(e) => { setInput({...input, name: e.target.value}) }}
                />
              </div>

              <div className='col-lg-12'>
                <label className="form-label" htmlFor="tiempo">
                  Tiempo
                </label>
                <input
                  className="form-control"
                  id="tiempo"
                  type="text"
                  placeholder='Tiempo'
                  value={input.time}
                  onChange={(e) => { setInput({...input, time: e.target.value}) }}
                />
              </div>
              <div className="col-lg-12">
                <label htmlFor="descripcion">Descripción:</label>
                <textarea value={input.description || ''}
                  onChange={(e) => setInput({...input, description: e.target.value})} id="descripcion" className="form-control" placeholder="Descripción"></textarea>
              </div>
              {action == 1 && (
                <>
                  <div className="col-lg-12">
                    <label htmlFor="foto">Foto</label>
                    <input type="file" id="foto" className="form-control" placeholder="Foto"
                    ref={fileInputRef} />
                  </div>
                </>
              )}


            </div>
            <hr/>
            <div className="row">
              <div className="col-6"></div>
              <div className="col-6 d-flex justify-content-end">
                <button className="btn btn-primary">
                {action==1 ?
                (
                  <>
                    <i className="fas fa-plus"></i> Crear
                  </>
                ):
                (
                  <>
                  <i className="fas fa-pencil-alt"></i>  Editar
                  </>
                )}
                </button>
              </div>
            </div>

          </form>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default Panel