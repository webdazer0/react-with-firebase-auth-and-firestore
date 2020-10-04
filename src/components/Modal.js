import React, { useState } from "react";

function Modal({
  registerLogin,
  loginWithGoogle,
  loginWithFacebook,
  register,
  login,
  closeModal,
}) {
  const initialLoginValue = {
    email: "",
    password: "",
  };
  const [newUser, setNewUser] = useState(initialLoginValue);

  const handleLogin = (e) => {
    e.preventDefault();
    registerLogin(newUser);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
  };

  const { email, password } = newUser;
  let textSubmit = "";
  let classSubmit = "";
  let textForm = "";
  if (register) {
    textSubmit = "SignUp";
    classSubmit = "primary";
    textForm = "Registrati";
    console.log("ciao da Register.... Signup");
  } else if (login) {
    textSubmit = "Login";
    classSubmit = "dark";
    textForm = "SignIn";
    console.log("ciao da Login.... Signin");
  }
  return (
    <>
      <div
        className="modal fade show"
        id="signupModal"
        tabIndex="-1"
        role="dialog"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLongTitle">
                {textForm}
              </h5>
              <button
                type="button"
                className="close"
                onClick={() => closeModal()}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleLogin} className="form" id="signup-form">
                <div className="form-group">
                  <input
                    type="text"
                    id="signup-email"
                    className="form-control"
                    name="email"
                    value={email}
                    placeholder="email"
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    id="signup-password"
                    className="form-control"
                    name="password"
                    value={password}
                    placeholder="password"
                    onChange={handleChange}
                    required
                  />
                </div>
                <button
                  type="submit"
                  className={`btn btn-${classSubmit} btn-block`}
                >
                  {textSubmit}
                </button>
                {login && (
                  <>
                    <button
                      type="button"
                      onClick={() => loginWithGoogle()}
                      className={`btn btn-warning btn-block d-flex justify-content-center align-items-center`}
                    >
                      <span className="pr-1">{textSubmit} with Google </span>
                      <i className="material-icons"> whatshot</i>
                    </button>
                    <button
                      type="button"
                      onClick={() => loginWithFacebook()}
                      className={`btn btn-primary btn-block d-flex justify-content-center align-items-center`}
                    >
                      <span className="pr-1">{textSubmit} with Facebook </span>
                      <i className="material-icons"> facebook</i>
                    </button>
                  </>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Modal;
