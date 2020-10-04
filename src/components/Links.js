import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { db } from "../services/firebase";
import LinkForm from "./LinkForm";

function Links() {
  const [links, setLinks] = useState([]);
  const [currentId, setCurrentId] = useState(0);

  const addOrEdit = async (alldata) => {
    try {
      if (currentId) {
        await db.collection("my-links").doc(currentId).update(alldata);
        setCurrentId("");
        toast("Link updated!", { type: "success" });
      } else {
        await db.collection("my-links").doc().set(alldata);
        toast("New link added!", { type: "success" });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const deleteLink = async (linkId) => {
    if (window.confirm("Are you sure to delete this link?")) {
      await db.collection("my-links").doc(linkId).delete();
      toast("Link removed successfully!", { type: "error" });
    }
  };

  const getLinks = async () => {
    await db.collection("my-links").onSnapshot((querySnapshot) => {
      const docs = [];
      querySnapshot.forEach((doc) => {
        docs.push({ ...doc.data(), id: doc.id });
      });
      setLinks(docs);
    });

    console.log("Get Links!");
  };

  useEffect(() => {
    getLinks();
  }, []);

  return (
    <>
      <LinkForm {...{ addOrEdit, links, currentId }} />
      <div className="col-md-8">
        <div className="row">
          {links.map(({ url, website, description, id }) => (
            <div key={id} className="col-md-6">
              <div className="card mb-4">
                <div className="card-header d-flex justify-content-between">
                  <h5>{website}</h5>
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
                  <p>{description}</p>
                  <a
                    href={`https://${url}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Go to Website
                  </a>
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
