import { db } from "../config/database.connection.js";
import dayjs from "dayjs";


export async function listRentals(req, res){
    try {
        const rentals = await db.query(
            `SELECT * FROM rentals 
            JOIN customers ON rentals."customerId" = customers.id
            JOIN games ON rentals."gameId" = games.id 
            `)
        res.send(rentals.rows)
        
    } catch (error) {
        res.status(500).send(error)
    }
}

export async function postRental(req, res){
    const {customerId, gameId, daysRented} = req.body
    const rentDate = dayjs().format("YYYY-MM-DD");

    //rentDate | daysRented | returnDate | originalPrice | delayFee

    try {
        const findCustomer =  await db.query(`SELECT * FROM customers WHERE id = $1;`,[customerId])
        if (findCustomer.rowCount === 0) return res.sendStatus(400)

        const findGame = await db.query(`SELECT "pricePerDay" FROM games WHERE id = $1;`,[gameId])
        if (findGame.rowCount === 0) return res.sendStatus(400)
        
        const originalPrice =findGame.rows[0].pricePerDay * daysRented
        console.log(originalPrice)
        


        

        res.send("ok")
    } catch (error) {
        res.status(500).send(error)
    }
}