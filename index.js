const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const connectDB = require('./config/connectdb');
const userRoutes = require('./routes/userRoutes');

const app = express();

//env config
dotenv.config();

//connect database
connectDB();

//middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

//routes
app.use('/api/v1/user', userRoutes);

//port

const PORT = process.env.PORT;

//listen
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
})