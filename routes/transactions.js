const express = require('express')
const router = express.Router()
const { error_missing_fields, error_invalid_fields, error_data_not_found, success_row_delete, error_row_delete, success_row_update,
    error_row_update, error_row_create, success_row_create, success_data_exits } = require('../lib/ResponseMessages')
const ResponseModel = require('../lib/ResponseModel')
const db = require('../config/database');

const OrderLine = require('../models/OrderLine')
const Order = require('../models/Order')
const Cart = require('../models/Cart')

const { Op } = require("sequelize");
const AnimalProduct = require('../models/AnimalProduct')
const EggsBatchProduct = require('../models/EggsBatchProduct')
const jwt = require("jsonwebtoken");
// const EggsBatch = require('../models/EggsBatch');
// const EggsBatchLine = require('../models/EggsBatchLine');

const handleProductsQuantity = async (quantity, data) => {
    let i = quantity
    let j = 0
    let dataReturn = []

    while (i > 0) {
        if (i <= data[j].quantityAvailable) {
            dataReturn.push({ id: data[j].id, quantity: i })
            return dataReturn;
        } else {
            dataReturn.push({ id: data[j].id, quantity: data[j].quantityAvailable })
            i -= data[j].quantityAvailable
        }
        j++
    }
}


router.post('/createOrderOrderLines', async (req, res) => {
    const response = new ResponseModel()
    try {
        const { address, locale, zipcode, observation, fiscalNumber, OrderLines } = req.body

        const { token } = req.session

        if (!token && !process.env.DEV_MODE) {
            response.message = error_missing_fields
            response.error = error_missing_fields
            return res.status(400).json(response)
        }

        let tokenDecoded = jwt.verify(token || process.env.DEV_MODE_TOKEN, process.env.TOKEN_SECRET)

        const data = {
            UserId: tokenDecoded.id,
            address: address,
            locale: locale,
            zipcode: zipcode,
            observation: observation,
            fiscalNumber: fiscalNumber
        }

        let total, totalVAT, order

        await db.transaction(async (t) => {

            order = await Order.create(data, { transaction: t })

            let dataLines
            let all, allObject

            for (const element of OrderLines) {
                allObject = []
                if (element.Product.type === "EGGS") {
                    all = await EggsBatchProduct.findAll({ where: { ProductId: element.ProductId, quantityAvailable: { [Op.gt]: 0 } } })
                } else {
                    all = await AnimalProduct.findAll({ where: { ProductId: element.ProductId, quantityAvailable: { [Op.gt]: 0 } } })
                }

                for (const element of all) {
                    allObject.push(element.dataValues)
                }

                const rows = await handleProductsQuantity(element.quantity, allObject)

                total = element.quantity * element.Product.price
                totalVAT = element.quantity * element.Product.price * (element.Product.tax / 100)

                for (const row of rows) {
                    dataLines = {
                        OrderId: order.dataValues.id,
                        quantity: row.quantity,
                        total: (element.quantity * element.Product.price),
                        totalVAT: (element.quantity * element.Product.price * (element.Product.tax / 100)),
                        AnimalProductId: element.Product.type === "EGGS" ? undefined : row.id,
                        EggsBatchProductId: element.Product.type === "EGGS" ? row.id : undefined,
                    }
                    await OrderLine.create(dataLines, { transaction: t })

                    if (element.Product.type === "EGGS") {
                        //FIXME porque não tem o {transaction: t} ? falta eliminar do EggsBatch

                        await EggsBatchProduct.decrement({ quantityAvailable: row.quantity }, { where: { id: row.id } })
                    } else {
                        await AnimalProduct.decrement({ quantityAvailable: row.quantity }, { where: { id: row.id } })
                    }

                }
                await Cart.destroy({ where: { UserId: tokenDecoded.id, ProductId: element.ProductId } }, { transaction: t })
            }
        });
        const orderUpdated = await Order.update({ total: total, totalVAT: totalVAT },
            { where: { UserId: tokenDecoded.id, id: order.id }, returning: true })

        response.message = success_row_create
        response.data = orderUpdated[1]
        return res.status(200).json(response)
    } catch (error) {
        response.message = error_data_not_found
        response.error = error
        return res.status(400).json(response)
    }
})

// router.post('/createEggsBatchEggsBatchLines', async (req, res) => {
//     const response = new ResponseModel()
//     try {
//         const { name, ExplorationId, EggsBatchLines } = req.body
//         const { token } = req.session

//         let eggsBatchs
//         await db.transaction(async (t) => {
//             eggsBatchs = await EggsBatch.create({ name: name, ExplorationId: ExplorationId, validity: new Date() }, { transaction: t })

//             for (const i of EggsBatchLines) {
//                 await EggsBatchLine.create(
//                     {
//                         EggsBatchId: eggsBatchs.dataValues.id,
//                         quantity: i.quantity
//                     },
//                     { transaction: t })
//             }
//         })

//         response.message = success_row_create
//         response.data = eggsBatchs
//         return res.status(201).json(response)
//     } catch (error) {
//         response.message = error_data_not_found
//         response.error = error
//         return res.status(400).json(response)
//     }
// })

module.exports = router