import nodemailer from "nodemailer";

const sendMail = async (options) => {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: false,
    auth: {
      user: process.env.SMTP_USERNAME,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  // await aldaag barij avna
  const info = await transporter.sendMail({
    from: `${process.env.SMTP_FROM} <${process.env.SMTP_FROM_EMAIL}>`,
    to: options.email,
    subject: options.subject,
    html: options.message,
  });

  console.log("Имэйл илгээгдлээ:", info.messageId);
  return info;
};

export default sendMail;
