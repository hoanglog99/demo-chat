import { pusher } from "../lib/pusher";
import Pusher from "pusher";
import messages from "../models/message";
import users from '../models/user'

export const getMessInRoom = async (req, res) => {
    const userId = req.params.userId
    const roomId = req.params.roomId

    const list_message = await messages.find({ room_id: roomId })
    
    let html = `<a href="http://localhost:3000/room${userId}">trở lại</a>
                <div id="list_message">`
    for (let index = 0; index < list_message.length; index++) {
        const user = await users.findOne({ _id: list_message[index].user_id })
        html = html + `<div>${user.name}  ${list_message[index].content}</div>`
    };
    html = html + `<form method="post">
                          <input type="text" name="content">
                          <button type="submit">gửi</button>
                      </form>
                  </div>
                  <script src="https://cdnjs.cloudflare.com/ajax/libs/pusher/4.2.2/pusher.min.js"></script>
                  <script>
                    var pusher = new Pusher('c0acae6f17807058144c', {
                        cluster: 'ap1',
                        encrypted: true
                    });
                    const channel = pusher.subscribe('message-changes')
                    channel.bind('add', function(data) { 
                        console.log(data)
                    })
                  </script>`

    res.status('200').send(html)
}

export const createMess = async (req, res) => {

    const messData = {
        "user_id": req.params.user_id,
        "room_id": req.params.room_id,
        "content": req.body.content
    }
    console.log(messData);
    await messages.create(messData)
    pusher.trigger('message-changes', 'add', {
        "messData": messData
    })
    res.status('200').redirect(`http://localhost:3000/mess/${req.params.user_id}&${req.params.room_id}`)
}