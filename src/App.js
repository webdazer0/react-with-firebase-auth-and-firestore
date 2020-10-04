import React, { useEffect, useState } from "react";
import "./App.css";
import Modal from "./components/Modal";
import Navbar from "./components/Navbar";
import Home from "./Home";
import Wrapper from "./layout/Wrapper";
import { auth, provider, fbProvider } from "./services/firebase";

function App() {
  const [register, setRegister] = useState(false);
  const [login, setLogin] = useState(false);
  const [modal, setModal] = useState(false);
  const [user, setUser] = useState(false);
  const [logout, setLogout] = useState(true);
  const [profile, setProfile] = useState({});
  const [verify, setVerify] = useState(false);

  const registerLogin = (allData) => {
    const { email, password } = allData;

    if (login) {
      auth
        .signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
          console.log("signin!");
        });
    } else if (register) {
      auth
        .createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
          console.log("signup successfully!");
        });
    }
    closeModal();
  };

  const loginWithGoogle = () => {
    auth
      .signInWithPopup(provider)
      .then((result) => {
        console.log("google sign in");
      })
      .catch((err) => {
        console.log(err);
      });
    closeModal();
  };

  const loginWithFacebook = () => {
    auth
      .signInWithPopup(fbProvider)
      .then((result) => {
        console.log("facebook sign in");
      })
      .catch((err) => {
        console.log(err);
      });
    console.log("login with FACEBOOK!!!!");
    closeModal();
  };

  const controlUser = () => {
    auth.onAuthStateChanged((userLogged) => {
      if (userLogged) {
        console.log(userLogged);
        console.log("currentUser");
        console.log(auth.currentUser);
        setProfile({ ...userLogged });
        setUser(true);
        setLogout(false);
      } else {
        setUser(false);
        setLogout(true);
      }
    });
  };

  const verifyEmail = async () => {
    await auth.currentUser.sendEmailVerification();
    console.log("inviando email!");
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
