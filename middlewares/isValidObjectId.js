//This middleware checks if the id parameter is a valid mongoose ObjectId or not.
module.exports = (req, res, next) => {
  if (req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
    next();
  } else {
    res.status(400).json({ message: "Invalid ObjectID" });
  }
};
