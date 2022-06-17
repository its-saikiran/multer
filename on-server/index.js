const express = require('express');
const app = express();

require('dotenv').config();

const PORT = process.env.PORT || 7000;

app.use('/', require('./routes/image'))

app.use('/', (req, res)=> {
    res.status(404).send("Page not found.")
})

app.listen(PORT, ()=>console.log(`http:localhost:${PORT}`))