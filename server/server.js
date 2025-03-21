const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const loanRoutes = require('./routes/loanRoutes');

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/loans', loanRoutes);

app.listen(process.env.PORT || 5000, () => console.log("Server running on port 5000"));
