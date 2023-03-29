const pool = require('../configs/db')

const getUser = (id) => {
    return pool.query(`SELECT * FROM users WHERE id <> '${id}'`);
}

const getEmailUser = (email) =>{
    return pool.query(`SELECT * FROM users WHERE email='${email}'`)
}

const getIdUser = (id) => {
    return pool.query(`SELECT * FROM users WHERE id='${id}'`);
}

const registerUser = (data) => {
    const { id, username, email, password } = data;
    return pool.query(`INSERT INTO users(id,username,email,password)VALUES('${id}','${username}','${email}','${password}')`);
}

const updateProfile = (data) => {
    const { id, photo } = data;
    return pool.query(`UPDATE users SET photo='${photo}' WHERE id='${id}'`);
}

const deleteUser = (id) => {
    return pool.query(`DELETE FROM users WHERE id='${id}'`);
}

module.exports = {
    getUser,
    getEmailUser,
    getIdUser,
    registerUser,
    updateProfile,
    deleteUser
}