const User = require("../models/user.model");

const getUserbyID = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select('-password');
        if (!user) {
          return res.status(404).json({ msg: 'User not found' });
        }
        res.json(user);
      } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
          return res.status(404).json({ msg: 'User not found' });
        }
        res.status(500).send('Server Error');
      }
};

module.exports = { getUserbyID };
