import React, { useState } from "react";
import { NavLink, useParams, useNavigate } from "react-router-dom";
import "./login_page.css";
//
import useLogin from "../../hooks/useLogin";
import {
  LOGIN_WITH_EMAIL,
  REGISTER_WITH_EMAIL,
} from "../../utilities/utils.email";
import IconClouds from "../../components/icons/IconCloud";

const initialLoginValue = {
  email: "",
  password: "",
  type: LOGIN_WITH_EMAIL,
};

const LoginPage = () => {
  const params = useParams();
  const navigate = useNavigate();

  const {
    loginWithEmail,
    registerWithEmail,
    loginWithGoogle,
    loginWithFacebook,
  } = useLogin();

  const [user, setUser] = useState(initialLoginValue);

  const goToHome = () => navigate("/");

  const handleLogin = async (e) => {
    e.preventDefault();

    if (isLogin) {
      return await loginWithEmail(user).then(goToHome);
    }
    return await registerWithEmail(user).then(goToHome);
  };

  const handleLoginWithGoogle = async () => {
    await loginWithGoogle().then(goToHome);
  };

  const handleLoginWithFacebook = async () => {
    await loginWithFacebook().then(goToHome);
  };

  let isLogin = !(params.type === REGISTER_WITH_EMAIL);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const textSubmit = isLogin ? "Sign in" : "Register";
  const classSubmit = isLogin ? "primary" : "secondary";

  const { email, password } = user;

  return (
    <div className="content w-100 d-flex justify-content-center">
      <form
        style={{ width: "22rem" }}
        className="card p-4"
        onSubmit={handleLogin}
      >
        <InputField
          type="email"
          id={"form2Example1"}
          onChange={handleChange}
          value={email}
        >
          Email address
        </InputField>
        <InputField
          type="password"
          id={"form2Example2"}
          onChange={handleChange}
          value={password}
        >
          Password
        </InputField>

        {isLogin && (
          <div className="row mb-4">
            <div className="col d-flex justify-content-center">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value=""
                  id="form2Example31"
                />
                <label className="form-check-label" htmlFor="form2Example31">
                  Remember me
                </label>
              </div>
            </div>

            <div className="col">
              <a href="#!">Forgot password?</a>
            </div>
          </div>
        )}

        <button
          type="submit"
          className={`btn btn-${classSubmit} btn-block mb-4`}
        >
          {textSubmit}
        </button>

        {isLogin ? (
          <div className="text-center">
            <p>
              Not a member? <NavLink to="./register">Register</NavLink>
            </p>
            <p>or sign up with:</p>
            <button
              type="button"
              className="btn  btn-floating mx-1 circle-link"
              onClick={handleLoginWithFacebook}
            >
              <i className="fab fa-facebook-f"></i>
            </button>
            <button
              type="button"
              className="btn  btn-floating mx-1 circle-link"
              onClick={handleLoginWithGoogle}
            >
              <i className="fab fa-google"></i>
            </button>
          </div>
        ) : (
          <div className="text-center">
            <p>
              Are you already registered? <NavLink to="/login">Sign in</NavLink>
            </p>
          </div>
        )}
      </form>
      <IconClouds />
    </div>
  );
};

export default LoginPage;

const InputField = ({ children, id, onChange, value, type = "text" }) => (
  <div className="form-outline mb-4">
    <input
      type={type}
      name={type}
      id={id}
      onChange={onChange}
      value={value}
      className="form-control"
      required
    />
    <label className="form-label" htmlFor={id}>
      {children}
    </label>
  </div>
);
