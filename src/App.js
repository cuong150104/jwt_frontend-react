import "./App.scss";
import Nav from "./components/Navigation/Nav";
import { BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useEffect, useState } from "react";
import AppRoutes from "./routes/AppRoutes";

function App() {
  return (
    <>
      <Router>
        <div className="app-header">
          <Nav />
        </div>

        <div className="app-contanier">
          <AppRoutes />
        </div>
      </Router>
      <ToastContainer
        position="bottom-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default App;