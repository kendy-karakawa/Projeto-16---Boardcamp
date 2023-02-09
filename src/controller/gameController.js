import { db } from "../config/database.connection.js"; 

export async function listGames(req, res){

    try {
        const games = await db.query("SELECT * FROM games");
        res.send(games.rows)
        
    } catch (error) {
        return res.status(500).send(error)
    }

}

export async function postGame(req, res){
    const {name, image, stockTotal, pricePerDay} = req.body
    
    try {
        const findGame = await db.query(`SELECT * FROM games WHERE name = '${name}'`)
        if (findGame.rowCount === 1) return res.sendStatus(409) 
        
         db.query(`INSERT INTO games (name, image, "stockTotal", "pricePerDay") VALUES ('${name}', '${image}', ${stockTotal}, ${pricePerDay});` )
        res.sendStatus(201)

    } catch (error) {
        return res.status(500).send(error)
    }
} 