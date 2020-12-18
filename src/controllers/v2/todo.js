const knex = require('../../config/db.knex');


/**
 * Add user 
 * @method POST
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
 */
const addTodo = async (req, res) => {
    try {
        const { title, content, userId } = req.body;

        const result = await knex('todos').insert({ title, content, user_id: userId, created_at: new Date() });

        return res.status(200).send({ message: "add todo success", data: result });
    } catch (error) {
        return res.status(400).send({ mesage: 'add todo failed', error: error });
    }
}

/**
 * Get user
 * @method GET
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
 */
const getTodo = async (req, res) => {
    try {
        const { todoId } = req.params;

        let query = "", todos;

        if (todoId !== undefined) {
            todos = await knex('todos').select('*').where({ id: todoId }).whereNull('deleted_at');
        } else {
            todos = await knex('todos').select('*').whereNull('deleted_at');
        }

        return res.status(200).send({ message: "get todos success", data: todos })
    } catch (error) {
        return res.status(400).send({ message: "get todos failed", data: error })
    }
}

/**
 * Update user
 * @method PATCH
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
 */
const updateTodo = async (req, res) => {
    try {
        const { todoId } = req.params;
        const { content } = req.body;

        const result = await knex('todos')
            .where('id', '=', todoId)
            .update({ content });

        res.status(200).send({ message: "update todo success", data: result })
    } catch (error) {
        res.status(400).send({ message: "update todo failed", error: error })
    }
}

/**
 * Delete user
 * @method DELETE
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
 */
const deleteTodo = async (req, res) => {
    try {
        const { todoId } = req.params;

        const result = await knex('todos')
            .where('id', '=', todoId)
            .update({ deleted_at: new Date() });

        res.status(200).send({ message: "delete todo success", data: result })
    } catch (error) {
        res.status(400).send({ message: "delete todo failed", error: error })
    }
}

module.exports = {
    addTodo, getTodo, updateTodo, deleteTodo
}