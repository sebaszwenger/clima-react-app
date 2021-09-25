import { useState, useEffect } from "react";

import Header from "./components/Header";
import Formulario from "./components/Formulario";
import Clima from "./components/Clima";
import Error from "./components/Error";

function App() {
  //state de busqueda
  const [busqueda, setBusqueda] = useState({
    ciudad: "",
    pais: "",
  });

  //state validacion para consultar API
  const [consultar, setConsultar] = useState(false);

  //Almacena la respuesta de la API
  const [resultado, setResultado] = useState({});

  //si hay un error en la llamada a la API
  const [error, setError] = useState(false);

  //Extrae ciudad y pais
  const { ciudad, pais } = busqueda;

  useEffect(() => {
    const consultarAPI = async () => {
      const appId = "015a7ddb28f1db94929c8d18ad5c619f";
      if (consultar) {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`;

        const respuesta = await fetch(url);
        const resultado = await respuesta.json();

        setResultado(resultado);
        setConsultar(false);

        //Detecta si hubo resultados correctos con la consulta
        if (resultado.cod === "404") {
          setError(true);
        } else {
          setError(false);
        }
      }
    };

    consultarAPI();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [consultar]);

  //Carga condicional de componente
  let componente;
  if (error) {
    componente = <Error mensaje="No hay Resultado" />;
  } else {
    componente = <Clima resultado={resultado} />;
  }

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
            <div className="col m6 s12">{componente}</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
