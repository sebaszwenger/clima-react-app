import { useState, useEffect } from "react";

import Header from "./components/Header";
import Formulario from "./components/Formulario";

function App() {
  //state de busqueda
  const [busqueda, setBusqueda] = useState({
    ciudad: "",
    pais: "",
  });

  //state validacion para consultar API
  const [consultar, setConsultar] = useState(false);

  //Extrae ciudad y pais
  const { ciudad, pais } = busqueda;

  useEffect(() => {
    const consultarAPI = async () => {
      const appId = "015a7ddb28f1db94929c8d18ad5c619f";
      if (consultar) {
        const url = `http://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`;

        const respuesta = await fetch(url);
        const resultado = await respuesta.json();
        console.log(resultado);
      }
    };
    consultarAPI();
  }, [consultar]);

  return (
    <>
      <Header titulo="Clima React App" />

      <div className="contenedor-form">
        <div className="container">
          <div className="row">
            <div className="col m6 s12">
              <Formulario
                busqueda={busqueda}
                setBusqueda={setBusqueda}
                setConsultar={setConsultar}
              />
            </div>
            <div className="col m6 s12">2</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
