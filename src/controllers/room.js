import mongoose from 'mongoose'
import  rooms from '../models/room'
import users from '../models/user'

export const getRoom = async (req, res) => {
  const id = mongoose.Types.ObjectId(req.params.userId)
  const list_room = await rooms.find({ users_id: { $in: id } })

  let html = `<a href="http://localhost:3000/login">đăng xuất</a>
                <div class="list_room">`
  list_room.forEach(room => {
    html = html + `<a href="http://localhost:3000/mess/${id}&${room._id}">${room.room_name}</a><br>`
  });
  html = html + `</div>`

  res.status('200').send(html)
}

export const createRoom = async (req, res) => {
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
}