import { useState, useEffect } from 'react';
import axios from 'axios';

const AccountOverview = ({ customer_id }) => {
  const [loans, setLoans] = useState([]);

  useEffect(() => {
    const fetchLoans = async () => {
      const { data } = await axios.get(`http://localhost:5000/api/loans/account-overview/${customer_id}`);
      setLoans(data);
    };
    fetchLoans();
  }, [customer_id]);

  return (
    <div>
      <h2>Account Overview for Customer ID: {customer_id}</h2>
      <ul>
        {loans.map((loan) => (
          <li key={loan._id}>
            <p>Loan Amount: {loan.principal}</p>
            <p>Total Amount: {loan.total_amount}</p>
            <p>EMI: {loan.emi}</p>
            <p>Interest Rate: {loan.interest_rate}</p>
            <p>Amount Paid: {loan.amount_paid}</p>
            <p>EMI Left: {Math.ceil((loan.total_amount - loan.amount_paid) / loan.emi)}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AccountOverview;
