const router = require('express').Router();
const upload = require('../utils/multer');

const fs = require('fs').promises;
const path = require('path');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

router.get('/show', async(req, res) => {
    try {
        const data = await prisma.blog.findMany()
        res.status(200).send({ status: 'OK', data })
    } catch (error) {
        res.status(500).send({ status: 'NOT OK', Error: 'Internal server error.' })
    }
})

router.get('/show/:id', async(req, res) => {
    const id = req.params.id;
    try {
        const filePath = path.join(__dirname, '../files', id);
        res.status(200).sendFile(filePath)
    } catch (error) {
        res.status(500).send('Internam server error.')
    }
})

router.post('/upload', upload.single('image'), async(req, res)=> {
    console.log(req.body);
    try {
        const { title, description } = req.body;
        const img = await fs.readFile(req.file.path)
        const encodeImg = img.toString('base64')
        await prisma.blog.create({
            data: {
                title,
                description,
                image: encodeImg
            }
        })
        res.status(201).send({ msg: 'File uploaded.' })
    } catch (error) {
        res.status(500).send(error.message)
    }
})

    
module.exports = router;