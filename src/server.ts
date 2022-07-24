import express, { Request, Response } from 'express'
import db from './config/database.config'

const app = express()
const port = 3000

db.sync().then(() => {
    console.log('Connect to database')
})




app.get('/', (req: Request, res: Response) => {
    res.send("Hello World")
})

app.listen(port, () => {
    console.log("App is runnning on port http://localhost:" + port)
})