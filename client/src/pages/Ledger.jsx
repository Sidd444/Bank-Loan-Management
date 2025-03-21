import { useState, useEffect } from 'react';
import axios from 'axios';

const Ledger = ({ loan_id }) => {
  const [ledgerData, setLedgerData] = useState(null);

  useEffect(() => {
    const fetchLedgerData = async () => {
      const { data } = await axios.get(`http://localhost:5000/api/loans/ledger/${loan_id}`);
      setLedgerData(data);
    };
    fetchLedgerData();
  }, [loan_id]);

  if (!ledgerData) return <div>Loading...</div>;

  return (
    <div>
      <h2>Ledger for Loan ID: {loan_id}</h2>
      <p>Balance: {ledgerData.balance}</p>
      <p>EMI: {ledgerData.emi}</p>
      <p>EMI Left: {ledgerData.emi_left}</p>
      <h3>Transactions:</h3>
      <ul>
        {ledgerData.transactions.map((transaction) => (
          <li key={transaction._id}>{transaction.amount} - {transaction.type} - {new Date(transaction.date).toLocaleDateString()}</li>
        ))}
      </ul>
    </div>
  );
};

export default Ledger;
