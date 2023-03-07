const db = require('./db.json')
let globalId = 4

module.exports = {
    getHouses: (req, res) => {
        res.status(200).send(db)
    },
    deleteHouse: (req, res) => {
        const { id } = req.params
        const index = db.findIndex(house => house.id === +id)
        if (index >= 0) {
            db.splice(index, 1)
            res.status(200).send(db)
        } else {
            res.status(400).send('cant delete')
        }
    },
    createHouse: (req, res) => {
        const { address, price, imageURL } = req.body
        if (!address || !price || !imageURL) {
            res.sendStatus(400)
        }
        const newHouse = { ...req.body, id: globalId }
        db.push(newHouse)
        globalId++
        res.status(200).send(db)
    },
    updateHouse: (req, res) => {
        const { id } = req.params
        const { type } = req.body
        const index = db.findIndex(house => +house.id == +id)
        if (type === 'plus') {
            db[index].price = db[index].price + 10000
            res.status(200).send(db)
        } else if (type === 'minus') {
            db[index].price = db[index].price - 10000
            res.status(200).send(db)
        } else {
            res.sendStatus(400)
        }
    }
}