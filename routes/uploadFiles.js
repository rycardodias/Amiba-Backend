const express = require('express')
const router = express.Router()
const util = require('util')
const path = require('path')
const fs = require('fs')

const ResponseModel = require('../lib/ResponseModel')
const { uuid } = require('uuidv4')

router.get("/:file", async (req, res) => {
    try {
        let img = "../Projeto-Investigacao/public/uploads/" + req.params.file

        fs.access(img, fs.constants.F_OK, err => {
            return err
        })

        fs.readFile(img, function (err, content) {
            if (err) {
                // res.writeHead(200, { "Content-type": "text/html" })
                // res.end("No such image")
                res.status(404).json({ error: err })
            } else {
                res.writeHead(200, { "Content-type": "image/jpg" })
                res.end(content)
            }
        })
    } catch (error) {

    }
})

router.post("/create", async (req, res) => {
    const response = new ResponseModel()

    try {
        const file = req.files.file
        const fileName = file.name
        const size = file.data.length
        const extension = path.extname(fileName)

        const allowedExtensions = /png|jpeg|jpg|gif/

        if (!allowedExtensions.test(extension)) throw "Unsupported extension!"
        if (size > 1024 * 1024 * 5) throw "File must be less than 5MB"

        const md5 = file.md5

        const URL = "/uploads/" + md5 + uuid() + extension

        await util.promisify(file.mv)("../Projeto-Investigacao/public" + URL)

        response.message = "file uploaded"
        response.data = { url: URL }

        res.status(200).json(response)
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: error })
    }
});

module.exports = router