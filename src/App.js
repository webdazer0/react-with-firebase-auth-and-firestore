import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
// Toast
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Hooks
import useLogin from "./hooks/useLogin";
// Components
import Navbar from "./components/Navbar";
import Wrapper from "./layout/Wrapper";
import Loading from "./components/Loading";
// Pages
import HomePage from "./pages/home/HomePage";
import NotFoundPage from "./pages/404/NotFoundPage";
import LoginPage from "./pages/login/LoginPage";

function App() {
  const {
    user,
    setModal,
    setRegister,
    setLogin,
    logout,
    handleLogout,
    profile,
    verifyEmail,
  } = useLogin();

  return (
    <div className="App">
      <Suspense fallback={<Loading />}>
        <Navbar
          {...{
            user,
            setModal,
            setRegister,
            setLogin,
            logout,
            handleLogout,
            profile,
            verifyEmail,
          }}
        />

        <Wrapper>
          <Routes>
            <Route path="/" element={<HomePage />} /> {/* // protected */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/login/:type" element={<LoginPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Wrapper>
      </Suspense>

      <ToastContainer />
    </div>
  );
}

export default App;
