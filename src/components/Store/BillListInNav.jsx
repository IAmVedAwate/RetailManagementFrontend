// BillListInNav.jsx
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { BillContext } from '../../context/BillContext';

function BillListInNav() {
  const { bills } = useContext(BillContext);

  return (
    <li className="nav-item dropdown">
      <div className="nav-link text-dark dropdown-toggle" data-bs-toggle="dropdown">
        Your Bills
      </div>
      <ul className="dropdown-menu">
        {bills.length > 0 ? (
          bills.map((bill, i) => (
            <div key={`bill${i}`}>
              <Link to={`/bill/confirm/${bill.indexForBill}`} className="nav-link text-dark">
                {bill.billName}
              </Link>
              <hr className="dropdown-divider" />
            </div>
          ))
        ) : (
          <div>
            <small className="px-4">No Bills Available</small>
          </div>
        )}
      </ul>
    </li>
  );
}

export default BillListInNav;
