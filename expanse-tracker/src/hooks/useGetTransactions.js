import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../config/firebase";
import { useGetUserInfo } from "./useGetUserInfo";
export const useGetTransaction = () => {
  const [transactions, setTransactions] = useState("");
  const transactionCollectionRef = collection(db, "transactions");
  const { userId } = useGetUserInfo();

  const getTransaction = async () => {
    try {
      const queryCollection = query(
        transactionCollectionRef,
        where("userId", "==", userId),
        orderBy("createdAt")
      );
      onSnapshot(queryCollection, (snapShot) => {
        let docs = [];
        snapShot.forEach((doc) => {
          const data = doc.data();
          const id = doc.id;

          docs?.push({ ...data, id });
        });
        setTransactions(docs);
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getTransaction();
  }, []);

  return { transactions };
};
