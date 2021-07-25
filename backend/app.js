const express = require('express')
const dotenv = require('dotenv');
const cors = require('cors');

const morgan = require('morgan');


// Configuration
const app = express();
dotenv.config();
// app.use(express.json())
app.use(cors());
app.use(morgan('dev'));


// Environment Variables
const port = process.env.PORT || 5000;

app.get('/', (req, res, next) => {
  res.json('Hello!')
})


app.listen(port, () => {
  console.log(`Server is running on ${port} port.`)
})