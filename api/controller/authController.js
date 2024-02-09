const jwt = require("jsonwebtoken");
const CryptoJS = require("crypto-js");
const { check, validationResult } = require("express-validator");
const User = require("../model/user");

module.exports.login = async (req, res) => {
  try {
    const { cred, password } = req.body;
    if (cred == undefined || password == undefined) {
      return res
        .status(400)
        .json({ status: 400, message: "Missing Credentials" });
    }
    const userDetail = await User.findOne({
      $or: [
        {
          email: cred,
        },
        {
          username: cred,
        },
      ],
    });
    if (userDetail) {
      const decryptedpassword = CryptoJS.AES.decrypt(
        userDetail.password,
        process.env.CRYPTOJS_SEC_KEY
      ).toString(CryptoJS.enc.Utf8);
      if (password === decryptedpassword) {
        return res.status(200).json({
          status: 200,
          token: tokengenerator(userDetail._id),
          user: {
            _id: userDetail._id,
            name: userDetail.name,
            username: userDetail.username,
            email: userDetail.email,
            role: userDetail.role,
          },
        });
      } else {
        return res.status(403).json({ status: 403, message: "Wrong password" });
      }
    } else {
      return res
        .status(404)
        .json({ status: 404, message: "User doesnot exist" });
    }
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ status: 500, message: err });
  }
};

module.exports.signup = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ status: 400, message: errors });
    }
    const { username, email, password, name } = req.body;
    const userDetail = await User.findOne({ email });
    const userNameCheck = await User.findOne({ username });
    if (userDetail) {
      return res
        .status(401)
        .json({ status: 409, message: "Email Already registered with us " });
    } else if (userNameCheck) {
      return res
        .status(401)
        .json({ status: 409, message: `${username} already exists` });
    } else {
      const data = new User({
        username,
        email,
        name,
        password: CryptoJS.AES.encrypt(
          password,
          process.env.CRYPTOJS_SEC_KEY
        ).toString(),
        role: "user",
      });
      const newUser = await data.save();
      if (newUser)
        return res.status(201).json({
          status: 201,
          token: tokengenerator(newUser._id),
          user: {
            name: newUser.name,
            username: newUser.username,
            email: newUser.email,
            _id: newUser._id,
            role: newUser.role,
          },
        });
      else
        return res
          .status(500)
          .json({ status: 500, message: "error registering user" });
    }
  } catch (err) {
    console.log(err.message);
    return res
      .status(500)
      .json({ status: 500, message: "Server Error while processing request" });
  }
};

module.exports.oauth = async (req, res) => {
  try {
    const token = req.body.token;
    if (token) {
      let options = {
        method: "POST",
        headers: {
          "content-type": "application/json",
          api: `f17d3c6b93404a13be5c670701f5c329`,
        },
        body: JSON.stringify({ token: token }),
      };
      const response = await fetch(
        `https://quicksign-bq48.onrender.com/api/developers/verifyuser`,
        options
      );
      const data = await response.json();
      if (response.status === 200 && data) {
        const { name, email, profile } = data.data;
        const user = await User.findOne({ email: email }).select("-paswword");
        if (user != null) {
          return res.status(200).json({
            status: 200,
            token: tokengenerator(user._id),
            user: {
              name: user.name,
              username: user.username,
              email: user.email,
              _id: user._id,
              role: user.role,
            },
          });
        } else {
          const newuser = new User({
            username: email.substring(0, email.indexOf("@")),
            email: email,
            password: CryptoJS.AES.encrypt(
              email.substring(0, email.indexOf("@")),
              process.env.CRYPTOJS_SEC_KEY
            ).toString(),
            profile: profile || "",
          });
          const result = await newuser.save();
          if (result)
            return res.status(200).json({
              status: 200,
              token: tokengenerator(result._id),
              user: {
                name: result.name,
                username: result.username,
                email: result.email,
                _id: result._id,
                role: result.role,
              },
            });
          else
            return res
              .status(500)
              .json({ status: 500, message: "error registering user" });
        }
      } else {
        return res.json(data);
      }
    } else {
      return res
        .status(401)
        .json({ status: 401, message: "Missing Access Token" });
    }
  } catch (error) {
    console.log(err.message);
    return res
      .status(500)
      .json({ status: 500, message: "Server Error while processing request" });
  }
};

function tokengenerator(_id) {
  return jwt.sign({ _id: _id }, process.env.JWT_SEC_KEY, { expiresIn: "3d" });
}
