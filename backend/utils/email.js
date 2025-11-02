import nodemailer from "nodemailer";

const sendMail = async (options) => {
  // Create a test account or replace with real credentials.
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USERNAME,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  // Wrap in an async IIFE so we can use await.
  (async () => {
    const info = await transporter.sendMail({
      from: `${process.env.SMTP_FROM} <${process.env.SMTP_FROM_EMAIL} >`,
      to: options.email,
      subject: options.subject,
      html: options.message, // HTML body
    });

    console.log("Message sent:", info.messageId);
    return info;
  })();
};

export default sendMail;
