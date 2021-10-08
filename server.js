const express = require('express');

const PORT = process.env.PORT || '3000';

const userRouter = require('./routes/user');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use('/user', userRouter);

app.get('/', (req, res, next) => {
  res.status(200).json({name: 'Universe', value: 42});
});

app.listen(PORT, () => {
  console.log(`Listening for requests on port: ${PORT}`);
});
