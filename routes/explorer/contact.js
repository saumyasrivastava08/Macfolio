const express = require('express')
const rtr = express.Router()
const nodemailer = require('nodemailer')
const config = require('../../config/key')

// POST contact form
rtr.post('/contact', function (req, res) {
  let msg = `Name: ` + req.body.cname + ` <br>Contact: ` + req.body.cemail + ` <br>Message: ` + req.body.csubject;
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: config.authUser,
      pass: config.authPass
    }
  });
  var mailOptions = {
    from: req.body.cemail,
    to: 'kartik9756@gmail.com',
    subject: req.body.csubject,
    text: msg
  };
  transporter.sendMail(mailOptions, function (error, info) {
    res.json(error ?
      { status: 300, send: false } :
      { status: 200, send: true }
    );
  });
});

module.exports = rtr