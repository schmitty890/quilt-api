import nodemailer from "nodemailer";
export const sendEmail = (req, res) => {
  let newEmail = req.body;
  // async..await is not allowed in global scope, must use a wrapper
  async function main() {
    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    let testAccount = await nodemailer.createTestAccount();

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAILEMAIL,
        pass: process.env.GMAILPASS,
      },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: `${newEmail.yourEmail}`, // sender address
      to: process.env.GMAILEMAIL, // list of receivers
      subject: "Quilt contact form email", // Subject line
      text: `A message from ${newEmail.yourName} at ${newEmail.yourEmail}! Message: ${newEmail.yourMessage}`, // plain text body
    });

    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
  }

  main().catch(console.error);
};
