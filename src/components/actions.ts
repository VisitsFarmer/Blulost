"use server";

import { createTransport } from "nodemailer";

export async function basicFetch<T>(url: string) {
  const res = await fetch(url);
  if (!res.ok) {
    try {
      const json = await res.json();
      throw new Error(json.message);
    } catch(e) {
      throw new Error("Failed to fetch: " + e);
    };
  };
  return res.json() as Promise<T>;
};

export async function sendEmail({ name, email, message }: { name: string; email: string; message: string; }) {
  const transport = createTransport({
    host: "mail.google.com",
    service: "gmail",
    port: 465,
    secure: true,
    auth: {
      type: "oauth2",
      user: "visitsfarmerbot@gmail.com",
      clientId: process.env.GMAIL_CLIENT_ID,
      clientSecret: process.env.GMAIL_CLIENT_SECRET,
      refreshToken: process.env.GMAIL_REFRESH_TOKEN,
      accessToken: process.env.GMAIL_ACCESS_TOKEN,
    },
  });

  await transport.verify();

  await transport.sendMail({
    from: "visitsfarmerbot@gmail.com",
    to: "bluemaster442@gmail.com",
    replyTo: email,
    subject: `New message from \"${name}\"`,
    text: message,
  });
};