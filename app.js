import express from 'express'
import path from 'path'
import { connectDB } from './src/models/connection'
import routerUser from './src/routers/user'
import routerRoom from './src/routers/room'
import routerMess from './src/routers/message'
const app = express()

const port = 3000

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public/html/')));



app.use('/',routerMess)
app.use('/',routerUser)
app.use('/',routerRoom)

app.listen(port, () => {
  connectDB();
  console.log(`Example app listening on port ${port}`)
})