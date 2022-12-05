import { firebase } from "./firebaseConfig";
import { commonAttrs } from "../util/entities";
import {
  getFirestore,
  collection,
  onSnapshot,
  addDoc,
  getDoc,
  deleteDoc,
  doc,
  query,
  where,
  orderBy,
  serverTimestamp,
  updateDoc,
  getDocs,
} from "firebase/firestore";

const db = getFirestore(firebase);

export const createFSElement = (type, element, onSuccess) => {
  const colRef = collection(db, type);

  element["type"] = type;

  addDoc(colRef, element)
    .then(() => {
      console.log("New element added to " + type);
      onSuccess();
    })
    .catch((error) => {
      alert(error.message);
    });
};

export const getFSCollection = (type, onSuccess) => {
  const colRef = collection(db, type);

  getDocs(colRef)
    .then((snapshot) => {
      let elements = [];
      snapshot.docs.forEach((element) => {
        elements.push({ ...element.data(), id: element.id });
      });
      console.log("Traidos todos los elementos de la coleccion: " + type);
      onSuccess(elements);
    })
    .catch((error) => {
      alert(error.message);
    });
};

export const deleteFSElement = (type, id, onSuccess) => {
  const docRef = doc(db, type, id);

  deleteDoc(docRef).then(() => {
    console.log("Eliminado el elemento de tipo " + type + " y id: " + id);
    onSuccess();
  });
};

export const updateFSElement = (type, id, element, onSuccess) => {
  const docRef = doc(db, type, id);

  updateDoc(docRef, element)
    .then(() => {
      console.log("Actualizado el elemento de tipo " + type + " y id: " + id);
      onSuccess();
    })
    .catch((error) => {
      alert(error.message);
    });
};

export const queryFSElements = async (type, Xclause) => {
  //https://firebase.google.com/docs/firestore/query-data/queries en edge

  const colRef = collection(db, type);

  let clauses = [];
  let elements = [];

  Xclause.forEach((item) => {
    clauses.push(where(item.parameter, item.operator, item.value));
  });

  const q = query(colRef, ...clauses);

  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    elements.push({ ...doc.data(), id: doc.id });
  });

  return elements;
};

export const getFSElementById = async (type, id) => {
  const docRef = doc(db, type, id);
  const result = await getDoc(docRef);

  return result.data();
};

export const getFSCollectionAsync = async (type) => {
  let elements = [];
  const colRef = collection(db, type);

  const snapshot = await getDocs(colRef);

  snapshot.docs.forEach((element) => {
    elements.push({ ...element.data(), id: element.id });
  });

  return elements;
};

export const createFSElementAsync = async (element) => {
  const colRef = collection(db, element[commonAttrs.type]);
  const result = await addDoc(colRef, element);
  console.log("New element added to " + element[commonAttrs.type]);
  return result;
};
