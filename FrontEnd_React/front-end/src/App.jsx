import React from "react";
import AppRouter from "./Router"; // Correct the import
import { ToastContainer, toast } from "react-toastify";

function App() {
  return (
    <div className="App">
      <AppRouter />
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition:Bounce
      />
    </div>
  );
}

export default App;
