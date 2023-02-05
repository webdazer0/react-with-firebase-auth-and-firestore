import React, { useEffect, useState } from "react";
import * as LinkService from "../services/linkService";
import LinkForm from "./LinkForm";

import { toast } from "react-toastify";
import Utils from "../utilities/utils";

function Links() {
  const [links, setLinks] = useState([]);
  const [currentId, setCurrentId] = useState(null);

  const addOrEdit = async (alldata) => {
    const item = {
      ...alldata,
    };

    try {
      if (currentId) {
        await LinkService.updateById(currentId, item);
        setCurrentId("");
        return toast("Link updated!!", { type: "success" });
      } else {
        await LinkService.create(item);
        return toast("New link added!", { type: "success" });
      }
    } catch (error) {
      console.error(error);
      toast(error.message, { type: "error" });
    }
  };

  const deleteLink = async (linkId) => {
    const message = "Are you sure to delete this link?";
    if (!window.confirm(message)) return;

    await LinkService.deleteById(linkId);
    toast("Link removed successfully!", { type: "error" });
  };

  const getLinks = async () => {
    await LinkService.getAll(setLinks);
  };

  useEffect(() => {
    getLinks();
  }, []);

  return (
    <>
      <LinkForm {...{ addOrEdit, links, currentId }} />
      <div className="col-md-8">
        <div className="row">
          {links.map(({ url, website, description, id, createdAt }, index) => (
            <div key={id} className="col-md-6">
              <div className="card mb-4 ">
                <div className="card-header d-flex justify-content-between">
                  <div>
                    <h5 className="mb-0">{website}</h5>

                    <span
                      data-toggle="tooltip"
                      className="text-secondary d-flex align-items-center"
                      title={Utils.dateFullFormat(createdAt?.toDate())}
                    >
                      <i className="material-icons md-18">timer</i>
                      {Utils.dateFormat(createdAt?.toDate())}
                    </span>
                  </div>

                  <div>
                    <i
                      className="material-icons text-warning"
                      role="button"
                      onClick={() => setCurrentId(id)}
                    >
                      create
                    </i>
                    <i
                      className="material-icons text-danger"
                      role="button"
                      onClick={() => deleteLink(id)}
                    >
                      close
                    </i>
                  </div>
                </div>
                <div className="card-body">
                  <AnchorLink href={url} type={"outline-primary"}>
                    Go to link
                  </AnchorLink>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Links;

const AnchorLink = ({ href, children, type = "primary" }) => (
  <a
    className={`btn btn-sm btn-${type}`}
    href={href}
    target="_blank"
    role="button"
    rel="noopener noreferrer"
  >
    {children}
  </a>
);
