import React from "react";
import Links from "./components/Links";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Home() {
  return (
    <>
      <Links />
      <ToastContainer />
    </>
  );
}

export default Home;
