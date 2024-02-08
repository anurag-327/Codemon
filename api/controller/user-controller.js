const User = require("../model/user");
module.exports.getUser = async (req, res, next) => {
  try {
    const username = req.params.id;
    if (username) {
      const user = await User.findOne({ username: username })
        .select("-password")
        .populate({ path: "questionsSolved", select: "question name _id" });
      if (user) {
        return res.status(200).json({ status: 200, user });
      } else {
        return res
          .status(404)
          .json({ status: 404, message: "User Not found!" });
      }
    } else {
      return res.status(404).json({ status: 404, message: "Username Missing" });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ status: 500, message: err.message });
  }
};
module.exports.getMinidata = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select(
      "username _id email role profile name"
    );
    if (user) {
      return res.status(200).json({ status: 200, user: user });
    } else {
      return res.status(404).json({ status: 404, message: "User Not found!" });
    }
  } catch (err) {
    return res.status(500).json({ status: 500, message: err.message });
  }
};
