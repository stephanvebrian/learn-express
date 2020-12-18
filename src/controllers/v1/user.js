const pool = require('../../config/db');

// jsdoc

/**
 * Add user controller
 * 
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
 */
const addUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const conn = await pool.getConnection();

        let query = `INSERT INTO users (email, password) VALUES (?, ?)`;
        const [result] = await conn.execute(query, [email, password]);
        await conn.release();
        res.send({ message: "POST user", data: result })
    } catch (error) {
        // await pool.release();
        res.send({ mesage: 'POST user FAILED', error: error })
    }
}

/**
 * 
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
 */
const getUser = async (req, res) => {
    const { userId } = req.params;

    const conn = await pool.getConnection();
    let query = "", users;

    if (userId !== undefined) {
        query = `SELECT * FROM users WHERE id = ? AND deleted_at IS NULL`;
        [users] = await conn.execute(query, [userId]);
    } else {
        query = "SELECT * FROM users WHERE deleted_at IS NULL";
        [users] = await conn.execute(query);
    }

    await conn.release();
    return res.send({ message: "GET all user", data: users })
}

/**
 * 
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
 */
const updateUser = async (req, res) => {
    const conn = await pool.getConnection();
    try {
        const { userId } = req.params;
        const { password } = req.body;


        const query = `UPDATE users SET password = ? WHERE id = ?`;
        const [result] = await conn.execute(query, [ password, userId ]);

        await conn.release();
        res.send({ message: "UPDATE user", data: result })
    } catch (error) {
        await conn.release();
        res.send({ message: "UPDATE user failed", error: error })
    }
}

/**
 * 
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
 */
const deleteUser = async (req, res) => {
    const conn = await pool.getConnection();
    try {
        const { userId } = req.params;

        // const query = `DELETE users WHERE id = ?`;
        const query = `UPDATE users SET deleted_at = ? WHERE id = ?`;
        const [result] = await conn.execute(query, [ new Date(), userId ]);

        await conn.release();
        res.send({ message: "DELETE user", data: result })
    } catch (error) {
        await conn.release();
        res.send({ message: "DELETE user failed", error: error })
    }
}

module.exports = {
    addUser, getUser, updateUser, deleteUser
}