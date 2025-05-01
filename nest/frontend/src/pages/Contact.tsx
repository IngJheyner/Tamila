import { useContext, useEffect, useState } from "react";
import { sendDataContact } from "../services/ContactService";
//import AuthContext from "../context/AuthProvider";
const Contact = () => {
    // const {handleMantenLaSesion} =useContext(AuthContext);
    //   useEffect(() => {
    //     return () => {
    //       handleMantenLaSesion();
    //     }
    //   }, []);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const [boton, setBoton] =useState("block");
  const [preloader, setPreloader] =useState("none");

  const sendForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (name == "") {
      alert("El campo nombre es obligatorio");
      setName("");
      return false;
    }
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
    if (phone == "") {
      alert("El campo teléfono es obligatorio");
      setPhone("");
      return false;
    }
    if (message == "") {
      alert("El campo Mensaje es obligatorio");
      setMessage("");
      return false;
    }
    setBoton("none");
    setPreloader("block");
    const response = await sendDataContact({name: name, email:email, phone:phone, message:message})
    if(response==201)
    {
      alert("Tu mensaje fué enviado exitosamente");
    }else
    {
      alert("Se produjo un error inesperado");
      console.log(response);
    }
    window.location.href = location.href;

  };

  return (
    <>
      <div className="breadcumb-area bg-img bg-overlay" style={{ backgroundImage: "url(img/bg-img/breadcumb4.jpg)" }}>
        <div className="container h-100">
          <div className="row h-100 align-items-center">
            <div className="col-12">
              <div className="breadcumb-text text-center">
                <h2>Contáctanos</h2>
              </div>
            </div>
          </div>
        </div>
      </div>


      <div className="contact-information-area section-padding-80">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="logo mb-80">
                <img src="img/core-img/logo2.png" alt="" style={{ width: "144px", height: "65ox" }} />
              </div>
            </div>
          </div>

          <div className="row">


            <div className="col-12 col-lg-12">
              <div className="row">
                <div className="col-4">
                  <div className="single-contact-information mb-30">
                    <h6>Dirección:</h6>
                    <p>481 Creekside Lane Avila <br />Beach, CA 93424</p>
                  </div>
                </div>
                <div className="col-4">
                  <div className="single-contact-information mb-30">
                    <h6>Teléfonos:</h6>
                    <p>+53 345 7953 32453 <br />+53 345 7557 822112</p>
                  </div>
                </div>
                <div className="col-4">
                  <div className="single-contact-information mb-30">
                    <h6>E-Mail:</h6>
                    <p>'yourmail@gmail.com'</p>
                  </div>
                </div>
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
                <h3>Cuéntanos en qué te podemos ayudar!!</h3>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-12">
              <div className="contact-form-area">
                <form onSubmit={sendForm}>
                  <div className="row">

                    <div className="col-12 col-log-6">
                      <input type="text" id="nombre" placeholder="Nombre:" className="form-control" value={name} onChange={(e) => setName(e.target.value)} />
                    </div>

                    <div className="col-12 col-log-6">
                      <input type="text" id="correo" placeholder="E-Mail:" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>

                    <div className="col-12 col-log-6">
                      <input type="text" id="telefono" placeholder="Teléfono:" className="form-control" value={phone} onChange={(e) => setPhone(e.target.value)} />
                    </div>

                    <div className="col-12 col-log-6">
                      <textarea id="mensaje" placeholder="Mensaje" onChange={(e) => setMessage(e.target.value)} className="form-control"></textarea>
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

export default Contact
