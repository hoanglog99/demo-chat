const express = require('express')
const mongoose = require('mongoose')
const req = require('express/lib/request')
const { connectDB } = require('./src/models/connection')
const users = require('./src/models/user')
const rooms = require('./src/models/room')
const messages = require('./src/models/message')
const app = express()

const port = 3000

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static('./src/views/'))

app.listen(port, () => {
  connectDB();
  console.log(`Example app listening on port ${port}`)
})

app.get('/login', (req, res) => {
  res.send(`<form method="post">
              <input type="text" name="account"><br>
              <input type="text" name="password"><br>
              <button type="submit">đăng nhập</button>
            </form>`);
})

app.post('/login', async (req, res) => {
  const { account, password } = req.body
  const user = await users.findOne({ account: account })
  console.log(user)
  console.log(password);
  if (!user || user.password != password) {
    res.status('400').send('sai tài khoản hoặc mật khẩu!')
  } else {
    res.status('200').redirect(`http://localhost:3000/room${user._id}`);
  }
})

app.post('/register',
  (req, res, next) => {
    const { password, confirm_pass } = req.body
    if (password === confirm_pass) {
      next()
    } else {
      res.status('400').send('xác nhận mật khẩu sai!')
    }
  },
  async (req, res) => {
    const { account, password, name } = req.body
    await users.create({ account, password, name })
    res.status('200').send('đăng kí thành công!')
  })

app.get('/room:userId', async (req, res) => {
  const id = mongoose.Types.ObjectId(req.params.userId)
  const list_room = await rooms.find({ users_id: { $in: id } })

  let html = `<a href="http://localhost:3000/login">đăng xuất</a>
              <div class="list_room">`
  list_room.forEach(room => {
    html = html + `<a href="http://localhost:3000/mess/${id}&${room._id}">${room.room_name}</a><br>`
  });
  html = html + `</div>`

  res.status('200').send(html)
})

app.post('/room', async (req, res) => {
  const users_id = req.body.users_id
  let room_name = req.body.room_name

  if (!room_name) {
    room_name = "phòng chat giữa "
    for (let i = 0; i < users_id.length; i++) {
      const user = await users.findOne({ _id: users_id[i] })
      room_name = room_name + user.name + " "
    };
  }
  await rooms.create({ room_name, users_id })
  res.status('200').send('tạo phòng thành công!')
})

app.get('/mess/:userId&:roomId', async (req, res) => {
  const userId = req.params.userId
  const roomId = req.params.roomId

  const list_message = await messages.find({ room_id: roomId })
  
  let html = `<a href="http://localhost:3000/room${userId}">trở lại</a>
              <div class="list_message">`
  for (let index = 0; index < list_message.length; index++) {
    const user = await users.findOne({ _id: list_message[index].user_id })
    html = html + `<div>${user.name}  ${list_message[index].content}</div>`
  };
  html = html + `<form method="post">
                        <input type="text" name="content">
                        <button type="submit">gửi</button>
                    </form>
                </div>`

  res.status('200').send(html)
})

app.post('/mess/:user_id&:room_id', async (req, res) => {
  const user_id = req.params.user_id
  const room_id = req.params.room_id
  const content = req.body.content

  await messages.create({ content, user_id, room_id })
  res.status('200').redirect(`http://localhost:3000/mess/${user_id}&${room_id}`)
})



