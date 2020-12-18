const knex = require('../../config/db.knex');

/**
 * Add user 
 * @method POST
 * @param {import('express').Request} request
 * @param {import('express').Response} response 
 */
const addUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const result = await knex('users').insert({ email, password, created_at: new Date() });

        return es.status(200).send({ message: "POST user", data: result })
    } catch (error) {
        return res.status(400).send({ mesage: 'POST user FAILED', error: error })
    }
}

/**
 * Get user
 * @method GET
 * @param {import('express').Request} request
 * @param {import('express').Response} response 
 */
const getUser = async (req, res) => {
    try {
        const { userId } = req.params;

        let query = "", users;

        if (userId !== undefined) {
            users = await knex('users').select('*').where({ id: userId }).whereNull('deleted_at');
        } else {
            users = await knex('users').select('*').whereNull('deleted_at');
        }

        return res.status(200).send({ message: "GET all user", data: users })
    } catch (error) {
        return res.status(400).send({ message: "GET all user", data: users })
    }
}

/**
 * Update user
 * @method PATCH
 * @param {import('express').Request} request
 * @param {import('express').Response} response 
 */
const updateUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const { password } = req.body;

        const result = await knex('users')
            .where('id', '=', userId)
            .update({ password });

        return res.status(200).send({ message: "UPDATE user", data: result })
    } catch (error) {
        return res.status(400).send({ message: "UPDATE user failed", error: error })
    }
}

/**
 * Delete user
 * @method DELETE
 * @param {import('express').Request} request
 * @param {import('express').Response} response 
 */
const deleteUser = async (req, res) => {
    try {
        const { userId } = req.params;

        const result = await knex('users')
            .where('id', '=', userId)
            .update({ deleted_at: new Date() });

        return res.status(200).send({ message: "DELETE user", data: result })
    } catch (error) {
        return res.status(400).send({ message: "DELETE user failed", error: error })
    }
}

module.exports = {
    addUser, getUser, updateUser, deleteUser
}