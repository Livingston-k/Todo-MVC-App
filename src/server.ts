import express from 'express'
import db from './config/database.config'
import router from './routes'
import TodoController from './controller'
const app = express()
const port = 3000
app.use(express.json())

// DATABASE CONFIG
db.sync().then(() => {
    console.log('Connected to database')
})

//ROUTES
app.get('/', TodoController.alert)
app.use("/api/", router)
// SERVER 
app.listen(port, () => {
    console.log("App is runnning on port http://localhost:" + port)
})