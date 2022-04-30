import express from 'express'
import Pusher from 'pusher'
import { connectDB } from './src/models/connection'
import routerUser from './src/routers/user'
import routerRoom from './src/routers/room'
import routerMess from './src/routers/message'
const app = express()

const port = 3000

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static('./src/views/'))

const pusher = new Pusher({
  appId: "1403607",
  key: "a2bab2bde9284fa76227",
  secret: "3db71a12ee22c2de9d66",
  cluster: "ap1",
  useTLS: true
});

app.use('/',routerMess)
app.use('/',routerUser)
app.use('/',routerRoom)

app.listen(port, () => {
  connectDB();
  console.log(`Example app listening on port ${port}`)
})