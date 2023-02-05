import * as firebase from "firebase";
import { db } from "./firebase";

const collection = db.collection("my-links");

export const getAll = (callback) => {
  collection.onSnapshot((querySnapshot) => {
    let docs = [];
    querySnapshot.forEach((doc) => {
      const docData = doc.data();
      docs.push({ ...docData, id: doc.id });
    });

    docs.sort((a, b) => a.createdAt.toDate() - b.createdAt.toDate());

    callback(docs); //
    console.log("[callback] => ", docs);
  });
};

export const getById = (id) => {
  return collection
    .doc(id)
    .get()
    .then((item) => item.data());
};

export const create = (value) => {
  const item = { ...value, createdAt: getNewDate() };
  console.log(item);
  return collection.doc().set(item);
};

export const updateById = (id, value) => {
  return collection.doc(id).update(value);
};

export const deleteById = (id) => {
  return collection.doc(id).delete();
};

const getNewDate = () => firebase.firestore.FieldValue.serverTimestamp();
