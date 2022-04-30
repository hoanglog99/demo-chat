export const validateRegister = (req, res, next) => {
    const { password, confirm_pass } = req.body
    if (password === confirm_pass) {
      next()
    } else {
      res.status('400').send('xác nhận mật khẩu sai!')
    }
  }