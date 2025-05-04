import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRefreshMutation } from "./components/RTK/Auth/AuthApi";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useLogoutMutation } from './components/RTK/Auth/AuthApi';
// Comps 
import Home from "./components/Home/Home";
import Login from "./components/LoginSystem/Login/Login";
import SignUp from "./components/LoginSystem/SignUp/SignUp";
import Account from "./components/Account/Account";
import AddProperties from "./components/AddProperties/AddProperties";
import Chat from "./components/Chat/Chat";
import RentalsDetails from "./components/RentalsDetails/RentalsDetails";
import Admin from "./components/Admin/Dashboard";
import SearchResult from "./components/SearchResult/SearchResult";
import Saved from "./components/Saved/Saved";

import "./App.css";

const App: React.FC = () => {
  const userRole: string = localStorage.getItem('userRole') || '';
  const [refresh] = useRefreshMutation();
  const [logout] = useLogoutMutation();
  const navigate = useNavigate();


  useEffect(() => {
    const intervalId = setInterval(() => {
      const refreshToken = localStorage.getItem('refreshToken');
      const userId = localStorage.getItem('userId') || '';

      if (refreshToken) {
        refresh({ refreshToken, userId })
          .then((res: any) => {
            console.log("Refresh response:", res);

            if (res?.data?.token) {
              const { token, refreshToken: newRefreshToken, role } = res.data;

              localStorage.setItem('token', token);
              if (newRefreshToken) localStorage.setItem('refreshToken', newRefreshToken);
              if (role) localStorage.setItem('userRole', role);

              console.log('Tokens refreshed successfully');
            } else {
              console.error("Unexpected refresh structure:", res);
              throw new Error("Invalid refresh response");
            }
          })
          .catch(async (err) => {
            console.error('Failed to refresh token', err);

            try {
              await logout().unwrap();
            } catch (logoutErr) {
              console.error("Logout failed on backend", logoutErr);
            }

            localStorage.clear();
            navigate('/');
          });
      } else {
        localStorage.clear();
        navigate('/');
      }
    }, 10000);

    return () => clearInterval(intervalId); // تنظيف الـ interval عند الخروج
  }, [refresh, logout, navigate]);

  // localStorage.clear()

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
            <Route path="/SignUp" element={<SignUp />} />
            {userRole === 'landlord' || userRole === 'tenant' ?(
              <Route path="/Account" element={<Account />} />
            ): ''}
            <Route path="/RentalsDetails/:id" element={<RentalsDetails />} />
            <Route path="/SearchResult/:SearchResultLocation" element={<SearchResult />} />
            {userRole === 'landlord' && (
              <Route path="/AddProperties" element={<AddProperties />} />
            )}
            {userRole === 'tenant' && (
              <Route path="/savedProperties" element={<Saved />} />
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
