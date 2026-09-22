import { useCallback, useEffect, useState } from "react";
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../services/firebase";

/**
 * Hook generik untuk satu collection Firestore, dipakai oleh semua modul
 * (checklist, gold, vendor, items, savings, expenses).
 *
 * Contoh: const { items, loading, add, update, remove } = useFirestore("checklist");
 */
export function useFirestore(collectionName, { orderByField = "createdAt", direction = "desc" } = {}) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    const q = query(collection(db, collectionName), orderBy(orderByField, direction));

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        setItems(snapshot.docs.map((docSnap) => ({ id: docSnap.id, ...docSnap.data() })));
        setLoading(false);
        setError(null);
      },
      (err) => {
        setError(err.message);
        setLoading(false);
      }
    );

    return unsubscribe;
  }, [collectionName, orderByField, direction]);

  const add = useCallback(
    (data) =>
      addDoc(collection(db, collectionName), {
        ...data,
        createdAt: serverTimestamp(),
      }),
    [collectionName]
  );

  const update = useCallback(
    (id, data) => updateDoc(doc(db, collectionName, id), data),
    [collectionName]
  );

  const remove = useCallback((id) => deleteDoc(doc(db, collectionName, id)), [collectionName]);

  return { items, loading, error, add, update, remove };
}
