exports.signIn = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findByCredentials({ email: email.toLowerCase(), password });
    if (user) {
      const token = await user.generateAuthToken();
      if (token) {
        return res.header('x-auth', token).status(200).json({
          user: {
            items: user.items,
            name: user.name,
            token
          }
        })
      }
    }
    res.status(400).json({ message: 'Login failed.' })
  } catch (error) {
    console.log('signIn error: ', error);
    res.status(400).json({ message: 'Login failed.' })
  }
}
exports.signOut = async (req, res) => {

}
exports.signUp = async (req, res) => {

}