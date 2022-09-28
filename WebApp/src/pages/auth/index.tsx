import React from "react";
import Login from "../../components/Auth/Login";
import Register from "../../components/Auth/Register";
import authStyle from "./Auth.module.css";

function index() {
  return (
    <div className={authStyle.main}>
      <input
        className={authStyle.chk}
        type="checkbox"
        name="chk"
        id="chk"
        aria-hidden="true"
      />
      <Register authStyle={authStyle} />
      <Login authStyle={authStyle} />
    </div>
  );
}

export default index;
