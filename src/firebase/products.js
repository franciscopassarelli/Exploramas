import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "./firebaseConfig";

// Colección: "products"

export const addProduct = async (product) => {
  const docRef = await addDoc(collection(db, "products"), product);
  return { ...product, id: docRef.id };
};

export const getAllProducts = async () => {
  const querySnapshot = await getDocs(collection(db, "products"));
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};


export const deleteProduct = async (id) => {
  await deleteDoc(doc(db, "products", id));
};

export const updateProduct = async (id, updatedData) => {
  await updateDoc(doc(db, "products", id), updatedData);
};
