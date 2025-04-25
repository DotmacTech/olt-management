import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { SmtpClient } from "https://deno.land/x/smtp/mod.ts";

serve(async (req) => {
  try {
    const { smtp, to, subject, content, testOnly } = await req.json();

    if (!smtp) {
      return new Response(JSON.stringify({ error: "Missing smtp config" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }
    if (!to || !subject || !content) {
      return new Response(JSON.stringify({ error: "Missing fields" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const client = new SmtpClient();
    await client.connectTLS({
      hostname: smtp.host,
      port: smtp.port,
      username: smtp.username,
      password: smtp.password,
    });

    if (!testOnly) {
      let emailOptions: any = {
        from: smtp.from,
        to,
        subject,
      };
      // If password reset, use custom HTML
      if (subject === 'Password Reset') {
        // Extract reset link from the content if present, fallback to content
        let resetLink = '';
        const resetLinkMatch = content.match(/https?:\/\/[^\s]+/);
        if (resetLinkMatch) {
          resetLink = resetLinkMatch[0];
        }
        emailOptions.content = `DOTMAC Password Reset\n\nHello,\n\nWe received a request to reset your password. Please use the link below to set a new password:\n\n${resetLink}\n\nIf you did not request this, you can safely ignore this email.\n\n--\nDOTMAC Network Management System`;
        // Do not set contentType; default is plain text
      } else {
        emailOptions.content = content;
      }
      await client.send(emailOptions);
    }

    await client.close();

    return new Response(JSON.stringify({ success: true }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
});