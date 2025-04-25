import React, { useState } from "react";
import { testSmtpConfig } from "./smtp-email";

/**
 * CommunicationSettings
 * Allows admin to set SMTP config and customize welcome/reset messages.
 */
export default function CommunicationSettings({
  initialSmtp = {},
  initialWelcomeMessage = "",
  initialResetMessage = "",
  onSave,
}) {
  const [smtp, setSmtp] = useState({
    host: initialSmtp.host || "",
    port: initialSmtp.port || 465,
    username: initialSmtp.username || "",
    password: initialSmtp.password || "",
    from: initialSmtp.from || "",
  });
  const [welcomeMessage, setWelcomeMessage] = useState(initialWelcomeMessage);
  const [resetMessage, setResetMessage] = useState(initialResetMessage);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState("");
  const [smtpTesting, setSmtpTesting] = useState(false);
  const [smtpTestError, setSmtpTestError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSmtp((s) => ({ ...s, [name]: value }));
  };

  const handleSave = async () => {
    setSmtpTesting(true);
    setSmtpTestError("");
    setStatus("");
    // Test SMTP config before saving
    try {
      const result = await testSmtpConfig(smtp);
      if (!result.success) {
        setSmtpTestError(result.error || "SMTP test failed. Please check your settings.");
        setSmtpTesting(false);
        return;
      }
    } catch (err) {
      setSmtpTestError(err.message || "SMTP test failed. Please check your settings.");
      setSmtpTesting(false);
      return;
    }
    setSmtpTesting(false);
    setSaving(true);
    try {
      await onSave({ smtp, welcomeMessage, resetMessage });
      setStatus("Settings saved!");
    } catch (err) {
      setStatus("Error saving settings");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Communication Settings</h2>
      <div className="mb-6">
        <h3 className="font-semibold mb-2">SMTP Configuration</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm mb-1">SMTP Host</label>
            <input type="text" name="host" value={smtp.host} onChange={handleChange} className="w-full border p-2 rounded" />
          </div>
          <div>
            <label className="block text-sm mb-1">SMTP Port</label>
            <input type="number" name="port" value={smtp.port} onChange={handleChange} className="w-full border p-2 rounded" />
          </div>
          <div>
            <label className="block text-sm mb-1">SMTP Username</label>
            <input type="text" name="username" value={smtp.username} onChange={handleChange} className="w-full border p-2 rounded" />
          </div>
          <div>
            <label className="block text-sm mb-1">SMTP Password</label>
            <input type="password" name="password" value={smtp.password} onChange={handleChange} className="w-full border p-2 rounded" />
          </div>
          <div className="col-span-2">
            <label className="block text-sm mb-1">From Email</label>
            <input type="email" name="from" value={smtp.from} onChange={handleChange} className="w-full border p-2 rounded" />
          </div>
        </div>
      </div>
      <div className="mb-6">
        <h3 className="font-semibold mb-2">Welcome Message Template</h3>
        <textarea
          className="w-full border p-2 rounded min-h-[80px]"
          value={welcomeMessage}
          onChange={(e) => setWelcomeMessage(e.target.value)}
          placeholder="Hello {username}, welcome to our service!"
        />
      </div>
      <div className="mb-6">
        <h3 className="font-semibold mb-2">Password Reset Message Template</h3>
        <textarea
          className="w-full border p-2 rounded min-h-[80px]"
          value={resetMessage}
          onChange={(e) => setResetMessage(e.target.value)}
          placeholder="Hello, use this link to reset your password: {resetLink}"
        />
      </div>
      <button
        className="bg-green-600 text-white px-4 py-2 rounded disabled:opacity-50"
        onClick={handleSave}
        disabled={saving || smtpTesting}
      >
        {smtpTesting ? "Testing SMTP..." : saving ? "Saving..." : "Save Settings"}
      </button>
      {smtpTestError && (
        <div className="mt-2 text-sm text-red-600">{smtpTestError}</div>
      )}
      {status && <div className="mt-2 text-sm text-green-700">{status}</div>}
    </div>
  );
}
