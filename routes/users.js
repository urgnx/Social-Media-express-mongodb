const router = require("express").Router();

router.get("/", (req, res) => {
  res.send("userRoute");
});

module.exports = router;
