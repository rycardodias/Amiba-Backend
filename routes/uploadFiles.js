const express = require('express')
const router = express.Router()
const util = require('util')
const path = require('path')
const fs = require('fs')
const resizeImg = require('resize-img');

const ResponseModel = require('../lib/ResponseModel')
const { v4 } = require('uuid')

router.get("/:folder/:file", async (req, res) => {
    try {
        const folder = req.params.folder + '/'
        const img = "../Projeto-Investigacao/public/uploads/" + folder + req.params.file
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
        const requiredSizes = JSON.parse(req.body.requiredSizes)
        const directory = req.body.directory
        const file = req.files.file
        const fileName = file.name
        const size = file.data.length
        const extension = path.extname(fileName)

        const allowedExtensions = /png|jpeg|jpg|gif/

        if (!allowedExtensions.test(extension)) throw "Unsupported extension!"
        if (size > 1024 * 1024 * 5) throw "File must be less than 5MB"

        const sizes = {
            '1:1': {
                width: 800,
                height: 800
            },
            '16:9': {
                width: 1920,
                height: 1080
            },
        }

        const fileNameSaved = v4() + extension

        const URL = "/uploads/" + directory + '/'
        const fileURL = URL + fileNameSaved

        util.promisify(file.mv)("../Projeto-Investigacao/public" + fileURL).then(async () => {
            try {

                requiredSizes.forEach(async (value) => {
                    if (sizes[value]) {
                        const imageResized = await resizeImg(fs.readFileSync('../Projeto-Investigacao/public/' + fileURL), sizes[value])

                        fs.writeFileSync("../Projeto-Investigacao/public" + URL + sizes[value].width + 'x' + sizes[value].height + '_' + fileNameSaved, imageResized);
                    }
                })

            } catch (error) {
                console.log(error)
            }
        },

        )
            .then(() => fs.unlinkSync("../Projeto-Investigacao/public" + fileURL))


        response.message = "file uploaded"
        response.data = { url: fileURL, fileName: fileNameSaved }

        res.status(200).json(response)
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: error })
    }
});

module.exports = router