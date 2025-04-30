import React, { useContext, useState } from "react";
import {login} from './../../services/AuthService';
import { useNavigate } from "react-router-dom";
import { AuthContext } from './../../context/AuthProvider';

const Login = () => {
  const {HandleContextlogin} = useContext(AuthContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [boton, setBoton] =useState("block");
  const [preloader, setPreloader] =useState("none");
  const sendForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (email == "") {
      alert("El campo E-Mail es obligatorio");
      setEmail("");
      return false;
    }
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
      alert("El E-Mail ingresado no es válido");
      setEmail("");
      return false;
    }
    if (password == "") {
      alert("El campo Contraseña es obligatorio");
      setPassword("");
      return false;
    }

    setBoton("none");
    setPreloader("block");
    const [data, status] = await login({email, password}) || [null, 0];
    if(status === 200 && data !== null)
    {
      HandleContextlogin(data);
      navigate("/panel");
    }else
    {
      alert("Se produjo un error inesperado");
    }
    //window.location.href=location.href;
  };
  return (
    <>
      <div className="breadcumb-area bg-img bg-overlay" style={{ backgroundImage: "url(img/bg-img/breadcumb6.jpg)" }}>
  <div className="container h-100">
      <div className="row h-100 align-items-center">
          <div className="col-12">
              <div className="breadcumb-text text-center">
                  <h2>Ingresar</h2>
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
                  <h3>Login</h3>
              </div>
          </div>
      </div>

      <div className="row">
          <div className="col-8">
              <div className="contact-form-area">
              <form onSubmit={sendForm}>
                  <div className="row">



                    <div className="col-12 col-log-6">
                      <input type="text" id="email" placeholder="E-Mail:" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>

                    <div className="col-12 col-log-6">
                      <input type="password" id="password" placeholder="Contraseña:" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>



                    <div className="col-12 text-center" style={{display:boton}}>
                      <button type="submit" className="btn delicious-btn mt-30" title="Enviar">
                        Enviar
                      </button>
                    </div>

                    <div className="col-12 text-center" style={{display:preloader}}>
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

export default Login