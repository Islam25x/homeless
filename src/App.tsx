import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
// Comps 
import Home from "./components/Home/Home";
import Login from './components/AuthSystem/Login/Login';
import Register from './components/AuthSystem/Register/Register';
import Account from "./components/Account/Account";
import AddProperties from "./components/AddProperties/AddProperties";
import Chat from "./components/Chat/Chat";
import RentalsDetails from "./components/RentalsDetails/RentalsDetails";
import Admin from "./components/Admin/Dashboard";
import SearchResult from "./components/SearchResult/SearchResult";
import Saved from "./components/Saved/Saved";
import MyProperties from './components/MyProperties/MyProperties';

import "./App.css";

const App: React.FC = () => {
  const userRole: string = localStorage.getItem('userRole') || '';
  return (
    <>
      <Routes>
        {userRole === 'admin' ? (
          <>
            <Route path="/" element={<Admin />} />
            <Route path="/RentalsDetails/:id" element={<RentalsDetails />} />
          </>
        ) : (
          <>
            <Route path="/" element={<Home />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/Register" element={<Register />} />
            {userRole === 'landlord' || userRole === 'tenant' ? (
              <Route path="/Account" element={<Account />} />
            ) : ''}
            <Route path="/RentalsDetails/:id" element={<RentalsDetails />} />
            <Route path="/SearchResult/:location?/:from?/:to?" element={<SearchResult />} />
            {userRole === 'landlord' && (
              <Route path="/AddProperties" element={<AddProperties />} />
            )}
            {userRole === 'tenant' && (
              <>
                <Route path="/savedProperties" element={<Saved />} />
                <Route path="/MyProperties" element={<MyProperties />} />
              </>
            )}
            {(userRole === 'landlord' || userRole === 'tenant') && (
              <Route path="/Chat" element={<Chat />} />
            )}
          </>
        )}
      </Routes>
      <ToastContainer position="top-center" autoClose={3000} />
    </>
  );
};

export default App;
