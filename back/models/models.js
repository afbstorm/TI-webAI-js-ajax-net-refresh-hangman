const {v4: uuidv4 } = require('uuid');
const sql = require("mssql");
const sqlConfig = require('../db/db')

const hangmanModels = {

    getAll: async () => {
            try {
                await sql.connect(sqlConfig)
                const result = await sql.query `SELECT * FROM words`
                if (result) {
                    return result;
                }
            } catch (err) {
                console.error(err)
            }
    },

    add: async (word) => {
        try {
            const id = uuidv4();
            await sql.connect(sqlConfig)
            const result = await sql.query `INSERT INTO words VALUES (${id}, ${word})`
            if (result) {
                return result;
            }
        } catch (err) {
            console.error(err)
        }
    },

    delete: async (id) => {
        try {
            await sql.connect(sqlConfig)
            const result = await sql.query `DELETE FROM words WHERE id = ${id}`
            if (result) {
                return result;
            }
        } catch (err) {
            console.error(err)
        }
    }
}

module.exports = hangmanModels;
