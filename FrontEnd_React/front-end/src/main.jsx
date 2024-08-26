import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import Loading from "./compnents/Loading.jsx";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <div className="body home_body1">
      <div className="centering">
        <Loading />
      </div>
    </div>
  </React.StrictMode>
);

const hideLoadingAnimation = () => {
  const loadingContainer = document.querySelector(".loading-container");
  if (loadingContainer) {
    loadingContainer.style.display = "none";
  }
};

setTimeout(() => {
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
  hideLoadingAnimation();
}, 3000);
