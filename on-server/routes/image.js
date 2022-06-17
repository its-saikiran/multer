const router = require('express').Router();
const upload = require('../utils/multer');

const fs = require('fs');
const path = require('path');

router.get('/show/:id', (req, res) => {
    const id = req.params.id;
    try {
        const filePath = path.join(__dirname, '../files', id);
        res.status(200).sendFile(filePath)
    } catch (error) {
        res.status(500).send('Internam server error.')
    }
})

router.post('/upload', upload.single('image'), (req, res)=> {
    try {
        const file = req.file;
        res.status(201).send({ msg: 'File uploaded.', data: file })
    } catch (error) {
        res.status(400).send(error.message)
    }
})

    
module.exports = router;