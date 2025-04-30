import { useContext, useState } from "react"
import { AuthContext } from './../../context/AuthProvider';
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { getPanel } from "../../services/PanelService";
import { getCategories } from "../../services/RecipeService";
//import {sendDataReceta, sendDataRecetaEditar, sendDataRecetaEliminar} from './../servicios/PanelService';
//injectar fancybox en react
//npm install @fancyapps/ui@4.0.31
//import { Fancybox } from '@fancyapps/ui';
//import "@fancyapps/ui/dist/fancybox.css";
//ventana modal
//import Modal from "react-bootstrap/Modal";
const Panel = () => {
  const { HandleContextAuthenticate } = useContext(AuthContext);
  const [datos, setDatos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  useEffect(() => {
    const traerRecetas = async () => {

      const data = await getPanel();
      setDatos(data);

      const data2 = await getCategories();
      setCategorias(data2);
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
  const [nombre, setNombre] = useState('');
  const [tiempo, setTiempo] = useState('');
  const [categoria_id, setCategoriaId] = useState('');
  const [descripcion, setDescripcion] = useState('');

  const [acciones, setAcciones] = useState(1);
  const [accionesId, setAccionesId] = useState();


  const handleCrear = () => {
    setAcciones(1);
    setNombre('');
    setTiempo('');
    setCategoriaId('0');
    setDescripcion('');
    handleShow();
  };

  // const handleEditar = (modulo) => {

  //   setAcciones(2);
  //   setAccionesId(modulo.id);
  //   setNombre(modulo.nombre);
  //   setTiempo(modulo.tiempo);
  //   setCategoriaId(modulo.categoria_id);
  //   setDescripcion(modulo.descripcion);
  //   handleShow();
  // };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   if(categoria_id=="0")
  //   {
  //       alert("Debe seleccionar una categoría")
  //       return false;
  //   }
  //   if (nombre == 0 || nombre == "") {
  //     alert("El campo Nombre es obligatorio");
  //     setNombre("");
  //     return false;
  //   }
  //   if (tiempo == 0 || tiempo == "") {
  //     alert("El campo Tiempo es obligatorio");
  //     setNombre("");
  //     return false;
  //   }
  //   if (descripcion == 0 || descripcion == "") {
  //     alert("El campo Descripción es obligatorio");
  //     setNombre("");
  //     return false;
  //   }
  //   if(acciones==1)
  //   {
  //     try {
  //       await sendDataReceta(tiempo, categoria_id, descripcion, nombre);
  //       alert("Se creó el registro exitosamente");
  //     } catch (error) {
  //       alert("Ocurrió un error inesperado");
  //     }
  //   }
  //   if(acciones==2)
  //   {
  //     try {
  //       await sendDataRecetaEditar({nombre:nombre, tiempo:tiempo, descripcion:descripcion, categoria_id:categoria_id}, accionesId);
  //       alert("Se modificó el registro exitosamente");
  //     } catch (error) {
  //       alert("Ocurrió un error inesperado");
  //     }
  //   }
  //  window.location="/panel";
  // };
  // const handleEliminar=async(id)=>
  //   {
  //     if(window.confirm("¿Realmente desea eliminar este registro?"))
  //     {
  //       try {
  //         await sendDataRecetaEliminar(id);
  //         alert("Se eliminó el registro exitosamente");
  //       } catch (error) {
  //         alert("Ocurrió un error inesperado");
  //       }
  //       window.location="/panel";
  //     }
  //   };
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
                    {/* {datos.map((dato) =>
                    (
                      <tr key={dato.id}>
                        <td>{dato.id}</td>
                        <td>{dato.categoria}</td>
                        <td>{dato.nombre}</td>
                        <td>{dato.tiempo}</td>
                        <td>{dato.descripcion}</td>
                        <td className="text-center">
                          <a href={dato.foto} className="lightbox d-block" data-fancybox="image-gallery">
                            <img src={dato.foto} alt="" style={{ width: "100px" }} />
                          </a>
                        </td>
                        <td className="text-center">
                          <Link to={`/panel-editar/${dato.id}`} title="Editar foto"><i className="fas fa-pen-square"></i></Link>
                          &nbsp;&nbsp;
                          <Link to="#" onClick={()=>{handleEditar(dato)}} title="Editar">
                            <i className="fas fa-edit"></i>
                          </Link>
                          &nbsp;&nbsp;
                          <Link onClick={()=>handleEliminar(dato.id)} to="#" title="Eliminar"><i className="fas fa-trash"></i></Link>
                        </td>
                      </tr>
                    ))} */}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <Modal show={show} onHide={handleClose} size="lg" id="listingModal">
        <Modal.Header>
          <Modal.Title>
            {acciones == 1 ? "Crear" : "Editar"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit}>
            <div className="row gy-3">

              <div className="col-lg-12">
                <label htmlFor="categoria_id">Categoría</label>
                <select id="categoria_id" value={categoria_id} onChange={(e) => setCategoriaId(e.target.value)} className="form-control">
                  <option value="0">Seleccione.....</option>
                  {categorias.map((categoria) => (
                    <option key={categoria.id} value={categoria.id}>{categoria.nombre}</option>
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
                  value={nombre}
                  onChange={(e) => { setNombre(e.target.value) }}
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
                  value={tiempo}
                  onChange={(e) => { setTiempo(e.target.value) }}
                />
              </div>
              <div className="col-lg-12">
                <label htmlFor="descripcion">Descripción:</label>
                <textarea value={descripcion}
                  onChange={(e) => setDescripcion(e.target.value)} id="descripcion" className="form-control" placeholder="Descripción"></textarea>
              </div>
              {acciones == 1 && (
                <>
                  <div className="col-lg-12">
                    <label htmlFor="foto">Foto</label>
                    <input type="file" id="foto" className="form-control" placeholder="Foto" />
                  </div>
                </>
              )}


            </div>
            <hr/>
            <div className="row">
              <div className="col-6"></div>
              <div className="col-6 d-flex justify-content-end">
                <button className="btn btn-primary">
                {acciones==1 ?
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
      </Modal> */}
    </>
  )
}

export default Panel