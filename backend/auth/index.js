let User = require('../models/user.model');

// check if user is logged in
const checkSignIn = (req, res, next) => {
    const { userID } = req.session;
    // Check for token
    if (!userID) {
        return res.status(401).send('authorization denied');
    } else {
        const user = User.findById(userID)
        if (!user) {
            res.status(404).send('User not found');
        }
        res.locals.user = user;
    }
    next();
}

// check if user is logged out
const checkSignOut = (req, res, next) => {
    const { userID } = req.session;
    // Check for token
    if (!userID) {
      return res.status(401).send('Not logged in');
    }
    next();
}

module.exports = {checkSignIn, checkSignOut}