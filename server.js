const path = require('path');

const express = require('express');
const {config} = require('dotenv');

config({path: path.join(__dirname, '.env')});

const PORT = process.env.PORT || '3000';

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));

const userRouter = require('./routes/user');
app.use('/user', userRouter);

app.get('/', (req, res, next) => {
  res.status(200).json({name: 'Universe', value: 42});
});

app.listen(PORT, () => {
  console.log(`Listening for requests on port: ${PORT}`);
});
