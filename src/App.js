import React, { useEffect, useState } from "react";
import "./App.css";
import Modal from "./components/Modal";
import Navbar from "./components/Navbar";
import Home from "./Home";
import Wrapper from "./layout/Wrapper";
import { auth, googleProvider, facebookProvider } from "./services/firebase";

function App() {
  const [register, setRegister] = useState(false);
  const [login, setLogin] = useState(false);
  const [modal, setModal] = useState(false);
  const [user, setUser] = useState(false);
  const [logout, setLogout] = useState(true);
  const [profile, setProfile] = useState({});

  const registerLogin = (allData) => {
    const { email, password } = allData;

    if (login) {
      auth
        .signInWithEmailAndPassword(email, password)
        .then((credentials) => console.log("Email signin!"))
        .catch(console.log)
        .finally(closeModal);
    } else if (register) {
      auth
        .createUserWithEmailAndPassword(email, password)
        .then((credentials) => console.log("Email Sign up!"))
        .catch(console.log)
        .finally(closeModal);
    }
  };

  const loginWithGoogle = () => {
    auth
      .signInWithPopup(googleProvider)
      .then((credentials) => console.log("Google Sign in"))
      .catch(console.log)
      .finally(closeModal);
  };

  const loginWithFacebook = () => {
    auth
      .signInWithPopup(facebookProvider)
      .then((credentials) => console.log("Facebook Sign in"))
      .catch(console.log)
      .finally(closeModal);
  };

  const verifyEmail = async () => {
    await auth.currentUser.sendEmailVerification();
  };

  const handleLogout = (e) => {
    e.preventDefault();
    auth.signOut().then(() => console.log("Logout Successfully!!!"));
    closeModal();
  };

  const closeModal = () => {
    setModal(false);
    setLogin(false);
    setRegister(false);
  };

  const controlUser = () => {
    auth.onAuthStateChanged((userLogged) => {
      const isLogged = !!userLogged;

      setUser(isLogged);
      setLogout(!isLogged);

      if (isLogged) {
        console.log("currentUser");
        console.log(auth.currentUser);
        setProfile({ ...userLogged });
      }
    });
  };

  useEffect(() => {
    controlUser();
  }, [user]);

  return (
    <div className="App">
      <Navbar
        {...{
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
        {user && <Home />}
        {modal && (
          <Modal
            {...{
              registerLogin,
              loginWithGoogle,
              loginWithFacebook,
              register,
              login,
              closeModal,
            }}
          />
        )}
      </Wrapper>
    </div>
  );
}

export default App;
