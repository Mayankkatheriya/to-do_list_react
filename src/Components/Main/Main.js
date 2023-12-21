import React from "react";
import { useState } from "react";
import "./Main.css";
import List from "./List";

const Main = () => {
  const getListData = () => {
    return JSON.parse(localStorage.getItem("data")) || [];
  }
  //todo  taking state variables
  let [subjectName, setSubjectname] = useState("");
  let [hours, sethours] = useState("");
  let [listData, setListData] = useState(getListData());

  

  //todo common change function to handle changes in inputs
  const onChangeHandler = (e, func) => {
    func(e.target.value);
  };

  //todo click event on add button to add new list
  const addList = () => {
    if (subjectName == "" || hours == "") {
      alert("Required all Fields");
    } else if (hours == 0) {
      alert("Hours should be greater than zero");
    } else if (hours > 99) {
      alert("Hours should not exceed 99");
    } else {
      setListData([
        ...listData,
        {
          subject: subjectName,
          hours: Number(hours),
        },
      ]);
      setSubjectname("");
      sethours("");
    }
    localStorage.setItem("data", JSON.stringify(listData));
  };

  //todo common increment and decrement function and sene as a prop to lifting up state to change hour value when '+' , '-' button clicked
  const UpdateHandler = (idx, type) => {
    if (type === "incr") {
      if (listData[idx].hours >= 99) return;
      let newHour = [...listData];
      newHour[idx].hours += 0.5;
      setListData(newHour);
    } else {
      if (listData[idx].hours === 1) return;
      let newHour = [...listData];
      newHour[idx].hours -= 0.5;
      setListData(newHour);
    }
    localStorage.setItem("data", JSON.stringify(listData));
  };

  return (
    <main>
      <div className="form">
        <input
          type="text"
          placeholder="Subject Name"
          value={subjectName}
          onChange={(e) => onChangeHandler(e, setSubjectname)}
          required
        />
        <input
          type="number"
          placeholder="Hours"
          min={1}
          step={0.5}
          value={hours}
          onChange={(e) => onChangeHandler(e, sethours)}
          required
        />
        <button onClick={addList}>Add</button>
      </div>
      <div className="list-container">
        {listData.map((item, index) => (
          <List key={index} obj={item} updateFn={UpdateHandler} id={index} />
        ))}
      </div>
    </main>
  );
};

export default Main;
