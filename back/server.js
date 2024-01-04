const cors = require('cors');
const express = require('express');
const router = require('./routers/router');

const app = express();
app.use(cors());
const PORT = 8001;

app.use(express.json());

app.use(router);

app.listen(PORT,() => {
    console.log('Server is running on port :', PORT)
})
