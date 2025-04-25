import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// Comps 
import Home from "./components/Home/Home";
import Login from "./components/LoginSystem/Login/Login";
import SignUp from "./components/LoginSystem/SignUp/SignUp";
import Account from "./components/Account/Account";
import AddProperties from "./components/AddProperties/AddProperties";
import Chat from "./components/Chat/Chat";
import RentalsDetails from "./components/RentalsDetails/RentalsDetails";
import Admin from "./components/Admin/Dashboard";

import "./App.css";
const App :React.FC = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/Account" element={<Account />} />
          <Route path="/AddProperties" element={<AddProperties />} />
          <Route path="/Chat" element={<Chat />} />
          <Route path="/RentalsDetails/:id" element={<RentalsDetails />} />
          <Route path="/Admin" element={<Admin />} />
        </Routes>
      </BrowserRouter>
    </>
  )
};

export default App;
