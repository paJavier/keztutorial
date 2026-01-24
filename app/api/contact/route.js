import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    const body = await req.json();
    const { name, email, message } = body;

    if (!name || !email || !message) {
      return new Response(JSON.stringify({ message: "Missing fields" }), { status: 400 });
    }

    // Create a transporter using Gmail SMTP
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465, 
      secure: true, // true for port 465
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      logger: true, // log info in console
      debug: true,  // debug info
    });

    await transporter.sendMail({
      from: `"${name}" <${email}>`,         
      to: process.env.EMAIL_RECEIVER,       
      subject: `New Contact Form Message from ${name}`,
      text: message,
      html: `<p>${message}</p><p>From: ${name} (${email})</p>`,
    });

    return new Response(JSON.stringify({ message: "Message sent successfully" }), { status: 200 });
  } catch (err) {
    console.error("Email error:", err);
    return new Response(
      JSON.stringify({ message: "Failed to send message", error: err.message }),
      { status: 500 }
    );
  }
}
