import React from "react";
import CountUp from "react-countup";
import "./Card.scss";

const Card = ({ title, value }) => {
  return (
    <div className="cards">
      <h2>{title}</h2>
      <div className="card-content">
        <h3>
          <CountUp end={value} duration={2.5} separator="," />
        </h3>
      </div>
    </div>
  );
};
//fory
export default Card;
