const router = require("express").Router();
const User = require("../models/user");

router.get("/:id", async (req, res) => {
  const user = await User.findById(req.params.id);
  !user && res.status(404).json({ message: "User not found" });

  var userResource = new (require("../resources/userResource"))(user);

  res.status(200).json({ user: userResource });
});

router.put("/:id", async (req, res) => {
  var user = await User.findById(req.params.id);
  !user && res.status(404).json({ message: "User not found" });

  try {
    await user.update({
      $set: {
        username: req.body.username,
        email: req.body.email,
        profilePicture: req.body.profilePicture,
        coverPicture: req.body.coverPicture,
        followers: req.body.followers,
        followings: req.body.followings,
      },
    });

    var user = await User.findById(req.params.id);
    res.status(200).json({ user: user });
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

module.exports = router;
