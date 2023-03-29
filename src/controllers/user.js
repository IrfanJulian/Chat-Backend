/* eslint-disable no-undef */
const userModel = require('../models/user');
require('dotenv').config();
const { response } = require('../helpers/common');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcryptjs');
const { generateToken, generateRefreshToken } = require('../helpers/auth');
const cloudinary = require('cloudinary').v2;

cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.API_KEY, 
    api_secret: process.env.API_SECRET 
  });



const getAllUser = async (req,res) => {
    try {
        const idUser = req.decoded.id
        const {rows} = await userModel.getUser(idUser);
        response(res, rows, 'sucess', 200, 'Get data user sucess');
    } catch (error) {
        console.log(error);
        response(res, null, 'failed', 404, 'Server not found');
    }
}

const register = async (req, res) => {
    const { username, email, password  } = req.body;
    console.log(req.body);
    const salt = bcrypt.genSaltSync(10);
    const passwordHash = bcrypt.hashSync(password, salt);
    try {
        const filterEmail = await userModel.getEmailUser(email);
        const dataUser = { id: uuidv4(), username, email, password: passwordHash };
        console.log('data user = ', dataUser);
        if(!filterEmail.rowCount){
            const {data} = await userModel.registerUser(dataUser);
            response(res, data, 'sucess', 200, 'Register sucess');
        }else{
            res.json({message: 'Email is already taken, use another email.'});
        }
    } catch (error) {
        console.log(error);
        response(res, null, 'failed', 404, 'Server not found');
    }
}

const loginUser = async (req, res) => {
    const { email, password } = req.body;
    const { rows: [dataUser] } = await userModel.getEmailUser(email);
    if(!dataUser){
        return res.send({message: `Wrong email or password`});
    }

    const validationPassword = bcrypt.compareSync(password, dataUser.password);

    if(!validationPassword){
        return res.send({message: `Wrong email or password`});
    }

    let payload = {
        id: dataUser.id,
        email: dataUser.email,
        password: dataUser.password
    }

    dataUser.token = generateToken(payload)
    dataUser.refreshToken= generateRefreshToken(payload)
    response(res, dataUser, 'success', 200, 'login success')
}

const getProfile = async (req, res) => {
    const id = req.params.id;
    try {
        const {rows} = await userModel.getIdUser(id);
        response(res, rows, 'sucess', 200, 'Get Profile User Sucess');
    } catch (error) {
        console.log(error);
        res.json({message: 'Get Profile User Failed'});
    }
}

const updateProfile = async(req, res) => {
    const id = req.params.id;
    const photo = req.file;
    const image = await cloudinary.uploader.upload(photo.path, { folder: 'Telegram/Users' });
    const dataUser = { id, photo: image.secure_url };
    try {
        const {data} = await userModel.updateProfile(dataUser);
        response(res, data, 'sucess', 200, 'Update data user sucess');
    } catch (error) {
        console.log(error);
        response(res, null, 'failed', 404, 'Server not found')
    }
}

const deleteUserProfile = async (req, res) => {
    const id = req.params.id;
    try {
        await userModel.deleteUser(id);
        response(res, null, 'sucess', 200, 'Delete data sucess');
    } catch (error) {
        console.log(error);
        res.send({message: `Delete data user failed`});
    }
}

module.exports = {
    getAllUser,
    getProfile,
    register,
    loginUser,
    updateProfile,
    deleteUserProfile
}