export function validateSchema(schema){
    return (req,res,next)=>{
        const {error} = schema.validate(req.body, {abortEarly:false})

        if (error){
            const errorMessages = error.details.map(err => err.message)
            return res.sendStatus(400)
        }
        
        next()
    }
}