import "./List.css";
import React from "react";

const List = (props) => {
  //todo FUNCTION to call parent update hour function
  let updateHour = (e) => {
    let type = "incr";
    if (e.target.innerText == "-") {
      type = "decr";
    } else if (e.target.innerText == "🗑️") {
      type = "delete";
    }
    props.updateFn(props.id, type);
  };

  return (
    <div className="list">
      <div className="subject-name">
        <h3>{props.obj.subject}</h3>
      </div>
      <div className="total-hours">
        <h4>
          <span>{props.obj.hours}</span> Hours
        </h4>
      </div>
      <div className="list-btn-container">
        <button title="Add hour" onClick={updateHour}>
          +
        </button>
        <button title="Subtract hour" onClick={updateHour}>
          -
        </button>
        <button title="Delete" onClick={updateHour}>
          🗑️
        </button>
      </div>
    </div>
  );
};

export default List;
