const router = require("express").Router();
const jwtCheckAuth = require("../middlewares/jwtCheckAuth");
const isValidObjectId = require("../middlewares/isValidObjectId");
const Follow = require("../models/Follow");
const User = require("../models/user");

router.get("/:id", isValidObjectId, async (req, res) => {
  var user = await User.findById(req.params.id);
  !user && res.status(404).json({ message: "User not found" });

  var userResource = new (require("../resources/userResource"))(user);
  return res.status(200).json({ user: userResource });
});

router.put("/:id", jwtCheckAuth, isValidObjectId, async (req, res) => {
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

router.put("/:id/follow", jwtCheckAuth, isValidObjectId, async (req, res) => {
  var user = await User.findById(req.params.id);
  !user && res.status(404).json({ message: "User not found" });

  try {
    const follow = await new Follow({
      followerId: req.body.followerId,
      followedId: req.body.followedId,
    });

    await follow.save();
    var followResource = new (require("../resources/followResource"))(follow);

    res.status(200).json({ message: "Followed", follow: followResource });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "An error occurred" });
  }
});

module.exports = router;
