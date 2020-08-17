import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import "bootstrap/dist/css/bootstrap.min.css";
import "leaflet-control-geocoder/dist/Control.Geocoder.js";
ReactDOM.render(<App />, document.getElementById("root"));
// document.addEventListener("mousewheel", this.mousewheel.bind(this), { passive: false });

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();


