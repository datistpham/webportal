import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "meolua99@gmail.com",
    pass: "nhbaqelrjskdurdq",
  },
});

const mailOptions = {
  from: "meolua99@gmail.com",
  to: "recipient_email_address",
  subject: "Test Email",
  text: "This is a test email sent from Nodemailer!",
};

transporter.sendMail(
  {
    from: "meolua99@gmail.com",
    to: "recipient_email_address",
    subject: "Test Email",
    text: "This is a test email sent from Nodemailer!",
  },
  (error, info) => {
    if (error) {
      console.log("Error sending email:", error);
    } else {
      console.log("Email sent:", info.response);
    }
  }
);

const sendEmail = async (email, code) => {
  transporter.sendMail(
    {
      from: "meolua99@gmail.com",
      to: email,
      subject: "Verfify account",
      text: "Your code verify is: " + code,
    },
    (err, result) => {
      if (err) throw err;
      return result.response;
    }
  );
};

export const sendMailAccount = async (email, account, password) => {
  transporter.sendMail(
    {
      from: "meolua99@gmail.com",
      to: email,
      subject: "Verfify account",
      html: `
      <div>Congratulations, you've became a part of us, this is your account, let's change your password when login</div>
      <br />
      <div>Account: <strong>${account}</strong></div>
      <br />
      <div>Password: <strong>${password}</strong></div>
      <br />
      <div>Have nice day !</div>
    `,
    },
    (err, result) => {
      if (err) throw err;
      return result.response;
    }
  );
};

export default sendEmail;
