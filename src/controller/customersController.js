import { db } from "../config/database.connection.js";

export async function listCustomers(req, res){
    try {
        const customers = await db.query(`SELECT * FROM customers`)
        res.send(customers.rows)
        
    } catch (error) {
        res.status(500).send(error)
    }
}

export async function listCustomersById(req, res){
    const {id} = req.params

    try {
        const findCustomer = await db.query(`SELECT * FROM customers WHERE id = $1;`, [id])
        if (findCustomer.rowCount === 0) return res.sendStatus(404)

        res.send(findCustomer.rows)
        
    } catch (error) {
        res.status(500).send(error)
    }
}

export async function postCustomer(req,res){
    const {name, phone, cpf, birthday} = req.body

    try {
        const findCpf = await db.query(`SELECT cpf FROM customers WHERE cpf = $1;`, [cpf])
        if (findCpf.rowCount === 1 ) return res.sendStatus(409)

        db.query(`INSERT INTO customers (name, phone, cpf, birthday) VALUES ('${name}','${phone}','${cpf}','${birthday}');`)
        res.sendStatus(201)
    } catch (error) {
        res.status(500).send(error)
    }
}

export async function setCustomer(req, res){
    const {id} = req.params
    const {name, phone, cpf, birthday} = req.body

    try {
        const findId = await db.query(`SELECT * FROM customers WHERE id = $1;`, [id])
        if (findId.rowCount === 0 ) return res.sendStatus(404)

        const findCpf = await db.query(`SELECT cpf FROM customers WHERE cpf = $1;`, [cpf])
        if (findCpf.rowCount === 1 ) return res.sendStatus(409)
        
        db.query(`UPDATE customers SET name = '${name}', phone = '${phone}', cpf = '${cpf}', birthday = '${birthday}' WHERE id = ${id};`)
        res.sendStatus(200)


    } catch (error) {
        res.status(500).send(error)
    }
}