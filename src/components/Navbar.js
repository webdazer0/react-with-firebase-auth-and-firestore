import React from "react";

function Navbar({
  setModal,
  setRegister,
  setLogin,
  logout,
  handleLogout,
  profile,
  verifyEmail,
}) {
  const handleModal = (e, myfunction) => {
    e.preventDefault();
    myfunction(true);
    setModal(true);
  };
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <a className="navbar-brand" href="/">
          <h1 className="h1">LinksApp</h1>
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
        <div className="navbar-collapse collapse" id="navbarNav">
          <ul className="navbar-nav d-flex justify-content-between ml-auto">
            {logout ? (
              <>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    href="/"
                    onClick={(e) => handleModal(e, setLogin)}
                  >
                    Signin
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    href="/"
                    onClick={(e) => handleModal(e, setRegister)}
                  >
                    SignUp
                  </a>
                </li>
              </>
            ) : (
              <>
                {console.log("profile")}
                {console.log(profile)}
                {profile && (
                  <li className="nav-item d-flex justify-content-center align-items-center">
                    <a
                      className="h5 d-flex justify-content-center align-items-center m-0"
                      href="/"
                    >
                      <img
                        src={profile.photoURL}
                        width="40"
                        height="40"
                        className="d-inline-block align-top pr-1"
                        alt=""
                      />
                      {profile.displayName
                        ? profile.displayName
                        : profile.email}
                    </a>
                    {profile.emailVerified ? (
                      <span className="text-success pl-1"> ✔</span>
                    ) : (
                      <button onClick={() => verifyEmail()}>
                        Verificare Email
                      </button>
                    )}
                  </li>
                )}
                <li className="nav-item">
                  <a
                    className="nav-link"
                    href="/"
                    onClick={(e) => handleLogout(e)}
                  >
                    Logout
                  </a>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
