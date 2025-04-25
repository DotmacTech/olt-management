// Utility for sending email via Supabase Edge Function

/**
 * Send an email using the Supabase Edge Function
 * @param {Object} smtp - SMTP configuration {host, port, username, password, from}
 * @param {string} to - Recipient email address
 * @param {string} subject - Email subject
 * @param {string} content - Email content (plain text)
 * @returns {Promise<Object>} - {success: boolean, error?: string}
 */
export async function sendEmailViaSupabase(smtp, to, subject, content) {
  // Map frontend fields to backend expectation
  const payload = {
    host: smtp.host,
    port: smtp.port,
    user: smtp.username, // map username → user
    pass: smtp.password, // map password → pass
    from: smtp.from
  };
  const response = await fetch(
    "https://pqgjoylezxkslejcoxkd.supabase.co/functions/v1/send-email",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // TODO: Replace with your actual Supabase anon/public key
        "Authorization": `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBxZ2pveWxlenhrc2xlamNveGtkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM1OTY0MTMsImV4cCI6MjA1OTE3MjQxM30.RSeSEd3lUOF_lof-KK4ouDS3UinaekFyPBdJc_PNHdI"}`
      },
      body: JSON.stringify({ smtp: payload, to, subject, content }),
    }
  );
  return response.json();
}

/**
 * Send a password reset email using the Supabase Edge Function
 * @param {Object} smtp - SMTP configuration {host, port, username, password, from}
 * @param {string} to - Recipient email address
 * @param {string} resetMessage - Email content (plain text, should include {resetLink} placeholder replaced)
 * @param {string} subject - Email subject (optional, default: 'Password Reset')
 * @returns {Promise<Object>} - {success: boolean, error?: string}
 */
export async function sendPasswordResetEmail(smtp, to, resetLink, subject = 'Password Reset') {
  // Only send the link; backend will handle HTML generation
  return sendEmailViaSupabase(smtp, to, subject, resetLink);
}


