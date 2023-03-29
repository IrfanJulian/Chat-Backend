const pool = require('../configs/db')

const insert = (data) => {
    const { sender, reciever, message } = data
    return pool.query(`INSERT INTO chat(sender, reciever, message)VALUES('${sender}', '${reciever}', '${message}')`)
}

const selectId = (reciever, sender) => {
    return pool.query(`SELECT * FROM chat WHERE (reciever = '${reciever}' AND sender = '${sender}' OR reciever = '${sender}' AND sender = '${reciever}') ORDER BY date ASC`)
}

module.exports = {
    insert,
    selectId
}
