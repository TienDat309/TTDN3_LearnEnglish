const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Users = require('../models/userModels');
const sendMail = require('./sendMail');

const { google } = require('googleapis');
const { OAuth2 } = google.auth;
const fetch = require('node-fetch');
const ObjectId = require('mongoose').Types.ObjectId;

const client = new OAuth2(process.env.MAILING_SERVICE_CLIENT_ID);

const { CLIENT_URL } = process.env;

const userCtrl = {
  register: async (req, res) => {
    try {
      const {
        firstname,
        lastname,
        email,
        password,
        address,
        nationality,
        phonenumber,
        avatar,
        position,
      } = req.body;

      if (!lastname || !email || !password || !position)
        return res.status(400).json({ msg: 'Please fill in all fields.' });

      if (!validateEmail(email))
        return res.status(400).json({ msg: 'Invalid emails.' });

      const user = await Users.findOne({ email });
      if (user)
        return res.status(400).json({ msg: 'The email already exists.' });

      if (password.length < 6)
        return res
          .status(400)
          .json({ msg: 'Password must be at least 6 characters.' });

      // Password Encryption
      const passwordHash = await bcrypt.hash(password, 12);

      const newUser = {
        firstname,
        lastname,
        email,
        password: passwordHash,
        address,
        nationality,
        phonenumber,
        avatar,
        position,
      };

      const activation_token = createActivationToken(newUser);

      const url = `${CLIENT_URL}/user/activate/${activation_token}`;
      const txt = `
        <div style="max-width: 700px; margin:auto; border: 10px solid #ddd; padding: 50px 20px; font-size: 110%;">
          <h2 style="text-align: center; text-transform: uppercase;color: teal;">Welcome to the Learn English</h2>
          <p>Congratulations! You're almost set to start using LEARN ENGLISH.
              Just click the button below to validate your email address.
          </p>
          
          <a href=${url} style="background: crimson; text-decoration: none; color: white; padding: 10px 20px; margin: 10px 0; display: inline-block;">Confirm</a>
      
          <p>If the button doesn't work for any reason, you can also click on the link below:</p>
      
          <div>${url}</div>
        </div>
      `;
      sendMail(email, url, txt);

      res.json({
        msg: 'Register Success! Please activate your email to start.',
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  activateEmail: async (req, res) => {
    try {
      const { activation_token } = req.body;
      const user = jwt.verify(
        activation_token,
        process.env.ACTIVATION_TOKEN_SECRET
      );

      if (user._id) {
        await Users.findOneAndUpdate({ _id: ObjectId(user._id) }, { ...user });

        return res.json({ msg: 'Email has been activated!' });
      }

      const {
        firstname,
        lastname,
        email,
        password,
        address,
        nationality,
        phonenumber,
        avatar,
        position,
      } = user;

      const check = await Users.findOne({ email });
      if (check)
        return res.status(400).json({ msg: 'This email already exists.' });

      const newUser = new Users({
        firstname,
        lastname,
        email,
        password,
        address,
        nationality,
        phonenumber,
        avatar,
        position,
      });

      await newUser.save();

      res.json({ msg: 'Account has been activated!' });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  // login
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await Users.findOne({ email });
      if (!user)
        return res.status(400).json({ msg: 'This email does not exist.' });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch)
        return res.status(400).json({ msg: 'Password is incorrect.' });

      const refresh_token = createRefreshToken({ id: user._id });

      res.cookie('refreshtoken', refresh_token, {
        httpOnly: true,
        path: '/user/refresh_token',
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      });
      res.json({ msg: 'Login success!' });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  getAccessToken: (req, res) => {
    try {
      const rf_token = req.cookies.refreshtoken;
      if (!rf_token) return res.status(400).json({ msg: 'Please login now!' });

      jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) return res.status(400).json({ msg: 'Please login now!' });

        const access_token = createAccessToken({ id: user.id });
        res.json({ access_token });
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  getUserInfor: async (req, res) => {
    try {
      const user = await Users.findById(req.user.id);
      res.json(user);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  updateUserInfor: async (req, res) => {
    try {
      if (req.body.password === '') {
        delete req.body.password;
      }

      if (req.body.email) {
        const existedEmail = await Users.findOne({
          email: req.body.email,
          _id: { $ne: ObjectId(req.body._id) },
        });

        if(existedEmail){
          return res.status(500).json({ msg: 'This email is already used for another account' });
        }

        const activation_token = createActivationToken(req.body);

        const url = `${CLIENT_URL}/user/activate/${activation_token}`;
        const txt = `
          <div style="max-width: 700px; margin:auto; border: 10px solid #ddd; padding: 50px 20px; font-size: 110%;">
            <h2 style="text-align: center; text-transform: uppercase;color: teal;">Reset email</h2>
            <p>A request to reset email of your LEARN ENGLISH's account has been send.
                Just click the button below to validate your email address.
            </p>
            
            <a href=${url} style="background: crimson; text-decoration: none; color: white; padding: 10px 20px; margin: 10px 0; display: inline-block;">Verify your email address</a>
        
            <p>If the button doesn't work for any reason, you can also click on the link below:</p>
            
            <div>${url}</div>

            <p>If you didn't request to reset your email, please ignore this.</p>
          </div>
        `;
        sendMail(req.body.email, url, txt);
        return res.status(200).json({ msg: 'Success' });
      }

      if (req.body.password) {
        req.body.password = await bcrypt.hash(req.body.password, 12);
      }

      const user = await Users.findOneAndUpdate(
        { _id: new ObjectId(req.body._id) },
        { $set: req.body },
        { new: true }
      );
      res.json(user);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  logout: async (req, res) => {
    try {
      res.clearCookie('refreshtoken', { path: '/user/refresh_token' });
      return res.json({ msg: 'Logged out.' });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  googleLogin: async (req, res) => {
    try {
      // const { tokenId } = req.body;

      // const verify = await client.verifyIdToken({
      //   idToken: tokenId,
      //   audience: process.env.MAILING_SERVICE_CLIENT_ID,
      // });

      // const { email_verified, email, name, picture } = verify.payload;

      // const password = email + process.env.GOOGLE_SECRET;

      // const passwordHash = await bcrypt.hash(password, 12);

      // if (!email_verified)
      //   return res.status(400).json({ msg: 'Email verification failed.' });

      const { email } = req.body;
      const user = await Users.findOne({ email });
      if (!user)
        return res.status(400).json({ msg: 'This email does not exist.' });

      // if (user) {
      // const isMatch = await bcrypt.compare(password, user.password);
      // if (!isMatch)
      //   return res.status(400).json({ msg: 'Password is incorrect.' });

      const refresh_token = createRefreshToken({ id: user._id });
      res.cookie('refreshtoken', refresh_token, {
        httpOnly: true,
        path: '/user/refresh_token',
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      });

      res.json({ msg: 'Login success!' });
      //   } else {
      //     const newUser = new Users({
      //       lastname: name,
      //       email,
      //       password: passwordHash,
      //       avatar: picture,
      //     });

      //     await newUser.save();

      //     const refresh_token = createRefreshToken({ id: newUser._id });
      //     res.cookie('refreshtoken', refresh_token, {
      //       httpOnly: true,
      //       path: '/user/refresh_token',
      //       maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      //     });

      //     res.json({ msg: 'Login success!' });
      //   }
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  facebookLogin: async (req, res) => {
    try {
      const { email } = req.body;

      const user = await Users.findOne({ email });
      if (!user)
        return res.status(400).json({ msg: 'This email does not exist.' });

      // if (user) {
      // const isMatch = await bcrypt.compare(password, user.password);
      // if (!isMatch)
      //   return res.status(400).json({ msg: 'Password is incorrect.' });

      const refresh_token = createRefreshToken({ id: user._id });
      res.cookie('refreshtoken', refresh_token, {
        httpOnly: true,
        path: '/user/refresh_token',
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      });

      res.json({ msg: 'Login success!' });

      //   if (user) {
      //     const isMatch = await bcrypt.compare(password, user.password);
      //     if (!isMatch)
      //       return res.status(400).json({ msg: 'Password is incorrect.' });

      //     const refresh_token = createRefreshToken({ id: user._id });
      //     res.cookie('refreshtoken', refresh_token, {
      //       httpOnly: true,
      //       path: '/user/refresh_token',
      //       maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      //     });

      //     res.json({ msg: 'Login success!' });
      //   } else {
      //     const newUser = new Users({
      //       lastname: name,
      //       email,
      //       password: passwordHash,
      //       avatar: picture.data.url,
      //     });

      //     await newUser.save();

      //     const refresh_token = createRefreshToken({ id: newUser._id });
      //     res.cookie('refreshtoken', refresh_token, {
      //       httpOnly: true,
      //       path: '/user/refresh_token',
      //       maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      //     });

      //     res.json({ msg: 'Login success!' });
      //   }
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

const validateEmail = (email) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
};

const createActivationToken = (payload) => {
  return jwt.sign(payload, process.env.ACTIVATION_TOKEN_SECRET, {
    expiresIn: '5m',
  });
};

const createAccessToken = (payload) => {
  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: '15m',
  });
};

const createRefreshToken = (payload) => {
  return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: '7d',
  });
};

module.exports = userCtrl;
