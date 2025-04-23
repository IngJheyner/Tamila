export default function NotFound() {
  return (
    <>
      <section className="about-area section-padding-80">
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <div className="section-heading">
                        <h3>Ups Página no encontrada </h3>
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-12">
                    <h6 className="sub-heading pb-5">Error 404</h6>
                </div>
            </div>


            <div className="row">
                <div className="col-12 centrado">
                    <img className="mb-70 text-center" src="/img/img/404.png" alt="" />

                </div>
            </div>
        </div>
      </section>
    </>
  );
}