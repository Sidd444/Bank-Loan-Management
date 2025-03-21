import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import serverUrl from './serverUrl';

function App() {
  const [formData, setFormData] = useState({ customer_id: "", principal: "", tenure: "", interest_rate: "" });
  const [loanData, setLoanData] = useState(null);
  const [ledgerData, setLedgerData] = useState(null);
  const [accountOverviewData, setAccountOverviewData] = useState(null);
  const [paymentData, setPaymentData] = useState({ loan_id: "", amount: "", type: "EMI" });

  const handleLendLoan = async (e) => {
    e.preventDefault();
    const { data } = await axios.post(`${serverUrl}/api/loans/lend`, formData);
    setLoanData(data);
    alert(`Loan Approved! Total Amount: ${data.total_amount}, EMI: ${data.emi}`);
  };

  const fetchLedgerData = async (loan_id) => {
    const { data } = await axios.get(`${serverUrl}/api/loans/ledger/${loan_id}`);
    setLedgerData(data);
  };

  const fetchAccountOverviewData = async (customer_id) => {
    const { data } = await axios.get(`${serverUrl}/api/loans/account-overview/${customer_id}`);
    setAccountOverviewData(data);
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    const { data } = await axios.post(`${serverUrl}/api/loans/payments`, paymentData);
    alert(`Payment Successful! Amount Paid: ${data.amount_paid}, Balance: ${data.balance}`);
    fetchLedgerData(paymentData.loan_id);
  };

  useEffect(() => {
    if (formData.customer_id) {
      fetchAccountOverviewData(formData.customer_id);
    }
  }, [formData.customer_id]);

  return (
    <div className="App p-4">
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Lend Loan</h2>
        <form onSubmit={handleLendLoan} className="space-y-4">
          <input type="text" name="customer_id" placeholder="Customer ID" onChange={(e) => setFormData({ ...formData, customer_id: e.target.value })} className="border p-2 w-full" />
          <input type="number" name="principal" placeholder="Principal" onChange={(e) => setFormData({ ...formData, principal: e.target.value })} className="border p-2 w-full" />
          <input type="number" name="tenure" placeholder="Tenure (months)" onChange={(e) => setFormData({ ...formData, tenure: e.target.value })} className="border p-2 w-full" />
          <input type="number" name="interest_rate" placeholder="Interest Rate" onChange={(e) => setFormData({ ...formData, interest_rate: e.target.value })} className="border p-2 w-full" />
          <button type="submit" className="bg-blue-500 text-white p-2 rounded">Lend Loan</button>
        </form>
      </section>

      {loanData && (
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Loan Details</h2>
          <p>Total Amount: {loanData.total_amount}</p>
          <p>EMI: {loanData.emi}</p>
        </section>
      )}

      {ledgerData && (
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Ledger for Loan ID: {loanData._id}</h2>
          <p>Balance: {ledgerData.balance}</p>
          <p>EMI: {ledgerData.emi}</p>
          <p>EMI Left: {ledgerData.emi_left}</p>
          <h3 className="text-xl font-bold mt-4">Transactions:</h3>
          <ul className="list-disc pl-5">
            {ledgerData.transactions.map((transaction) => (
              <li key={transaction._id}>{transaction.amount} - {transaction.type} - {new Date(transaction.date).toLocaleDateString()}</li>
            ))}
          </ul>
        </section>
      )}

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Make Payment</h2>
        <form onSubmit={handlePayment} className="space-y-4">
          <input type="text" name="loan_id" placeholder="Loan ID" onChange={(e) => setPaymentData({ ...paymentData, loan_id: e.target.value })} className="border p-2 w-full" />
          <input type="number" name="amount" placeholder="Amount" onChange={(e) => setPaymentData({ ...paymentData, amount: e.target.value })} className="border p-2 w-full" />
          <select name="type" onChange={(e) => setPaymentData({ ...paymentData, type: e.target.value })} className="border p-2 w-full">
            <option value="EMI">EMI</option>
            <option value="LUMP_SUM">Lump Sum</option>
          </select>
          <button type="submit" className="bg-blue-500 text-white p-2 rounded">Make Payment</button>
        </form>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Account Overview</h2>
        <form onSubmit={(e) => { e.preventDefault(); fetchAccountOverviewData(formData.customer_id); }} className="space-y-4">
          <input type="text" name="customer_id" placeholder="Customer ID" onChange={(e) => setFormData({ ...formData, customer_id: e.target.value })} className="border p-2 w-full" />
          <button type="submit" className="bg-blue-500 text-white p-2 rounded">Fetch Account Overview</button>
        </form>
        {accountOverviewData && (
          <div className="mt-4">
            <ul className="list-disc pl-5">
              {accountOverviewData.map((loan) => (
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
        )}
      </section>
    </div>
  );
}

export default App;
