import "../App.css";

function Home() {
  return (
    <>
      {/*Sección Hero*/}
      <section id="hero" className="hero align-items-stretch">
        <div className="container my-4">
          <div className="button-container">
            <button className="btn btn-danger">
              <a href="/profile">VER MIS RESERVAS</a>
            </button>
            <div className="d-flex align-items-center">
              <span className="menu-info me-4">
                MENÚ DE HOY:
                <span className="text-muted">POLLO A LA OLLA</span>
              </span>
              <button className="btn btn-danger">
                <a href="#menu-dia">IR AL MENU DEL DÍA</a>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/*Sección Platos*/}
      <section id="platos" className="platos-carta d-flex flex-column">
        <h2 className="seccion-titulo">Platos a la Carta</h2>
        <div className="contenedor-flechas d-flex">
          <img src="../img/flecha1.png" alt="" />
          <img src="../img/flecha.png" alt="" />
        </div>

        <div className="container text-center platos-contenedor">
          <div className="row">
            {/* Plato 1 */}
            <div className="col-12 col-md-6 col-lg-4">
              <div className="platos">
                <img src="../img/lomo-saltado.jpg" alt="Plato 1" />
                <div className="overlay">
                  <p>Lomo Saltado</p>
                  <div className="iconos-contenedor">
                    <button type="button" className="btn btn-primary">
                      S/.12.00
                    </button>
                    <button data-bs-toggle="modal"
                    data-bs-target="#confirmModalPlato" type="button" className="btn btn-success">
                      Reservar
                    </button>
                  </div>
                </div>
              </div>
            </div>
            {/* Plato 2 */}
            <div className="col-12 col-md-6 col-lg-4">
              <div className="platos">
                <img src="../img/tallarin-saltado.webp" alt="Plato 2" />
                <div className="overlay">
                  <p>Tallarín Saltado</p>
                  <div className="iconos-contenedor">
                    <button type="button" className="btn btn-primary">
                      S/.12.00
                    </button>
                    <button data-bs-toggle="modal"
                    data-bs-target="#confirmModalPlato" type="button" className="btn btn-success">
                      Reservar
                    </button>
                  </div>
                </div>
              </div>
            </div>
            {/* Plato 3 */}
            <div className="col-12 col-md-6 col-lg-4">
              <div className="platos">
                <img src="../img/bistec-a-lo-pobre.jpg" alt="Plato 3" />
                <div className="overlay">
                  <p>Bisteck a lo Pobre</p>
                  <div className="iconos-contenedor">
                    <button type="button" className="btn btn-primary">
                      S/.15.00
                    </button>
                    <button data-bs-toggle="modal"
                    data-bs-target="#confirmModalPlato" type="button" className="btn btn-success">
                      Reservar
                    </button>
                  </div>
                </div>
              </div>
            </div>
            {/* Plato 4 */}
            <div className="col-12 col-md-6 col-lg-4">
              <div className="platos">
                <img src="../img/churrasco-papas.png" alt="Plato 4" />
                <div className="overlay">
                  <p>Churrasco con Papas Doradas</p>
                  <div className="iconos-contenedor">
                    <button type="button" className="btn btn-primary">
                      S/.17.00
                    </button>
                    <button data-bs-toggle="modal"
                    data-bs-target="#confirmModalPlato" type="button" className="btn btn-success">
                      Reservar
                    </button>
                  </div>
                </div>
              </div>
            </div>
            {/* Plato 5 */}
            <div className="col-12 col-md-6 col-lg-4">
              <div className="platos">
                <img src="../img/chuleta-papas.jpeg" alt="Plato 5" />
                <div className="overlay">
                  <p>Chuleta con Papas Doradas</p>
                  <div className="iconos-contenedor">
                    <button type="button" className="btn btn-primary">
                      S/.15.00
                    </button>
                    <button data-bs-toggle="modal"
                    data-bs-target="#confirmModalPlato" type="button" className="btn btn-success">
                      Reservar
                    </button>
                  </div>
                </div>
              </div>
            </div>
            {/* Plato 6 */}
            <div className="col-12 col-md-6 col-lg-4">
              <div className="platos">
                <img src="../img/chaufa-amazonico" alt="Plato 6" />
                <div className="overlay">
                  <p>Chaufa Amazónico</p>
                  <div className="iconos-contenedor">
                    <button type="button" className="btn btn-primary">
                      S/.12.00
                    </button>
                    <button data-bs-toggle="modal"
                    data-bs-target="#confirmModalPlato" type="button" className="btn btn-success">
                      Reservar
                    </button>
                  </div>
                </div>
              </div>
            </div>
            {/* Plato 7 */}
            <div className="col-12 col-md-6 col-lg-4">
              <div className="platos">
                <img src="../img/chaufa-pollo.jpg" alt="Plato 7" />
                <div className="overlay">
                  <p>Chaufa de Pollo</p>
                  <div className="iconos-contenedor">
                    <button type="button" className="btn btn-primary">
                      S/.12.00
                    </button>
                    <button data-bs-toggle="modal"
                    data-bs-target="#confirmModalPlato" type="button" className="btn btn-success">
                      Reservar
                    </button>
                  </div>
                </div>
              </div>
            </div>
            {/* Plato 8 */}
            <div className="col-12 col-md-6 col-lg-4">
              <div className="platos">
                <img src="../img/pollo-champinones.jpg" alt="Plato 8" />
                <div className="overlay">
                  <p>Filete de Pollo con Champiñones</p>
                  <div className="iconos-contenedor">
                    <button type="button" className="btn btn-primary">
                      S/.17.00
                    </button>
                    <button data-bs-toggle="modal"
                    data-bs-target="#confirmModalPlato" type="button" className="btn btn-success">
                      Reservar
                    </button>
                  </div>
                </div>
              </div>
            </div>
            {/* Plato 9 */}
            <div className="col-12 col-md-6 col-lg-4">
              <div className="platos">
                <img src="../img/spaghetti-huancaina-lomo.jpg" alt="Plato 9" />
                <div className="overlay">
                  <p>Spaghetti a la Huancaína con Lomo Saltado</p>
                  <div className="iconos-contenedor">
                    <button type="button" className="btn btn-primary">
                      S/.18.00
                    </button>
                    <button data-bs-toggle="modal"
                    data-bs-target="#confirmModalPlato" type="button" className="btn btn-success">
                      Reservar
                    </button>
                  </div>
                </div>
              </div>
            </div>
            {/* Plato 10 */}
            <div className="col-12 col-md-6 col-lg-4">
              <div className="platos">
                <img src="../img/spaghetti-hongos.jpg" alt="Plato 10" />
                <div className="overlay">
                  <p>Spaghetti en Salsa de Hongos</p>
                  <div className="iconos-contenedor">
                    <button type="button" className="btn btn-primary">
                      S/.18.00
                    </button>
                    <button data-bs-toggle="modal"
                    data-bs-target="#confirmModalPlato" type="button" className="btn btn-success">
                      Reservar
                    </button>
                  </div>
                </div>
              </div>
            </div>
            {/* Plato 11 */}
            <div className="col-12 col-md-6 col-lg-4">
              <div className="platos">
                <img src="../img/spaghetti-alfredo.jpeg" alt="Plato 11" />
                <div className="overlay">
                  <p>Spaguetti a lo Alfredo</p>
                  <div className="iconos-contenedor">
                    <button type="button" className="btn btn-primary">
                      S/.12.00
                    </button>
                    <button data-bs-toggle="modal"
                    data-bs-target="#confirmModalPlato" type="button" className="btn btn-success">
                      Reservar
                    </button>
                  </div>
                </div>
              </div>
            </div>
            {/* Plato 12 */}
            <div className="col-12 col-md-6 col-lg-4">
              <div className="platos">
                <img src="../img/alitas-b.b.q..jpg" alt="Plato 12" />
                <div className="overlay">
                  <p>Alitas B.B.Q.</p>
                  <div className="iconos-contenedor">
                    <button type="button" className="btn btn-primary">
                      S/.15.00
                    </button>
                    <button data-bs-toggle="modal"
                    data-bs-target="#confirmModalPlato" type="button" className="btn btn-success">
                      Reservar
                    </button>
                  </div>
                </div>
              </div>
            </div>
            {/* Plato 13 */}
            <div className="col-12 col-md-6 col-lg-4">
              <div className="platos">
                <img src="../img/alitas-buffalo.jpg" alt="Plato 13" />
                <div className="overlay">
                  <p>Alitas Búfalo</p>
                  <div className="iconos-contenedor">
                    <button type="button" className="btn btn-primary">
                      S/.15.00
                    </button>
                    <button data-bs-toggle="modal"
                    data-bs-target="#confirmModalPlato" type="button" className="btn btn-success">
                      Reservar
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Plato 14 */}
            <div className="col-12 col-md-6 col-lg-4">
              <div className="platos">
                <img src="../img/cordon-bleu.webp" alt="Plato 14" />
                <div className="overlay">
                  <p>Cordon Bleu en Salsa Bechamel</p>
                  <div className="iconos-contenedor">
                    <button type="button" className="btn btn-primary">
                      S/.15.00
                    </button>
                    <button data-bs-toggle="modal"
                    data-bs-target="#confirmModalPlato" type="button" className="btn btn-success">
                      Reservar
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Plato 15 */}
            <div className="col-12 col-md-6 col-lg-4">
              <div className="platos">
                <img src="../img/arroz-cubana.webp" alt="Plato 15" />
                <div className="overlay">
                  <p>Arroz a la Cubana</p>
                  <div className="iconos-contenedor">
                    <button type="button" className="btn btn-primary">
                      S/.10.00
                    </button>
                    <button data-bs-toggle="modal"
                    data-bs-target="#confirmModalPlato" type="button" className="btn btn-success">
                      Reservar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <hr className="mx-auto my-4 w-80 border-top border-secondary" />

      {/*Sección Menú del Día*/}
      <div
        id="menu-dia"
        className="menu-container d-flex flex-column justify-content-center align-items-center"
      >
        <h2 className="seccion-titulo">Menú del Día</h2>
        <div className="menu-board">
          <div className="menu-header">Grand Central</div>
          <div className="menu-subheader">Menú del Día: 02/08</div>

          <div className="menu-category">
            <i className="bi bi-check2"></i> Entradas:
          </div>
          <label id="entrada1" className="entrada1">          
          <div className="menu-item">
            - Caldo de Pollo <input type="radio" name="entrada" value="1" />
          </div>
          </label>
          <label id="entrada2" className="entrada2">      
          <div className="menu-item">
            - Yuquitas con Tartara{" "}
            <input type="radio" name="entrada" value="2" />
          </div>
          </label>

          <div className="menu-category">
            <i className="bi bi-check2"></i> Fondos:
          </div>
          <label id="fondo1" className="fondo1"> 
          <div className="menu-item">
            - Aji de Gallina <input type="radio" name="fondo" value="1" />
          </div>
          </label>
          <label id="fondo2" className="fondo2"> 
          <div className="menu-item">
            - Pollo a la Mostaza <input type="radio" name="fondo" value="2" />
          </div>
          </label>

          <div className="menu-price">Precio: s/.12.00</div>
          <button data-bs-toggle="modal"
                    data-bs-target="#confirmModalPlato" type="button" className="btn btn-success ">
            Reservar
          </button>
        </div>
      </div>

      {/*Modal de Reserva Plato*/}
            <div
              className="modal fade"
              id="confirmModalPlato"
              tabIndex="-1"
              aria-labelledby="confirmModalLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="confirmModalLabel">
                      Confirmar acción
                    </h5>
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div className="modal-body">
                    ¿Estás seguro de deseas reservar este plato?
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      data-bs-dismiss="modal"
                    >
                      Cancelar
                    </button>
                    <button
                      type="button"
                      className="btn btn-success"
                      data-bs-dismiss="modal"
                    >
                      Confirmar
                    </button>
                  </div>
                </div>
              </div>
            </div>


      <hr className="mx-auto my-4 w-80 border-top border-secondary" />

      {/*Sección Votación*/}
      <div id="votacion" className="votacion-explicacion container my-5">
        <div className="row g-4">
          {/* Explicación de la lógica */}
          <div className="col-lg-6 p-50">
            <div className="votacion-explicacion-container card shadow-sm border-0 h-100">
              <div className="card-body">
                <h2 className="titulo-votacion card-title mb-3">
                  Votación para el Menú del Día
                </h2>
                <p className="card-text">
                  En esta nueva sección puedes participar activamente en la elección del menú que se servirá al día siguiente. Revisa las imágenes de los platos disponibles y selecciona tus opciones favoritas en las categorías de entradas y fondos.<br />Tu voto es importante para que podamos ofrecer los platos más deseados por todos. Las votaciones están abiertas hasta las 6:00 pm cada día, y los resultados definirán el menú del día siguiente.<br />¡No pierdas la oportunidad de elegir lo que más te gusta! Gracias por ser parte de esta dinámica que busca hacer el almuerzo más participativo y delicioso.
                </p>
                {/* Espacio para imagen */}
                <div className="text-center mt-2">
                  <img
                    src="../img/comidas_criollas_peruanas.png"
                    alt="Imagen explicativa"
                    className="comida-criolla img-fluid rounded"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Votaciones */}
          <div className="col-lg-6">
            <div className="card shadow-sm border-0 h-100">
              <div className="card-body">
                <h2 className="card-title text-center mb-4">
                  Votación de Entradas
                </h2>
                <div className="votacion-entrada">
                  <label className="entrada">
                    <div className="nombre-entrada">Causa</div>
                    <div className="barra-resultado">
                      <div className="relleno"></div>
                    </div>
                    <div className="porcentaje">17%</div>
                    <div className="checkbox-container">
                      <input type="radio" name="entrada-voto" value="1" />
                    </div>
                  </label>

                  <label className="entrada">
                    <div className="nombre-entrada">Ensalada Blanca</div>
                    <div className="barra-resultado">
                      <div className="relleno"></div>
                    </div>
                    <div className="porcentaje">17%</div>
                    <div className="checkbox-container">
                      <input type="radio" name="entrada-voto" value="2" />
                    </div>
                  </label>

                  <label className="entrada">
                    <div className="nombre-entrada">Papa a la Huancaína</div>
                    <div className="barra-resultado">
                      <div className="relleno"></div>
                    </div>
                    <div className="porcentaje">17%</div>
                    <div className="checkbox-container">
                      <input type="radio" name="entrada-voto" value="3" />
                    </div>
                  </label>
                </div>

                <h2 className="card-title text-center my-4">
                  Votación de Fondos
                </h2>
                <div className="votacion-fondo">
                  <label className="fondo">
                    <div className="nombre-fondo">Seco de Carne</div>
                    <div className="barra-resultado">
                      <div className="relleno"></div>
                    </div>
                    <div className="porcentaje">17%</div>
                    <div className="checkbox-container">
                      <input type="radio" name="fondo-voto" value="1" />
                    </div>
                  </label>

                  <label className="fondo">
                    <div className="nombre-fondo">Carapulcra</div>
                    <div className="barra-resultado">
                      <div className="relleno"></div>
                    </div>
                    <div className="porcentaje">17%</div>
                    <div className="checkbox-container">
                      <input type="radio" name="fondo-voto" value="2" />
                    </div>
                  </label>

                  <label className="fondo">
                    <div className="nombre-fondo">Cau Cau</div>
                    <div className="barra-resultado">
                      <div className="relleno"></div>
                    </div>
                    <div className="porcentaje">17%</div>
                    <div className="checkbox-container">
                      <input type="radio" name="fondo-voto" value="3" />
                    </div>
                  </label>
                </div>
                <div class="boton-votacion d-flex justify-content-center">
                  <button data-bs-toggle="modal"
                    data-bs-target="#confirmModalVotacion" type="button" className="btn btn-success">
                    Votar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/*Modal de Reserva Votación*/}
            <div
              className="modal fade"
              id="confirmModalVotacion"
              tabIndex="-1"
              aria-labelledby="confirmModalLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="confirmModalLabel">
                      Confirmar acción
                    </h5>
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div className="modal-body">
                    ¿Estás seguro de votar por estos platos?
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      data-bs-dismiss="modal"
                    >
                      Cancelar
                    </button>
                    <button
                      type="button"
                      className="btn btn-success"
                      data-bs-dismiss="modal"
                    >
                      Votar
                    </button>
                  </div>
                </div>
              </div>
            </div>


      {/*Sección Contacto*/}
      <section id="contacto" className="contacto">
        <div className="container">
          <div className="container text-center rectangulo d-flex justify-content-evenly">
            <div className="row">
              <div className="col-12 col-md-4 seccion-titulo">Hablemos!</div>
              <div className="col-12 col-md-4 descripcion">
                Si tienes alguna duda o te ocurrió algún error escríbenos a
                nuestro correo de contacto.
              </div>
              <div className="col-12 col-md-4">
                <a href="mailto:janedoe@micorreo.com">
                  <button type="button">
                    Contacto
                    <i className="bi bi-envelope-check-fill"></i>
                  </button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

    {/*Boton de BackToTop*/}
      <a
        href="#hero"
        class="boton-top btn btn-primary"
        aria-label="Ir a navegación"
        title="Ir a navegación"
      >
        <i class="bi bi-arrow-up"></i>
      </a>
    </>
  );
}

export default Home;
