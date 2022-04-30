import messages from "../models/message";
import users from '../models/user'

export const getMessInRoom = async (req, res) => {
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
}

export const createMess = async (req, res) => {
    const user_id = req.params.user_id
    const room_id = req.params.room_id
    const content = req.body.content
  
    await messages.create({ content, user_id, room_id })
    res.status('200').redirect(`http://localhost:3000/mess/${user_id}&${room_id}`)
  }