const router = require('express').Router();
const upload = require('../utils/multer');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const cloudinary = require('../utils/cloudinary')

const fs = require('fs');
const path = require('path');

router.get('/show', async(req, res) => {
    try {
        const data = await prisma.blog.findMany()
        res.status(200).send({ data })
    } catch (error) {
        res.status(500).send('Internam server error.')
    }
})

router.post('/upload', upload.single('image'), async(req, res)=> {
    const { title, description } = req.body;
    const image = req.file;
    try {
        await prisma.blog.create({
            data: {
                title,
                description,
                imageID: image.filename,
                imageURL: image.path
            }
        })
        res.status(201).send({ msg: 'File uploaded.' })
    } catch (error) {
        res.status(400).send(error.message)
    }
})


router.delete('/delete/:id', async(req, res) => {
    const { id } = req.params;
    try {
        const blog = await prisma.blog.delete({
            where: { id }
        })
        const imageDeleted = await cloudinary.uploader.destroy(blog.imageID)
        if(imageDeleted !== 'ok'){
            return { msg: 'Image not found.' }
        }
        res.status(201).send({ msg: 'File deleted.'})
    } catch (error) {
        res.status(400).send({ Error: error.message })
    }
})
    
module.exports = router;