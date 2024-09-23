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
  const [transactions, setTransactions] = useState([]);
  const [transactionTotal, setTransactionTotal] = useState({
    balance: 0.0,
    income: 0.0,
    expense: 0.0,
  });
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
        let totalIncome = 0;
        let totalExense = 0;
        snapShot.forEach((doc) => {
          const data = doc.data();
          const id = doc.id;
          docs?.push({ ...data, id });
          if (data.transactionType === "expense") {
            totalExense += Number(data.transactionAmount);
          } else {
            totalIncome += Number(data.transactionAmount);
          }

        });
        setTransactions(docs);

        let balance = totalIncome - totalExense
        setTransactionTotal({
          balance, 
          income: totalIncome,
          expense: totalExense
        })
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getTransaction();
  }, []);

  return { transactions, transactionTotal };
};
