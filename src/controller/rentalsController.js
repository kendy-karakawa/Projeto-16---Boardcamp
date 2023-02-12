import { db } from "../config/database.connection.js";
import dayjs from "dayjs";



export async function listRentals(req, res){
    try {
  
        const resultRental = await db.query(`SELECT * FROM rentals`)
        const resultGame = await db.query(`SELECT id, name FROM games`)  
        const resultCustomer = await db.query(`SELECT id, name FROM customers`)

        const finalResult = resultRental.rows.map(rental => ({
            ...rental,
            customer: 
                resultCustomer.rows.find(customer => customer.id == rental.customerId),
                //name: resultCustomer.rows.find(customer => customer.id = rental.customerId).name,
            
            game: 
                 resultGame.rows.find(game => game.id == rental.gameId),
                //name: resultGame.rows.find(game => game.id == rental.gameId).name,
        
        }))

        res.send(finalResult)


        // const finalResult = await db.query(`
        // SELECT json_build_object(
        //         'id', rentals.id,
        //         'customerId', rentals."customerId",
        //         'gameId', rentals."gameId",
        //         'rentDate', rentals."rentDate",
        //         'daysRented', rentals."daysRented",
        //         'returnDate', rentals."returnDate",
        //         'originalPrice', rentals."originalPrice",
        //         'delayFee', rentals."delayFee",
        //     'customer', json_build_object(
        //         'id', customers.id,
        //         'name', customers.name
        //     ),
        //     'game', json_build_object(
        //         'id', games.id,
        //         'name', games.name)
        //     ) FROM rentals JOIN customers ON customers.id = rentals."customerId"
        //         JOIN games ON games.id = rentals."gameId"; 
        // `)
        // res.send(finalResult.rows)


    } catch (error) {
        res.status(500).send(error)
    }
}

export async function postRental(req, res){
    const {customerId, gameId, daysRented} = req.body
    const rentDate = dayjs().format("YYYY-MM-DD");

    

    try {
        const findCustomer =  await db.query(`SELECT * FROM customers WHERE id = $1;`,[customerId])
        if (findCustomer.rowCount === 0) return res.status(400).send("cliente nao encontrado")

        const findGame = await db.query(`SELECT "pricePerDay", "stockTotal" FROM games WHERE id = $1;`,[gameId])
        if (findGame.rowCount === 0) return res.status(400).send("game nao encontrado")

        const gameStock = findGame.rows[0].stockTotal
        const totalGameRent = await db.query(`SELECT count ("gameId") FROM rentals WHERE "gameId" = $1;`, [gameId])
        if (totalGameRent.rows[0].count >= gameStock) return res.status(400).send("sem estoque")
        


        const originalPrice = findGame.rows[0].pricePerDay * daysRented
        
        db.query(`
        INSERT INTO rentals ("customerId", "gameId","rentDate", "daysRented","originalPrice") 
        VALUES (${customerId}, ${gameId}, '${rentDate}', ${daysRented}, ${originalPrice})`)        

        res.sendStatus(201)
    } catch (error) {
        res.status(500).send(error)
    }
}

export async function finishRental(req, res){
    const {id} = req.params
    const dateNow = dayjs().format("YYYY-MM-DD");
    
    
    try {
        const findRental = await db.query(`SELECT id, "returnDate", "rentDate", "daysRented", "originalPrice" FROM rentals WHERE id = $1;`, [id])
        
        if (findRental.rowCount === 0) return res.sendStatus(400) 

        const {returnDate, rentDate, daysRented, originalPrice} = findRental.rows[0]   

        if (returnDate !== null) return res.sendStatus(400)      
       
        const price =  originalPrice / daysRented

        const rentalDates = dayjs(rentDate).add(daysRented, 'day').format("YYYY-MM-DD")

        const daysOfDelay = dayjs(dateNow).diff(rentalDates, 'day')

        let delayFee = 0
        
        if (daysOfDelay >= 1) delayFee = daysOfDelay * price
        
        await db.query(`UPDATE rentals SET "returnDate" = '${dateNow}', "delayFee" = ${delayFee} WHERE id = ${id}`)

        res.sendStatus(200)
    } catch (error) {
        res.status(500).send(error)
    }
}