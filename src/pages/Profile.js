// src/pages/Perfil.js

import "../App.css";

function Perfil() {
  return (
    <> 

      <div className="container my-5">
        <h1 className="text-center seccion-titulo">Mi Perfil</h1>
        <div className="row g-4">
          {/* Información del usuario */}
          <div className="col-lg-6">
            <div className="card shadow-sm border-0">
              <div className="card-body">
                <h4 className="perfil card-title">Información Personal</h4>
                <p><strong>Nombre:</strong> Juan</p>
                <p><strong>Apellido:</strong> Pérez</p>
                <p><strong>Correo:</strong> juanperez@mail.com</p>
                <p><strong>Teléfono:</strong> +51 987654321</p>
              </div>
            </div>
          </div>

          {/* Pedido del día + Platos más consumidos */}
          <div className="col-lg-6 d-flex flex-column gap-4">
            {/* Pedido del día */}
            <div className="card shadow-sm border-0">
              <div className="card-body">
                <h4 className="card-title">Pedido del día</h4>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item">Lomo Saltado</li>
                </ul>
              </div>
            </div>

            {/* Platos más consumidos */}
            <div className="card shadow-sm border-0">
              <div className="card-body">
                <h4 className="card-title">Platos más consumidos</h4>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item">Lomo Saltado</li>
                  <li className="list-group-item">Ají de Gallina</li>
                  <li className="list-group-item">Arroz con Pollo</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Código de sorteo */}
        <div className="row my-4">
          <div className="col-12">
            <div className="card shadow-sm border-0">
              <div className="card-body text-center">
                <h4 className="card-title">Participa en el sorteo</h4>
                <form className="d-flex justify-content-center">
                  <input
                    type="text"
                    className="form-control w-50 me-2"
                    placeholder="Ingresa tu código"
                  />
                  <button type="submit" className="btn btn-primary">
                    Enviar
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>

        {/* Caja de sugerencias */}
        <div className="row my-4">
          <div className="col-12">
            <div className="card shadow-sm border-0">
              <div className="card-body">
                <h4 className="card-title">Caja de Sugerencias</h4>
                <form>
                  <textarea
                    className="form-control mb-3"
                    rows="4"
                    placeholder="Escribe tu sugerencia..."
                  ></textarea>
                  <button type="submit" className="btn btn-success">
                    Enviar sugerencia
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

    </>
  );
}

export default Perfil;
