async function sendToWebhook(payload: any) {
  const webhookUrl = process.env.NEXT_PUBLIC_WEBHOOK_URL || ""; 
  if (!webhookUrl) return;

  try {
    await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  } catch (error) {
    console.error("Webhook send failed", error);
  }
}
export default sendToWebhook;