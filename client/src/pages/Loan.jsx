import { useState } from "react";
import axios from "axios";

const Loan = () => {
    const [formData, setFormData] = useState({ customer_id: "", principal: "", tenure: "", interest_rate: "" });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { data } = await axios.post("http://localhost:5000/api/loans/lend", formData);
        alert(`Loan Approved! Total Amount: ${data.total_amount}, EMI: ${data.emi}`);
    };

    return (
        <form onSubmit={handleSubmit} className="p-4">
            <input type="text" name="customer_id" placeholder="Customer ID" onChange={(e) => setFormData({ ...formData, customer_id: e.target.value })} />
            <button type="submit">Lend Loan</button>
        </form>
    );
};

export default Loan;
