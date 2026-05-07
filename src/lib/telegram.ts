const API_BASE = "https://api.telegram.org";

export function getOwnerChatId(): string | undefined {
  return process.env.ALLOWED_TELEGRAM_USER_ID ?? process.env.TELEGRAM_CHAT_ID;
}

export function getBotToken(): string | undefined {
  return process.env.TELEGRAM_BOT_TOKEN;
}

export async function sendTelegramMessage(
  chatId: string | number,
  text: string,
  opts: { parse_mode?: "Markdown" | "HTML"; disable_web_page_preview?: boolean } = {},
): Promise<{ ok: true } | { ok: false; error: string }> {
  const token = getBotToken();
  if (!token) return { ok: false, error: "TELEGRAM_BOT_TOKEN not set" };

  const res = await fetch(`${API_BASE}/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      text,
      parse_mode: opts.parse_mode ?? "Markdown",
      disable_web_page_preview: opts.disable_web_page_preview ?? true,
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    return { ok: false, error: err };
  }
  return { ok: true };
}
