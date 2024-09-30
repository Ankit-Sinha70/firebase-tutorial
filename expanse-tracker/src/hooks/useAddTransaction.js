import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useGetUserInfo } from "./useGetUserInfo";
import { db } from "../config/firebase";

const useAddTransaction = () => {
  const getTransactionRef = collection(db, "transactions");
  const { userId } = useGetUserInfo();
  const addTransaction = async ({
    description,
    transactionAmount,
    transactionType,
  }) => {
    await addDoc(getTransactionRef, {
      userId,
      description,
      transactionAmount,
      transactionType,
      createdAt: serverTimestamp(),
    });
  };
  return { addTransaction };
};

export default useAddTransaction;

