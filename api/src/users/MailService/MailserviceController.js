const nodemailer = require('nodemailer');
const { google } = require('googleapis');
const { OAuth2 } = google.auth;
const OAUTH_PLAYGROUND = 'https://developers.google.com/oauthplayground';

const {
  MAILING_SERVICE_CLIENT_ID,
  MAILING_SERVICE_CLIENT_SECRET,
  MAILING_SERVICE_REFRESH_TOKEN,
  SENDER_EMAIL_ADDRESS,
} = process.env;

const oauth2Client = new OAuth2(
  MAILING_SERVICE_CLIENT_ID,
  MAILING_SERVICE_CLIENT_SECRET,
  MAILING_SERVICE_REFRESH_TOKEN,
  OAUTH_PLAYGROUND
);

class MailService {
  #codeOTP; // lưu trữ mã otp
  #mailManage = 'learningenglish@gmail.com'; // Mail quản lý
  #passWordManage = 'passwordofmine'; // password quản lý
  #isResetOtp = false; // Mã otp đã được gửi chưa

  // tạo mail quản lý
  addMailManage(
    user = 'learningenglish@gmail.com',
    password = 'passwordofmine'
  ) {
    this.#mailManage = user;
    this.#passWordManage = password;
  }

  // gửi mail cảnh báo học vụ
  sendMailNoteMeeting = async (req, res) => {
    try {
      if (req.body.email === null || req.body.email === undefined) {
        res.status(400).json('Email null');
      }

      oauth2Client.setCredentials({
        refresh_token: MAILING_SERVICE_REFRESH_TOKEN,
      });

      const accessToken = oauth2Client.getAccessToken();

      let transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
          type: 'OAuth2',
          user: SENDER_EMAIL_ADDRESS,
          clientId: MAILING_SERVICE_CLIENT_ID,
          clientSecret: MAILING_SERVICE_CLIENT_SECRET,
          refreshToken: MAILING_SERVICE_REFRESH_TOKEN,
          accessToken,
        },
      });
      let mailOptions = {
        from: this.#mailManage,
        to: req.body.email,
        subject: 'LEARNING ENGLISH!',
        html: `<div>
        <h1>Hello,</h1>
        <h3>You have an invitation by ${req.body.nameLectures} to join a meeting about skill ${req.body.nameSkills}. In this skill you will learn at ${req.body.levelSkill}. Name topic is ${req.body.nameTopic}!</h3>
        <h4>Start time is: ${req.body.dayCreate}</h4>
        <h4>Start hour is: ${req.body.hourCreate}</h4>
        <a href='http://localhost:3000/booking' style="background: crimson; text-decoration: none; color: white; padding: 10px 20px; margin: 10px 0; display: inline-block;">Join</a>
        <h2>Thank You!</h2>
        </div>`,
      };
      await transporter.sendMail(mailOptions).catch((err) => {
        throw err;
      });
      res.status(200).json('Send email successfully');
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  };

  sendMailToLecture = async (req, res) => {
    try {
      if (req.body.email === null || req.body.email === undefined) {
        res.status(400).json('Email null');
      }

      oauth2Client.setCredentials({
        refresh_token: MAILING_SERVICE_REFRESH_TOKEN,
      });

      const accessToken = oauth2Client.getAccessToken();

      let transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
          type: 'OAuth2',
          user: SENDER_EMAIL_ADDRESS,
          clientId: MAILING_SERVICE_CLIENT_ID,
          clientSecret: MAILING_SERVICE_CLIENT_SECRET,
          refreshToken: MAILING_SERVICE_REFRESH_TOKEN,
          accessToken,
        },
      });

      let mailOptions = {
        from: this.#mailManage,
        to: req.body.email,
        subject: 'Notice about your meeting!',
        html: `<div>
        <h1>Dear ${req.body.nameLectures},</h1>
        <h3>${req.body.nameStudent} just joined your lecture</h4>
        <h4>Student's email: ${req.body.studentEmail}</h4>
        <h4>Skill: ${req.body.nameSkills}</h4>
        <h4>Level: ${req.body.levelSkill}</h4>
        <h4>Topic: ${req.body.nameTopic}</h4>
        <h2>Thank You!</h2>
        </div>`,
      };
      transporter.sendMail(mailOptions);
      res.status(201).json('Send email successfully');
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  confirmResettingEmail = async (req, res) => {
    try {
      if (
        req.body.email === null ||
        req.body.email === undefined ||
        req.body.url === null ||
        req.body.url === undefined
      ) {
        res.status(400).json('Value is null');
      }

      oauth2Client.setCredentials({
        refresh_token: MAILING_SERVICE_REFRESH_TOKEN,
      });

      const accessToken = oauth2Client.getAccessToken();

      let transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
          type: 'OAuth2',
          user: SENDER_EMAIL_ADDRESS,
          clientId: MAILING_SERVICE_CLIENT_ID,
          clientSecret: MAILING_SERVICE_CLIENT_SECRET,
          refreshToken: MAILING_SERVICE_REFRESH_TOKEN,
          accessToken,
        },
      });

      let mailOptions = {
        from: this.#mailManage,
        to: req.body.email,
        subject: 'LEARN ENGLISH',
        html: `
            <div style="max-width: 700px; margin:auto; border: 10px solid #ddd; padding: 50px 20px; font-size: 110%;">
            <h2 style="text-align: center; text-transform: uppercase;color: teal;">Reset email</h2>
            <p>A request to reset email of your LEARN ENGLISH's account has been send.
                Just click the button below to validate your email address.
            </p>
            
            <a href=${req.body.url} style="background: crimson; text-decoration: none; color: white; padding: 10px 20px; margin: 10px 0; display: inline-block;">Verify your email address</a>
        
            <p>If the button doesn't work for any reason, you can also click on the link below:</p>
            
            <div>${req.body.url}</div>

            <p>If you didn't request to reset your email, please ignore this.</p>
            </div>
        `,
      };
      transporter.sendMail(mailOptions);
      res.status(201).json('Send email successfully');
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
}
module.exports = new MailService();
