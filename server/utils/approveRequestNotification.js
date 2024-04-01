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

const sendApproveEmailNotification = (request,date,approver) => {
    // Email options
    const mailOptions = {
      from: 'noreply.kusam@gmail.com',
      to: request.requester.email,
      cc: [
        request.request_to.email,
        approver.email
      ],
      subject: 'KUEBM: คำร้องหมายเลข ' + request.request_number + ' ถูกอนุมัติเรียบร้อยแล้ว',
      html: `
        <h2 style="color: #2a9d8f">คำร้องได้รับการอนุมัติ</h2>
        <table>
          <tr>
            <td>หมายเลขคำร้อง</td>
            <td>:</td>
            <td>${request.request_number}</td>
          </tr>
          <tr>
            <td>ได้รับการอนุมัติจาก</td>
            <td>:</td>
            <td>${approver.first_name}</td>
          </tr>
          <tr>
            <td>วันที่ยืม</td>
            <td>:</td>
            <td>${formatDate(request.collected_date)}</td>
          </tr>
          <tr>
            <td>วันที่คืน</td>
            <td>:</td>
            <td>${formatDate(request.returned_date)}</td>
          </tr>
        </table>
        <p style="color: #ff5550">กรุณารับพัสดุภายในวันที่ ${formatDate(date)} น. ณ ${request.request_to.address}</p>
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
  
  module.exports = sendApproveEmailNotification;