import React from "react";

function UserForm() {
  return (
    <div className="card card-body mt-5">
      <form>
        <div className="form-group">
          <input
            type="text"
            name="name"
            className="form-control"
            placeholder="Inserisci nome"
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            name="website"
            className="form-control"
            placeholder="Inserisci email"
          />
        </div>
        <button className="btn btn-primary btn-block">Invio</button>
      </form>
    </div>
  );
}

export default UserForm;
