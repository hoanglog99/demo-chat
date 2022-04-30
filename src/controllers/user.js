import users from '../models/user'

export const loginHTML = (req, res) => {
    res.send(`<form method="post">
                <input type="text" name="account"><br>
                <input type="text" name="password"><br>
                <button type="submit">đăng nhập</button>
              </form>`);
}

export const login = async (req, res) => {
    const { account, password } = req.body
    const user = await users.findOne({ account: account })
    console.log(user)
    console.log(password);
    if (!user || user.password != password) {
        res.status('400').send('sai tài khoản hoặc mật khẩu!')
    } else {
        res.status('200').redirect(`http://localhost:3000/room/${user._id}`);
    }
}

export const register = async (req, res) => {
    const { account, password, name } = req.body
    await users.create({ account, password, name })
    res.status('200').send('đăng kí thành công!')
}