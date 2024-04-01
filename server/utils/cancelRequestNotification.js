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
        <h2 style="color: #ff5550">คำร้องถูกยกเลิก</h2>
        <table>
          <tr>
            <td>หมายเลขคำร้อง</td>
            <td>:</td>
            <td>${request.request_number}</td>
          </tr>
          <tr>
            <td>ถูกยกเลิกโดย</td>
            <td>:</td>
            <td>${who.first_name}</td>
          </tr>
          <tr>
            <td>ถูกยกเลิกโดย</td>
            <td>:</td>
            <td>เนื่องจาก ${note}</td>
          </tr>
        </table>
        <p>*อีเมลนี้ถูกสร้างโดยระบบอัตโนมัติ กรุณาอย่าตอบกลับอีเมลนี้ (Do not reply this e-mail)</p>
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