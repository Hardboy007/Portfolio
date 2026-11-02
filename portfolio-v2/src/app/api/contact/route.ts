import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const res = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": process.env.BREVO_API_KEY!,
      },
      body: JSON.stringify({
        sender: { name: "Portfolio Contact", email: "hardik77.aman@gmail.com" }, // 👈 apna email
        to: [{ email: "hardik77.aman@gmail.com", name: "Hardik" }], // 👈 apna email
        subject: `New message from ${name}`,
        htmlContent: `
          <div style="font-family: monospace; background: #0b0e14; color: #e7e5e0; padding: 32px; border-radius: 12px;">
            <h2 style="color: #5eead4; margin-bottom: 24px;">New Portfolio Message</h2>
            <p><span style="color: #8b8f99;">From:</span> ${name}</p>
            <p><span style="color: #8b8f99;">Email:</span> ${email}</p>
            <hr style="border-color: #1f2430; margin: 20px 0;" />
            <p><span style="color: #8b8f99;">Message:</span></p>
            <p style="color: #e7e5e0; line-height: 1.6;">${message}</p>
          </div>
        `,
      }),
    });

    if (!res.ok) {
      const err = await res.json();
      console.error(err);
      return NextResponse.json({ error: "Email failed" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}