// Utility to test SMTP credentials via Supabase Edge Function (connect/auth only, no email sent)
export async function testSmtpConfig(smtp) {
  // Map frontend fields to backend expectation
  const payload = {
    host: smtp.host,
    port: smtp.port,
    user: smtp.username, // map username → user
    pass: smtp.password, // map password → pass
    from: smtp.from
  };
  const response = await fetch(
    "/scripts/smtp-email",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBxZ2pveWxlenhrc2xlamNveGtkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM1OTY0MTMsImV4cCI6MjA1OTE3MjQxM30.RSeSEd3lUOF_lof-KK4ouDS3UinaekFyPBdJc_PNHdI"
      },
      body: JSON.stringify({
        smtp: payload,
        testOnly: true
      }),
    }
  );
  return response.json();
}