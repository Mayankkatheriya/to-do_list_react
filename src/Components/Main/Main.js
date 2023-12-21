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
      setListData(()=>{
        let data=getListData();
        data.push({ subject: subjectName, hours: parseInt(hours) });
        localStorage.setItem("data",JSON.stringify(data));
        return data;
      });
      setSubjectname("");
      sethours("");
    }
  };

  //todo common increment and decrement function and sene as a prop to lifting up state to change hour value when '+' , '-' button clicked
  const UpdateHandler = (idx, type) => {
    if (type === "incr") {
      if (listData[idx].hours===99) return;
      let newHour = [...listData];
      newHour[idx].hours += 1;
      setListData(newHour);
    } else {
        if (listData[idx].hours === 1) return;
        let newHour = [...listData];
        newHour[idx].hours -= 1;
        setListData(newHour);
    }
    localStorage.setItem("data", JSON.stringify(listData));
  };

  //Todo ClearData func to clear all listdata from local storage
  const clearData = () => {
    localStorage.removeItem("data");
    setListData([]);
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
          step={1}
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
      <div className="clear-btn">
        <button style={{display: (listData.length==0) ? "none" : "flex"}} onClick={clearData}>Clear All</button>
      </div>
    </main>
  );
};
export default Main;
