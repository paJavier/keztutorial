import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    const body = await req.json();
    const { name, email, message } = body;

    if (!name || !email || !message) {
      return new Response(
        JSON.stringify({ message: "Missing fields" }),
        { status: 400 }
      );
    }

    // Set up Gmail transporter
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL_USER, // your Gmail
        pass: process.env.EMAIL_PASS, // app password
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,   // sender email (your Gmail)
      to: process.env.EMAIL_USER,     // send to yourself
      replyTo: email,                 // lets you reply to the form submitter
      subject: `New Contact Form Message from ${name}`,
      text: message + `\n\nFrom: ${name} (${email})`,
      html: `<p>${message}</p><p>From: ${name} (${email})</p>`,
    });

    return new Response(
      JSON.stringify({ message: "Message sent successfully" }),
      { status: 200 }
    );
  } catch (err) {
    console.error("Email error:", err);
    return new Response(
      JSON.stringify({ message: "Failed to send message", error: err.message }),
      { status: 500 }
    );
  }
}

