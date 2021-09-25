import React from "react";

const Clima = ({ resultado }) => {
  //extraer valores de resultado
  const { name, main } = resultado;

  if (!name) return null;

  const kelvin = 273.15;

  return (
    <div className="card-panel white col s12">
      <div className="black-text">
        <h2>El clima de {name} es:</h2>
        <p className="temperatura">
          {parseInt(main.temp - kelvin)}
          <span>&#x2103;</span>
        </p>
        <p>
          Temperatura maxima:
          {parseInt(main.temp_max - kelvin)}
          <span>&#x2103;</span>
        </p>
        <p>
          Temperatura minima:
          {parseInt(main.temp_min - kelvin)}
          <span>&#x2103;</span>
        </p>
      </div>
    </div>
  );
};

export default Clima;
