exports.isLoggedIn = function (req, res, next) {
  if (req.user) {
    console.log(`User is logged in: ${req.user.id}`);
    next();
  } else {
    console.log("Access Denied: User not logged in");
    return res.status(401).send("Access Denied");
  }
};
