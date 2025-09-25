const express = require("express");
const nodemailer = require("nodemailer");
const path = require("path");

//importing cors to connect combine both frontend & backend to the same server
const cors = require("cors");

const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

app.listen(PORT, () => {
  console.log(`Server Running On the Port: ${PORT}`);
});

app.post("/contact", async (req, res) => {
  const { name, email, message } = req.body;
  console.log(req.body);
  try {
    // Create a transporter
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: "manikumarnakka324@gmail.com",
        pass: "fttuumxtsdqvsdbq",
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    // Path to your PDF file
    const pdfPath = path.join(__dirname, "ManiKumar_Resume.pdf");

    // Send email to user
    await transporter.sendMail({
      from: "manikumarnakka324@gmail.com",
      to: email,
      subject: `Greetings`,
      html: `<h3>Hello ${name} sir</h3>
      <p>Thank you for your response</p>
      <p>I am attaching my Resume for your reference , if my profile is fit for your requirement please contact me.</p>`,
      attachments: [
        {
          filename: "ManiKumar_Resume.pdf", // Name of the file in the email
          path: pdfPath, // Path to the file on the server
          contentType: "application/pdf", // MIME type of the file
        },
      ],
    });

    // Send email to admin with user details
    await transporter.sendMail({
      from: "manikumarnakka324@gmail.com",
      to: "manikumarnakka324@gmail.com",
      subject: "🤩 New Message Arrived !!",
      html: `<h1>Details of the sender :-</h1>
      <h3>Name: ${name}</h3>
      <h3>Email: ${email}</h3>
      <h3>Message: </h3>${message}`,
    });

    res.status(200).send("Email sent successfully");
  } catch (error) {
    console.log("Error", error);
    res.status(500).send("Error sending email");
  }
});


app.get("/",async(req,res)=>{
    res.status(200).json('Backend is listening');
})