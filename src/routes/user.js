const express = require('express');
const router = express.Router();
const { protect } = require('../middlewares/auth')
const upload = require('../middlewares/upload')
const { getAllUser, getProfile, register, loginUser, updateProfile, deleteUserProfile } = require('../controllers/user');

router.get('/', protect,  getAllUser);
router.post('/register', register);
router.get('/profile/:id', protect, getProfile);
router.post('/login', loginUser);
router.put('/update/:id', protect, upload.single('photo'), updateProfile);
router.delete('/:id', deleteUserProfile);

module.exports = router