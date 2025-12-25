async function getProfile(req, res) {
  res.json({ user: req.user.toSafe() });
}

module.exports = { getProfile };

