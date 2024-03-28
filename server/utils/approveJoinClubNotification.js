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
const sendEmailNotification = (request,approver) => {
  // Email options
  const mailOptions = {
    from: 'noreply.kusam@gmail.com',
    to: request.user.email,
    cc: approver.email,
    subject: 'KUEBM: อนุมัติคำขอเข้าร่วมชมรม ' + request.club.name,
    html: `
    <h2>รายละเอียดคำขอเข้าร่วมชมรม</h2>
    <table>
      <tr>
        <td>ชื่อผู้ขอเข้าร่วม</td>
        <td>:</td>
        <td>${request.user.first_name} ${request.user.last_name}</td>
      </tr>
      <tr>
        <td>รหัสนิสิตผู้ขอเข้าร่วม</td>
        <td>:</td>
        <td>${request.user.student_id}</td>
      </tr>
      <tr>
        <td>อีเมลล์ผู้ขอเข้าร่วม</td>
        <td>:</td>
        <td>${request.user.email}</td>
      </tr>
      <tr>
        <td>เบอร์โทรศัพท์ผู้ขอเข้าร่วม</td>
        <td>:</td>
        <td>${request.user.phone_number}</td>
      </tr>
      <tr>
        <td>วันที่สร้างคำขอ</td>
        <td>:</td>
        <td>${formatDate(request.createdAt)}</td>
      </tr>
    </table>
    <p>หมายเลขอ้างอิง:   ${request._id}</p>
    <h2 style="color: #2a9d8f">คำขอเข้าร่วมชมรมถูกอนุมัติ</h2>
    <a href="http://localhost:3000/login">เข้าสู้ระบบได้ที่นี่</a>
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
