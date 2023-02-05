import React from "react";
import { REGISTER_WITH_EMAIL } from "../utilities/utils.email";
import IconCheck from "./icons/IconCheck";
import { NavLink } from "react-router-dom";
import NavbarStyled from "./Navbar.styled";

function Navbar({ user, logout, profile, verifyEmail }) {
  const handleLogout = (e) => {
    e.preventDefault();
    logout();
  };

  const MenuUserNotLogged = () => (
    <NavigationMenu>
      <MyNavLink to={"/login"}>Signin</MyNavLink>
      <MyNavLink to={`/login/${REGISTER_WITH_EMAIL}`}>SignUp</MyNavLink>
    </NavigationMenu>
  );

  const MenuUser = () => (
    <NavigationMenu>
      {profile && <MyAvatar profile={profile} verifyEmail={verifyEmail} />}
      <MyLink onClick={handleLogout}>Logout</MyLink>
    </NavigationMenu>
  );

  return (
    <NavbarStyled>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <a className="navbar-brand" href="/">
            <h1 className="lead font-weight-bold mb-0">LinksApp</h1>
          </a>
          <button
            className="navbar-toggler collapsed"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          {user ? <MenuUser /> : <MenuUserNotLogged />}
        </div>
      </nav>
    </NavbarStyled>
  );
}

export default Navbar;

const MyNavLink = ({ to, children }) => (
  <li className="nav-item">
    <NavLink className="nav-link" to={to} alt="nav-link">
      {children}
    </NavLink>
  </li>
);

const MyLink = ({ onClick, children }) => (
  <li className="nav-item">
    <a href="/" className="nav-link" onClick={onClick} alt="nav-link">
      {children}
    </a>
  </li>
);

const NavigationMenu = ({ children }) => (
  <div className="navbar-collapse collapse" id="navbarNav">
    <ul className="navbar-nav d-flex justify-content-between ml-auto">
      {children}
    </ul>
  </div>
);

const MyAvatar = ({ profile, verifyEmail }) => {
  const { displayName, photoURL, email, emailVerified } = profile;

  const displayNameText = displayName ?? email;

  return (
    <li className="navbar-avatar nav-item d-flex justify-content-center align-items-center">
      <a
        className="h5 d-flex justify-content-center align-items-center m-0 text-white"
        href="/"
      >
        <MyAvatarImage src={photoURL} />
        <span className="small">{displayNameText}</span>
      </a>
      {emailVerified ? (
        <IconCheck />
      ) : (
        <button onClick={verifyEmail}>Verificare Email</button>
      )}
    </li>
  );
};

const MyAvatarImage = ({ src, size }) => (
  <img
    src={src ?? "https://via.placeholder.com/40"}
    width={size ?? "30"}
    height={size ?? "30"}
    className="bg-info rounded-circle d-inline-block align-top"
    alt="profile avatar"
    referrerPolicy="no-referrer"
  />
);
