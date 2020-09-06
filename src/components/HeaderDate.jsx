import React from "react";
import close from "../assets/static/close.svg";
import '../assets/styles/HeaderDate.scss'

const HeaderDate = ({ dayofMonth, day, month, year, list }) => {

    const dayOfMontList = [
      "Domingo",
      "Lunes",
      "Martes",
      "Miercoles",
      "Jueves",
      "Viernes",
      "Sabado"
    ]

  return (
    <div className="Calendar__header">
      <div className="Calendar__header--title">
        <img src={close} alt="" />
        <h4>
          {dayOfMontList[dayofMonth] || new Date().getDay()}
        </h4>
      </div>

      <div className="Calendar__header--texts">
        <h1>{day || new Date().getDate()}</h1>
        <h2>{list[month] || new Date().getMonth()} </h2>
        <h3>{year || new Date().getFullYear()}</h3>
      </div>
    </div>
  );
};

export default HeaderDate;
