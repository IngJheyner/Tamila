import { useContext } from "react";
import { Link } from "react-router-dom";
// import AuthContext from "../context/AuthProvider";

const Header = () => {
    // let {authNombre, handleCerrarSesion} = useContext(AuthContext);
  return (
    <>
    <header className="header-area">
      <div className="top-header-area">
        <div className="container h-100">
          <div className="row h-100 align-items-center justify-content-between">

            <div className="col-12 col-sm-6">
              <div className="breaking-news">
                <div id="breakingNewsTicker" className="ticker">
                  <ul>
                    <li><a href="mailto:info@recetarioflaite.cl">info@recetarioflaite.cl</a></li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="col-12 col-sm-6">
              <div className="top-social-info text-right">
                <a href="#"><i className="fa fa-pinterest" aria-hidden="true"></i></a>
                <a href="#"><i className="fa fa-facebook" aria-hidden="true"></i></a>
                <a href="#"><i className="fa fa-twitter" aria-hidden="true"></i></a>
                <a href="#"><i className="fa fa-dribbble" aria-hidden="true"></i></a>
                <a href="#"><i className="fa fa-behance" aria-hidden="true"></i></a>
                <a href="#"><i className="fa fa-router-linkedin" aria-hidden="true"></i></a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="delicious-main-menu">
        <div className="classy-nav-container breakpoint-off">
          <div className="container">

            <nav className="classy-navbar justify-content-between" id="deliciousNav">


              <Link className="nav-brand" to="/">
                  <img src="/img/core-img/logo2.png" alt="logo" style={{width:"144px", height:"65px"}} /></Link>


              <div className="classy-navbar-toggler">
                <span className="navbarToggler"><span></span><span></span><span></span></span>
              </div>

              <div className="classy-menu">

                <div className="classycloseIcon">
                  <div className="cross-wrap"><span className="top"></span><span className="bottom"></span></div>
                </div>

                <div className="classynav">
                  <ul>
                      <li><Link to="/" title="Home">Home</Link></li>
                      <li><Link to="/sobre-nosotros" title="Sobre nosotros">Sobre nosotros</Link></li>
                      <li><Link to="/recetas" title="Recetas">Recetas</Link></li>
                      <li><Link to="/contactanos" title="Contáctenos">Contáctanos</Link></li>


                      {/* {authNombre ? (
                          <>
                          <li><Link to="/panel" title={`Hola ${authNombre}`}>{`Hola ${authNombre}`}</Link></li>
                          <li>
                              <Link onClick={()=>{handleCerrarSesion()}} title="Cerrar sesión">Cerrar Sesión</Link>
                          </li>
                          </>
                      ):(
                          <>
                          <li><Link to="/registro" title="Registro">Registro</Link></li>
                          <li><Link to="/login" title="Login">Login</Link></li>
                          </>
                      ) } */}


                  </ul>


                </div>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </header>
    </>
  )
}

export default Header