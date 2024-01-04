const model = require('../models/models');

const hangmanControllers = {

    get: async (req, res) => {
        try {
            const response = await model.getAll()
            const getOne = response.recordset[Math.floor(Math.random() * response.recordset.length)]

            if (response) {
                res.send(getOne).status(200)
            }
        } catch (err) {
            console.error(err)
        }
    },

    getAll: async (req, res) => {
        try {
            const response = await model.getAll()

            if (response) {
                res.send(response.recordset).status(200)
            }
        } catch (err) {
            console.error(err)
        }
    },

    add: async (req, res) => {
        try {
            const { word } = req.body;
            const response = await model.add(word)

            if (response) {
                res.send('Ajout effectué').status(200)
            }
        } catch (err) {
            console.error(err)
        }
    },

    delete: async (req, res) => {
        try {
            const { id } = req.params;
            const response = await model.delete(id)

            if (response) {
                res.send('Suppression effectuée').status(200)
            }
        } catch (err) {
            console.error(err)
        }
    }
}

module.exports = hangmanControllers;
