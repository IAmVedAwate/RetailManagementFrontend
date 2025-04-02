// BillContext.js
import React, { createContext, useState, useEffect } from 'react';
import { handleGetSubmit } from '../services/Services';

export const BillContext = createContext();

export function BillProvider({ children }) {
  const [bills, setBills] = useState([]);

  const fetchBillsAgain = async () => {
    const response = await handleGetSubmit(`api/Bill`, "Bill");
    setBills(response.data.result);
  };

  useEffect(() => {
    fetchBillsAgain();
  }, []);

  return (
    <BillContext.Provider value={{ bills, fetchBillsAgain }}>
      {children}
    </BillContext.Provider>
  );
}
