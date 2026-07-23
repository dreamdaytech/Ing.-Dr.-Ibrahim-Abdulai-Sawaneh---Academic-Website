const fs = require('fs');
let c = fs.readFileSync('server.ts', 'utf8');

const importStatement = `import nodemailer from 'nodemailer';\n`;
if (!c.includes("import nodemailer")) {
  c = c.replace('import dotenv from "dotenv";', importStatement + 'import dotenv from "dotenv";');
}

const endpoint = `
  app.post("/api/notify-admin", async (req, res) => {
    try {
      const { type, email, org, proposal } = req.body;
      
      // Use Ethereal Email for testing if no real credentials are provided
      let testAccount = await nodemailer.createTestAccount();
      
      let transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: process.env.SMTP_USER || testAccount.user, 
          pass: process.env.SMTP_PASS || testAccount.pass, 
        },
      });

      let info = await transporter.sendMail({
        from: '"Academic Gateway System" <no-reply@academicgateway.local>',
        to: "admin@academicgateway.local", // list of receivers
        subject: \`New \${type} Submitted\`, // Subject line
        text: \`A new \${type} has been submitted.\\n\\nOrganization/Name: \${org}\\nEmail: \${email}\\nProposal: \${proposal}\`, 
        html: \`<p>A new <b>\${type}</b> has been submitted.</p><p><b>Organization/Name:</b> \${org}<br/><b>Email:</b> \${email}<br/><b>Proposal:</b> \${proposal}</p>\`, 
      });

      console.log("Message sent: %s", info.messageId);
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
      
      res.json({ success: true, previewUrl: nodemailer.getTestMessageUrl(info) });
    } catch (error: any) {
      console.error("Error sending notification:", error);
      res.status(500).json({ error: "Failed to send notification" });
    }
  });

  // API route to discover
`;

c = c.replace("  // API route to discover", endpoint);

fs.writeFileSync('server.ts', c);
