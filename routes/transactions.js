const express = require('express')
const router = express.Router()
const { error_missing_fields, error_invalid_fields, error_data_not_found, success_row_delete, error_row_delete, success_row_update,
    error_row_update, error_row_create, success_row_create, success_data_exits } = require('../lib/ResponseMessages')
const ResponseModel = require('../lib/ResponseModel')
const db = require('../config/database');

const OrderLine = require('../models/OrderLine')
const Order = require('../models/Order')
const Cart = require('../models/Cart')

router.post('/createOrderOrderLines', async (req, res) => {
    const response = new ResponseModel()
    try {
        const { UserId, address, locale, zipcode, observation, fiscalNumber, OrderLines } = req.body

        if (!(UserId && OrderLines.length > 0)) {
            response.message = error_missing_fields
            response.error = error_missing_fields
            return res.status(400).json(response)
        }

        const data = {
            UserId: UserId,
            address: address,
            locale: locale,
            zipcode: zipcode,
            observation: observation,
            fiscalNumber: fiscalNumber
        }

        const result = await db.transaction(async (t) => {

            const order = await Order.create(data, { transaction: t })

            let dataLines, total, totalVAT

            for (const element of OrderLines) {
                element.AnimalProduct ? (
                    (element.AnimalProduct.Product.unit === "KG") ?
                        (total = element.quantity *
                            (element.AnimalProduct.Product.price * element.AnimalProduct.weight) / 1000)
                        :
                        (total = element.quantity * element.AnimalProduct.Product.price)
                ) : (
                    total = element.quantity * element.EggsBatchProduct.Product.price /
                    (element.EggsBatchProduct.Product.unit === 'DOZEN' ? 12 : 6)
                )

                element.AnimalProduct ?
                    (totalVAT = total * element.AnimalProduct.Product.tax / 100) :
                    (totalVAT = total * element.EggsBatchProduct.Product.tax / 100)

                dataLines = {
                    OrderId: order.dataValues.id,
                    quantity: element.quantity,
                    total: total,
                    totalVAT: totalVAT,
                    AnimalProductId: element.AnimalProductId !== null ? element.AnimalProductId : undefined,
                    EggsBatchProductId: element.EggsBatchProductId !== null ? element.EggsBatchProductId : undefined,
                }

                const res = await OrderLine.create(dataLines, { transaction: t })
                console.log(res.dataValues.AnimalProductId !== null)
                if (res.dataValues.AnimalProductId !== null) {
                    await Cart.destroy({
                        where: {
                            UserId: UserId, AnimalProductId: res.dataValues.AnimalProductId
                        }
                    }, { transaction: t })
                } else {
                    await Cart.destroy({
                        where: {
                            UserId: UserId, EggsBatchProductId: res.dataValues.EggsBatchProductId
                        }
                    }, { transaction: t })
                }
            }

            response.message = success_row_create
            response.data = order
            return res.status(200).json(response)

        });
    } catch (error) {
        response.message = error_data_not_found
        response.error = error
        return res.status(400).json(response)
    }
})

module.exports = router