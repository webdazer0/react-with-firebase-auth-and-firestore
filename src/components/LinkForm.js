import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import * as LinkService from "../services/linkService";

function LinkForm({ addOrEdit, links, currentId }) {
  const initialStateValue = {
    url: "",
    website: "",
    description: "",
  };
  const [values, setValues] = useState(initialStateValue);

  const getLinkById = async (id) => {
    const link = await LinkService.getById(id);
    setValues(link);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const validatorUrl = (yourUrl) => {
    return /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(
      yourUrl
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validatorUrl(values.url)) {
      return toast("Invalid URL!", { type: "warning", autoClose: 1000 });
    }
    addOrEdit(values);
    setValues({ ...initialStateValue });
  };

  useEffect(() => {
    if (currentId) {
      getLinkById(currentId);
    }
  }, [currentId]);

  const { url, website, description } = values;

  return (
    <div className="col-md-4 mb-4">
      <div
        className={`card card-body border ${
          !currentId ? "" : "border-warning"
        }`}
      >
        <form onSubmit={handleSubmit}>
          <div className="form-group input-group">
            <div className="input-group-text bg-light">
              <i className="material-icons md-18">http</i>
            </div>
            <input
              type="text"
              name="url"
              value={url}
              className="form-control"
              placeholder="Your website url"
              onChange={handleChange}
            />
          </div>
          <div className="form-group input-group">
            <div className="input-group-text bg-light">
              <i className="material-icons md-18">create</i>
            </div>
            <input
              type="text"
              name="website"
              value={website}
              className="form-control"
              placeholder="Your website"
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <textarea
              name="description"
              id=""
              rows="3"
              value={description}
              className="form-control"
              placeholder="Write a description"
              onChange={handleChange}
            ></textarea>
          </div>
          <button
            className={`btn btn-${
              !currentId ? "primary" : "warning"
            } btn-block`}
          >
            {!currentId ? "Submit" : "Update"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default LinkForm;
