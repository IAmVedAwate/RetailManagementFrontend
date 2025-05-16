// BillContext.js
import React, { createContext, useState, useEffect } from 'react';
import { handleGetSubmit } from '../services/Services';

export const BillContext = createContext();

export function BillProvider({ children }) {
  const [bills, setBills] = useState([]);

  // Get role from localStorage
  

  const fetchBillsAgain = async (role) => {
    if (role === "store") {
      const response = await handleGetSubmit(`api/Bill`, "Bill");
      setBills(response.data.result);
    }
  };

  useEffect(() => {
    const role = localStorage.getItem('role');
    fetchBillsAgain(role);
    // eslint-disable-next-line
  }, []);

  return (
    <BillContext.Provider value={{ bills, fetchBillsAgain }}>
      {children}
    </BillContext.Provider>
  );
}
