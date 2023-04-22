const User = require("../../users/models/userModels");

const analysisCtrl = {
  getDataUser: async (req, res) => {
    try {
      const user = await User.find();
      res.json(user);
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
};
module.exports = analysisCtrl;
