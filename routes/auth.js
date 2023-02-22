const router = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");

router.post("/register", async (req, res) => {
  try {
    const salt = process.env.BCRYPT_SALT;
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const user = await new User({
      username: req.body.username,
      password: hashedPassword,
      email: req.body.email,
    });

    await user.save();
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    !user && res.status(404).json({ message: "User not found" });

    const hashedPassword = await user.password;
    const result = await bcrypt.compare(req.body.password, hashedPassword);

    !result && res.status(400).json({ message: "Invalid Credentials" });

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
