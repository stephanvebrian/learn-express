/**
 * User Route
 * ...
 */
//
const express = require('express');
const router = express.Router();

const { addUser, getUser, updateUser, deleteUser } = require('../../controllers/v2/user');

router
    .route('/')
        .get(getUser)     
        .post(addUser);

router
    .route('/:userId')
        .get(getUser)   
        .patch(updateUser)   
        .delete(deleteUser);

module.exports = router;