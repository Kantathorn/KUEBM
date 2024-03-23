require("dotenv").config()
const nodemailer = require('nodemailer');

// Create a transporter object using SMTP transport
const transporter = nodemailer.createTransport({
  service: "Gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PSSWD
  }
});

const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
    return new Date(dateString).toLocaleString('th-TH', options);
}

const sendCancelEmailNotification = (request,who,note) => {
    // Email options
    const mailOptions = {
      from: 'noreply.kusam@gmail.com',
      to: request.requester.email,
      cc: [
        request.request_to.email,
        who.email
      ],
      subject: 'KUEBM: คำร้องหมายเลข ' + request.request_number + ' ถูกยกเลิก',
      html: `
        <p>หมายเลขคำร้อง:   ${request.request_number}</p>
        <p>ถูกยกเลิกโดย: ${who.first_name}</p>
        <p>เนื่องจาก ${note}</p>
        <p>*อีเมลล์นี้ถูกสร้างโดยระบบอัตโนมัติ กรุณาอย่าตอบกลับอีเมลล์นี้ (Do not reply this e-mail)</p>
      `
    };
  
    // Send email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
      } else {
        console.log('Email sent:', info.response);
      }
    });
  };
  
  module.exports = sendCancelEmailNotification;