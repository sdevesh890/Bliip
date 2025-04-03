require('dotenv').config();
const express = require('express');
const connectDB = require('./src/config/db');
const authRouter = require('./src/routes/auth');

const app = express();

const port = process.env.PORT || 3000;


app.use(express.json());
//Connect to DB
connectDB();
app.use('/api/auth',authRouter);

app.get('/',(req,res)=>
{
    res.send('Welcome to the Bliip');
});

app.listen(port,()=>
{
    console.log('Server is running on port no',port);
});