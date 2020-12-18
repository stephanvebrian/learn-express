/**
 * Todo Route
 * ...
 */
//
const express = require('express');
const router = express.Router();

const { addTodo, getTodo, updateTodo, deleteTodo } = require('../../controllers/v2/todo');

router
    .route('/')
        .get(getTodo)     
        .post(addTodo);

router
    .route('/:todoId')
        .get(getTodo)   
        .patch(updateTodo)   
        .delete(deleteTodo);

module.exports = router;