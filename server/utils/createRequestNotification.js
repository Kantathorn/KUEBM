require("dotenv").config()
const nodemailer = require('nodemailer');

const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
  return new Date(dateString).toLocaleString('th-TH', options);
}

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
      <h2>รายละเอียดคำร้อง</h2>
      <table>
        <tr>
          <td>หมายเลขคำร้อง</td>
          <td>:</td>
          <td>${number}</td>
        </tr>
        <tr>
          <td>รายละเอียดคำร้อง</td>
          <td>:</td>
          <td>${detail.description}</td>
        </tr>
        <tr>
          <td>วันที่ยืม</td>
          <td>:</td>
          <td>${formatDate(detail.use_date)}</td>
        </tr>
        <tr>
          <td>วันที่คืน</td>
          <td>:</td>
          <td>${formatDate(detail.returned_date)}</td>
        </tr>
        <tr>
          <td>พัสดุที่ยืม</td>
          <td>:</td>
          <td>${item.name}</td>
        </tr>
        <tr>
          <td>จากชมรม</td>
          <td>:</td>
          <td>${item.owner.name}</td>
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

module.exports = sendEmailNotification;
