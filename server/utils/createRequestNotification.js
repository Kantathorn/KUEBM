require("dotenv").config({path: '../.env'})
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

// Function to send email notification
const sendEmailNotification = (recipientEmail, ownerEmail,detail, number, item) => {
  // Email options
  const mailOptions = {
    from: 'noreply.kusam@gmail.com',
    to: recipientEmail,
    cc: ownerEmail,
    subject: 'KUEBM: คำร้องหมายเลข ' + number + ' ถูกสร้างเรียบร้อยแล้ว',
    html: `
      <p>หมายเลขคำร้อง:   ${number}</p>
      <p>รายละเอียดคำร้อง: ${detail.description}</p>
      <p>วันที่ยืม:          ${detail.collected_date}</p>
      <p>วันที่คืน:          ${detail.returned_date}</p>
      <p>พัสดุที่ยืม:         ${item.name}</p>
      <p>จากชมรม:        ${item.owner.name}</p>
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

module.exports = sendEmailNotification;
