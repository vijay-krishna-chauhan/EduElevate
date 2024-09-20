import "./App.css";

import { Route, Router, Routes } from "react-router-dom";
import { useState } from "react";
import Home from "./pages/Home";
import Footer from "./components/common/Footer";
import Navbar from "./components/common/Navbar";
import Catalog from "./pages/Catalog";

function App() {

  return (
    <div>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="catalog/:catalogName" element={<Catalog/>} />
        {/* <Route
          path="/login"
          element={
            <OpenRoute>
              <Login />
            </OpenRoute>
          }
        /> */}
      </Routes>
      <Footer/>
    </div>
  )
}

export default App;
