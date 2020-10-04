import React from "react";

function Wrapper({ children }) {
  return (
    <div className="container pt-5">
      <div className="row">{children}</div>
    </div>
  );
}

export default Wrapper;
