exports.discogs = (req, res) => {
  const io = req.app.get("io");
  const user = {
    name: req.user.email
  };
  io.in(req.session.socketId).emit("discogs", user);
  res.end();
};
