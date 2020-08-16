const User = require("../models/user");

exports.signIn = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findByCredentials({ email: email.toLowerCase(), password });
    if (user) {
      const token = await user.generateAuthToken();
      if (token) {
        return res.header("x-auth", token).status(200).json({
          user: {
            items: user.items,
            name: user.name,
            token
          }
        });
      }
    }
    res.status(400).json({ message: "Invalid e-mail or password." });
  } catch (error) {
    console.log("signIn error: ", error);
    res.status(400).json({ message: "Invalid e-mail or password." });
  }
}
exports.signOut = async (req, res) => {
  if (req.me) {
    try {
      await req.me.removeToken();
    } catch (error) {
      console.log("error: ", error);
    }
  }
  req.me = null;
  res.status(204).send();
}
exports.signUp = async (req, res) => {
  const { email, name, password } = req.body;

  if (!email || !name || !password) return res.status(400).json({ message: "Missing parameters." });

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(422).json({ message: "This email is already registered." });
    }
    const user = await User.create(req.body);
    const token = await user.generateAuthToken();
    const data = { token, ...req.body };

    res.status(201).json({ user: data });
  } catch (error) {
    console.log(error);
    res.status(422).json({ message: "Could not register." });
  }
}